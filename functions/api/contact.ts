interface Env {
  SENDGRID_API_KEY: string
  MAIL_TO: string
  MAIL_FROM: string
  SITE_URL: string
}

interface ContactBody {
  companyName: string
  name: string
  nameKana: string
  email: string
  inquiry?: string
}

function sanitize(str: string): string {
  return str.trim().replace(/[\r\n]/g, '')
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function validateBody(body: unknown): { ok: true; data: ContactBody } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' }
  }

  const b = body as Record<string, unknown>

  if (typeof b.companyName !== 'string' || !b.companyName.trim()) {
    return { ok: false, error: '会社名は必須です' }
  }
  if (typeof b.name !== 'string' || !b.name.trim()) {
    return { ok: false, error: '氏名は必須です' }
  }
  if (typeof b.nameKana !== 'string' || !b.nameKana.trim()) {
    return { ok: false, error: 'ふりがなは必須です' }
  }
  if (b.inquiry !== undefined && typeof b.inquiry !== 'string') {
    return { ok: false, error: 'お問い合わせ内容が不正です' }
  }

  if (b.companyName.trim().length > 200) {
    return { ok: false, error: '会社名は200文字以内で入力してください' }
  }
  if (b.name.trim().length > 100) {
    return { ok: false, error: '氏名は100文字以内で入力してください' }
  }
  if (b.nameKana.trim().length > 100) {
    return { ok: false, error: 'ふりがなは100文字以内で入力してください' }
  }
  if (typeof b.email !== 'string' || !b.email.trim()) {
    return { ok: false, error: 'メールアドレスは必須です' }
  }
  if (b.email.trim().length > 254) {
    return { ok: false, error: 'メールアドレスは254文字以内で入力してください' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) {
    return { ok: false, error: 'メールアドレスの形式が正しくありません' }
  }
  if (typeof b.inquiry === 'string' && b.inquiry.trim().length > 5000) {
    return { ok: false, error: 'お問い合わせ内容は5000文字以内で入力してください' }
  }

  return {
    ok: true,
    data: {
      companyName: sanitize(b.companyName),
      name: sanitize(b.name),
      nameKana: sanitize(b.nameKana),
      email: sanitize(b.email),
      inquiry: typeof b.inquiry === 'string' ? b.inquiry.trim() : undefined,
    },
  }
}

function buildEmailHtml(data: ContactBody, submittedAt: string): string {
  const inquiryRow = data.inquiry
    ? `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; vertical-align: top;">お問い合わせ内容</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(data.inquiry)}</td>
      </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><title>資料ダウンロード</title></head>
<body style="font-family: 'Hiragino Sans', 'Meiryo', sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #092045;">資料ダウンロードリクエスト</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">会社名</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(data.companyName)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">氏名</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">ふりがな</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(data.nameKana)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">メールアドレス</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(data.email)}</td>
      </tr>
      ${inquiryRow}
      <tr>
        <td style="padding: 10px; font-weight: bold;">受信日時</td>
        <td style="padding: 10px;">${escapeHtml(submittedAt)}</td>
      </tr>
    </table>
  </div>
</body>
</html>`
}

function buildEmailText(data: ContactBody, submittedAt: string): string {
  let text = `資料ダウンロードリクエスト

■会社名
${data.companyName}

■氏名
${data.name}

■ふりがな
${data.nameKana}

■メールアドレス
${data.email}`

  if (data.inquiry) {
    text += `

■お問い合わせ内容
${data.inquiry}`
  }

  text += `

■受信日時
${submittedAt}`

  return text
}

function buildDownloadEmailText(data: ContactBody, downloadUrl: string): string {
  return `${data.name} 様

この度は Swarrow Call の資料をご請求いただき、誠にありがとうございます。

以下のリンクよりサービス資料をダウンロードいただけます。

▼ 資料ダウンロード
${downloadUrl}

ご不明な点がございましたら、お気軽にお問い合わせください。

─────────────────
Swarrow Call
─────────────────`
}

function buildDownloadEmailHtml(data: ContactBody, downloadUrl: string): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><title>資料ダウンロードのご案内</title></head>
<body style="font-family: 'Hiragino Sans', 'Meiryo', sans-serif; line-height: 1.8; color: #333; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <h2 style="color: #092045; margin-bottom: 24px;">資料ダウンロードのご案内</h2>
    <p>${escapeHtml(data.name)} 様</p>
    <p>この度は Swarrow Call の資料をご請求いただき、誠にありがとうございます。</p>
    <p>以下のボタンよりサービス資料をダウンロードいただけます。</p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${escapeHtml(downloadUrl)}" style="display: inline-block; background-color: #E87B35; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-weight: bold; font-size: 16px;">資料をダウンロードする</a>
    </div>
    <p style="font-size: 13px; color: #636180;">ボタンが表示されない場合は、以下の URL をブラウザに貼り付けてください。<br><a href="${escapeHtml(downloadUrl)}" style="color: #E87B35;">${escapeHtml(downloadUrl)}</a></p>
    <hr style="border: none; border-top: 1px solid #DEDEE9; margin: 32px 0;">
    <p style="font-size: 13px; color: #636180;">ご不明な点がございましたら、お気軽にお問い合わせください。</p>
    <p style="font-size: 13px; color: #092045; font-weight: bold;">Swarrow Call</p>
  </div>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatJST(): string {
  return new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  // Parse body
  let body: unknown
  try {
    body = await context.request.json()
  } catch {
    return jsonResponse({ success: false, error: 'Invalid JSON' }, 400)
  }

  // Validate
  const result = validateBody(body)
  if (!result.ok) {
    return jsonResponse({ success: false, error: result.error }, 400)
  }

  // Validate environment variables
  const { SENDGRID_API_KEY, MAIL_TO, MAIL_FROM, SITE_URL } = context.env
  if (!SENDGRID_API_KEY || !MAIL_TO || !MAIL_FROM || !SITE_URL) {
    const missing = [
      !SENDGRID_API_KEY && 'SENDGRID_API_KEY',
      !MAIL_TO && 'MAIL_TO',
      !MAIL_FROM && 'MAIL_FROM',
      !SITE_URL && 'SITE_URL',
    ].filter(Boolean)
    console.error('Missing environment variables:', missing.join(', '))
    return jsonResponse({ success: false, error: 'サーバー設定エラー' }, 500)
  }

  const submittedAt = formatJST()

  // Send email via SendGrid
  const subject = `【Swarrow Call】資料ダウンロード: ${result.data.companyName}`
  const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: MAIL_TO }] }],
      from: { email: MAIL_FROM, name: 'Swarrow Call' },
      subject,
      content: [
        { type: 'text/plain', value: buildEmailText(result.data, submittedAt) },
        { type: 'text/html', value: buildEmailHtml(result.data, submittedAt) },
      ],
    }),
  })

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text()
    console.error(`SendGrid API error (${emailResponse.status}):`, errorText)
    return jsonResponse({ success: false, error: 'メール送信に失敗しました' }, 500)
  }

  // Send download link email to requester
  const downloadUrl = `${SITE_URL}/downloads/swarrow_call.pdf`
  const requesterSubject = '【Swarrow Call】資料ダウンロードのご案内'
  const requesterResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: result.data.email }] }],
      from: { email: MAIL_FROM, name: 'Swarrow Call' },
      subject: requesterSubject,
      content: [
        { type: 'text/plain', value: buildDownloadEmailText(result.data, downloadUrl) },
        { type: 'text/html', value: buildDownloadEmailHtml(result.data, downloadUrl) },
      ],
    }),
  })

  if (!requesterResponse.ok) {
    const errorText = await requesterResponse.text()
    console.error(`SendGrid API error for requester (${requesterResponse.status}):`, errorText)
  }

  return jsonResponse({ success: true })
}
