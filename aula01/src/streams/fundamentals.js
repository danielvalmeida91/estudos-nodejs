// Os conceitos de stream fazem com o node seja capaz de lidar com grandes volumes de dados sem a necessidade de carregar tudo na memória.
// Ele vai processando parte do arquivo e disponibilizando para o usuário conforme a necessidade.
// Readable Streams: são streams que podem ser lidas, como um arquivo, uma requisição http, etc. ( Neflix, Youtube, etc)
// Writable Streams: são streams que podem ser escritas, como um arquivo, uma requisição http, etc. (Upload de arquivos, etc)

// At node all ports are considered as streams ( req and res for example )

// For example we can make a insert and output like this
// In this example for every input we will have the same output
// process.stdin.pipe(process.stdout)

// Streams can't use primitive types like ( String, Number, Float ), we need use Buffer
import { error } from 'node:console';
import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        // Buffer is mode to transact data between streams
        const buf = Buffer.from(String(i))
        this.push(buf)
      }

    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = parseInt(chunk.toString()) * -1

    // first parameter is the error, if we dont't have error we pass null
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTen extends Writable {
  // chunck is a buffer received by the readable stream
  // encoding is the encoding of the buffer
  // callback is a function that we need to call when we finish the operation
  _write(chunk, encoding, callback) {
    const number = parseInt(chunk.toString())
    const result = number * 10
    console.log(result)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTen())
