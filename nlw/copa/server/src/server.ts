import Fastify from "fastify"
import jwt from "@fastify/jwt"
import cors from "@fastify/cors"
import { authRoutes } from "./routes/auth"
import { userRoutes } from "./routes/users.routes"
import { poolRoutes } from "./routes/pools.routes"
import { guessesRoutes } from "./routes/guesses.routes"
import { gameRoutes } from "./routes/games.routes"



async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: "nlwcopa"
  })

  await fastify.register(authRoutes)
  await fastify.register(userRoutes)
  await fastify.register(poolRoutes)
  await fastify.register(guessesRoutes)
  await fastify.register(gameRoutes)

  await fastify.listen({ port: 3333, host: "0.0.0.0" })
}

bootstrap()