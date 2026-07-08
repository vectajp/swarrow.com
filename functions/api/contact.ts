function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const onRequestPost: PagesFunction = async () =>
  jsonResponse(
    {
      success: false,
      error: 'このエンドポイントは廃止されました',
    },
    410,
  )
