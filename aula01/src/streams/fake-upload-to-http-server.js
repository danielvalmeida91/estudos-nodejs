import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        // Buffer is mode to transact data between streams
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000);
  }
}

// fetch is a function that we can use to make http requests
// fetch is not a node function, it's a browser function and it is available after node 18
fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  get duplex() {
    return 'half';
  },
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})