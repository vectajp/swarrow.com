import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const DOWNLOAD_REQUEST_API_URL =
  import.meta.env.PUBLIC_DOWNLOAD_REQUEST_API_URL || 'https://api.swarrow.com/download-requests'
const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY

let turnstileScriptPromise: Promise<void> | null = null

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback': () => void
      'error-callback': () => void
    },
  ) => string
  reset: (widgetId?: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) {
    return Promise.resolve()
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      turnstileScriptPromise = null
      reject(new Error('Failed to load Turnstile'))
    }
    document.head.appendChild(script)
  })

  return turnstileScriptPromise
}

interface DownloadFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DownloadFormModal({ isOpen, onClose }: DownloadFormModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    nameKana: '',
    email: '',
    inquiry: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isOpen || submitted) {
      return
    }

    if (!TURNSTILE_SITE_KEY) {
      setSubmitError('認証設定が未完了です')
      return
    }

    let cancelled = false

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !turnstileContainerRef.current || !window.turnstile) {
          return
        }

        if (turnstileWidgetIdRef.current) {
          window.turnstile.remove(turnstileWidgetIdRef.current)
        }

        turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            setTurnstileToken(token)
            setSubmitError(null)
          },
          'expired-callback': () => setTurnstileToken(null),
          'error-callback': () => {
            setTurnstileToken(null)
            setSubmitError('認証確認に失敗しました。再度お試しください。')
          },
        })
      })
      .catch(() => setSubmitError('認証設定の読み込みに失敗しました'))

    return () => {
      cancelled = true
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
        turnstileWidgetIdRef.current = null
      }
      setTurnstileToken(null)
    }
  }, [isOpen, submitted])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileToken) {
      setSubmitError('認証確認が完了していません')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(DOWNLOAD_REQUEST_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error ?? '送信に失敗しました')
      }

      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '送信中にエラーが発生しました')
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current)
      }
      setTurnstileToken(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setSubmitError(null)
    setTurnstileToken(null)
    setFormData({ companyName: '', name: '', nameKana: '', email: '', inquiry: '' })
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={handleClose}
      onKeyDown={(e) => e.key === 'Escape' && handleClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        role="document"
        className="relative bg-white rounded-[24px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="閉じる"
          className="absolute top-4 right-4 p-2 text-sc-text-secondary hover:text-sc-text-primary transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="p-8 lg:p-10">
          {submitted ? (
            /* 送信完了画面 */
            <div className="text-center py-8">
              <div className="w-[64px] h-[64px] bg-sc-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--sc-orange)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-sc-text-primary text-[24px] font-bold mb-4">送信が完了しました</h3>
              <p className="text-sc-text-secondary text-[15px] leading-[1.8] mb-8">
                ご入力いただいたメールアドレス宛に
                <br />
                資料ダウンロードリンクをお送りします。
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="bg-sc-navy text-white px-8 py-3 rounded-full transition-colors hover:opacity-90 cursor-pointer"
              >
                閉じる
              </button>
            </div>
          ) : (
            /* フォーム */
            <>
              <h3 className="text-sc-text-primary text-[24px] lg:text-[28px] font-bold mb-2">資料ダウンロード</h3>
              <p className="text-sc-text-secondary text-[14px] leading-[1.8] mb-8">
                以下の情報をご入力いただくと、サービス資料をダウンロードいただけます。
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <FormField
                  label="会社名"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="株式会社〇〇"
                  required
                />
                <FormField
                  label="氏名"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="山田 太郎"
                  required
                />
                <FormField
                  label="ふりがな"
                  name="nameKana"
                  value={formData.nameKana}
                  onChange={handleChange}
                  placeholder="やまだ たろう"
                  required
                />
                <FormField
                  label="メールアドレス"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@company.co.jp"
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="inquiry" className="text-sc-text-primary text-[14px] font-medium">
                    お問い合わせ内容
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    placeholder="ご質問やご要望があればご記入ください"
                    rows={4}
                    className="w-full px-4 py-3 rounded-[12px] border border-sc-border bg-sc-bg-light text-sc-text-primary text-[15px] placeholder:text-sc-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-sc-orange/30 focus:border-sc-orange transition-all resize-none"
                  />
                </div>

                <div className="min-h-[65px] flex items-center justify-center">
                  <div ref={turnstileContainerRef} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className="bg-sc-orange hover:bg-sc-orange-hover text-white py-4 rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,123,53,0.4)] text-[16px] font-bold cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '送信中...' : '資料をダウンロードする'}
                </button>

                {submitError && (
                  <p role="alert" className="text-red-500 text-[13px] text-center">
                    {submitError}
                  </p>
                )}

                <p className="text-sc-text-muted text-[12px] text-center">
                  入力いただいた情報はサービスご案内の目的でのみ使用します。
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  required?: boolean
  type?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sc-text-primary text-[14px] font-medium">
        {label}
        {required && <span className="text-sc-orange ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-[12px] border border-sc-border bg-sc-bg-light text-sc-text-primary text-[15px] placeholder:text-sc-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-sc-orange/30 focus:border-sc-orange transition-all"
      />
    </div>
  )
}
