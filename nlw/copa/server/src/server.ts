import Fastify from "fastify";
import cors from "@fastify/cors"
import { poolRooutes } from "./routes/pool";
import { userRooutes } from "./routes/user";
import { guessRooutes } from "./routes/guess";
import { authRooutes } from "./routes/auth";
import { gameRooutes } from "./routes/game";

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true,
    })
    
    await fastify.register(authRooutes)
    await fastify.register(gameRooutes)
    await fastify.register(guessRooutes)
    await fastify.register(poolRooutes)
    await fastify.register(userRooutes)

    await fastify.listen({ port: 3333,/* host: '0.0.0.0' */ })
}

bootstrap()