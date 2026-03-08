interface Env {
  SENDGRID_API_KEY: string
  MAIL_TO: string
  MAIL_FROM: string
}

interface ContactBody {
  companyName: string
  name: string
  nameKana: string
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
  if (typeof b.inquiry === 'string' && b.inquiry.trim().length > 5000) {
    return { ok: false, error: 'お問い合わせ内容は5000文字以内で入力してください' }
  }

  return {
    ok: true,
    data: {
      companyName: sanitize(b.companyName),
      name: sanitize(b.name),
      nameKana: sanitize(b.nameKana),
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
${data.nameKana}`

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

  const submittedAt = formatJST()

  // Send email via SendGrid
  const subject = `【Swarrow Call】資料ダウンロード: ${result.data.companyName}`
  const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${context.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: context.env.MAIL_TO }] }],
      from: { email: context.env.MAIL_FROM, name: 'Swarrow Call' },
      subject,
      content: [
        { type: 'text/plain', value: buildEmailText(result.data, submittedAt) },
        { type: 'text/html', value: buildEmailHtml(result.data, submittedAt) },
      ],
    }),
  })

  if (!emailResponse.ok && emailResponse.status !== 202) {
    const errorText = await emailResponse.text()
    console.error('SendGrid API error:', errorText)
    return jsonResponse({ success: false, error: 'メール送信に失敗しました' }, 500)
  }

  return jsonResponse({ success: true })
}
