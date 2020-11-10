import "reflect-metadata"
import "dotenv-safe/config"
import path from "path"
import { createConnection } from "typeorm"
import { buildSchema } from "type-graphql"
import express from "express"
import cors from "cors"
import { ApolloServer } from "apollo-server-express"
import jwt from "jsonwebtoken"
import { User } from "./entities/User"

const main = async () => {
  await createConnection({
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

  const app = express()
  app.use(cors())

  const server = new ApolloServer({
    introspection: true,
    playground: true,
    schema: await buildSchema({
      resolvers: [] as any,
      validate: false
    }),
    context: async ({ req, res }) => {

      let me

      const { token } = req.headers
      if (typeof token === 'string') {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET as string)
        if (typeof tokenData === 'object') {
          me = await User.findOne((tokenData as { uid: string }).uid)
        }
      }
  
      return {
        req,
        res,
        me
      }
    }
  })

  server.applyMiddleware({ app })

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log(`Server started on ${process.env.PORT}`)
  })
}

try { 
  main()
} catch (error) {
  console.error(error)
}
