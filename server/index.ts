import express from "express"
import { ApolloServer, PubSub } from "apollo-server-express"
import http from "http"
import path from "path"
import mongoose from "mongoose"
import { config } from "dotenv"
import isAuth from "./context/isAuth"
import schema from "./schema"
import cors from "cors"

config({ path: "../.env" })
const { PORT, MONGO_USER, MONGO_PASS, MONGO_DB, NODE_ENV } = process.env
const isDev = NODE_ENV === "development"

;(async () => {
  try {
    const app = express()
    app.use(cors())

    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.osxef.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log("MongoDB started successfully!")
    )

    const pubsub = new PubSub()

    const server = new ApolloServer({
      ...schema,
      playground: isDev,
      context: ({ req, res }: { req: any; res: any }) => ({
        req,
        res,
        pubsub,
        isAuth: isAuth(req),
      }),
    })
    server.applyMiddleware({ app })

    if (!isDev) {
      app.use(express.static(path.resolve(__dirname, "..", "client")))
      app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "..", "client", "index.html"))
      })
    }

    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer)

    httpServer.listen(PORT, () => {
      console.log(
        `Server ready at http://localhost:${PORT}\nSubscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
      )
    })
  } catch (error) {
    console.error(`Server error: ${error.message}`)
  }
})()
