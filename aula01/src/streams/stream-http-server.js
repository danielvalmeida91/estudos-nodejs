import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = parseInt(chunk.toString()) * -1
    console.log(transformed)
    // first parameter is the error, if we dont't have error we pass null
    callback(null, Buffer.from(String(transformed)))
  }
}

// req is a readable stream
// res is a writable stream
const server = http.createServer({ duplex: true }, async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)
  return res.end(fullStreamContent)
  // return req.pipe(new InverseNumberStream()).pipe(res)
})

server.listen(3334, () => console.log('Server is running on port 3334'))