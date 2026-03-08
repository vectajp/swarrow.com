import { X } from 'lucide-react'
import { useState } from 'react'

interface DownloadFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DownloadFormModal({ isOpen, onClose }: DownloadFormModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    nameKana: '',
    inquiry: '',
  })
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: フォーム送信処理（API連携）
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setFormData({ companyName: '', name: '', nameKana: '', inquiry: '' })
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

                <button
                  type="submit"
                  className="bg-sc-orange hover:bg-sc-orange-hover text-white py-4 rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,123,53,0.4)] text-[16px] font-bold cursor-pointer mt-2"
                >
                  資料をダウンロードする
                </button>

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
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sc-text-primary text-[14px] font-medium">
        {label}
        {required && <span className="text-sc-orange ml-1">*</span>}
      </label>
      <input
        id={name}
        type="text"
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
