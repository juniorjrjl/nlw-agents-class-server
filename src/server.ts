import { fastify } from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomsQuestionsRoute } from './http/routes/get-rooms-questions.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({ port: env.PORT, host: env.HOST }).then(() => console.log(`server running on port ${env.PORT}!`))

app.get('/health', () => 'OK')
app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomsQuestionsRoute)
app.register(createQuestionRoute)
