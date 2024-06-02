import fs from 'node:fs/promises'
// if want use Streams we ned use node:fs

const databasePath = new URL('../db.json', import.meta.url)
// return the relative path of the file and the file name

export class Database {
  // if i want create a private variable i need use # before the variable name
  // after this only this methods can use this variable
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database))
    // to work with path, previously we used __dirnane, today we use new URL(import.meta.url -> relative path).pathname
    // __dirname, __filename not available if we use type module in package.json
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data
  }
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    return data
  }
}