export async function json(req, res) {
  console.log('teste', req)
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    console.log(req.body)
  } catch {
    req.body = null
  }
  console.log(req.body)
  res.setHeader('Content-Type', 'application/json')
}