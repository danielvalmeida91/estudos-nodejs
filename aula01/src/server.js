// commonJs 
// const http = require('http')

// to use module we need create in package.json ```"type": "module"```
// node recomends use prefix node when import modules from node.js
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Concepts about HTTP Methods
// HTTP we have 2 principal functions ( method, url ) -> http://localhost:3333 -> GET /
// And for backend we have 4 principal functions ( method, url, body, headers ) -> http://localhost:3333 -> GET / -> { name: 'Diego' } -> { Authorization
// GET -> get informations from server
// POST -> send informations to server
// PUT -> update informations on server, we need send all informations
// PATCH -> update informations on server, we need send only informations that we want update
// DELETE -> delete informations on server

// Stateful - Stateless
// Stateful -> information is stored in memory
// Stateless -> information is not stored in memory

//Headers -> metadata about request and response
// for return json we need set header with 'Content-Type': 'application/json'

// HTTP Status Code
// 100-199 -> Informational responses
// 200-299 -> Successful responses (200 OK, 201 Created)
// 300-399 -> Redirects
// 400-499 -> Client errors (400 Bad Request, 401 Unauthorized, 404 Not Found)
// 500-599 -> Server errors (500 Internal Server Error)

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // os middlewares sempre receberão como parâmetro o req e o res
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })
  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
