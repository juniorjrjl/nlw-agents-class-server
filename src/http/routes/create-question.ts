import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from 'zod/v4'
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import { StatusCodes } from "http-status-codes"

export const createQuestionRoute: FastifyPluginCallbackZod =  (app) =>{
    app.post('/rooms/:id/questions', {
        schema :{
            params: z.object({id: z.string()}),
            body: z.object({
                description: z.string()
            })
        }}, async (request, reply) => {
            const { description } = request.body
            const { id } = request.params
            const result = await db.insert(schema.questions).values({description, roomId: id}).returning()

            const insertedQuestion = result[0]
            if (!insertedQuestion){
                throw new Error('Failed to create new room')
            }

            return reply.status(StatusCodes.CREATED).send({
                id: insertedQuestion.id, 
                description: insertedQuestion.description,
                awnser: insertedQuestion.awnser,
                roomId: insertedQuestion.roomId
            })
    })
}