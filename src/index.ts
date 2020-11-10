import "reflect-metadata"
import "dotenv-safe/config"
import path from "path"
import { createConnection } from "typeorm"

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [
      path.join(__dirname, "/entities/*.js")
    ],
    migrations: [],
    subscribers: []
  })

  console.log(connection)
}

try { 
  main()
} catch (error) {
  console.error(error)
}
