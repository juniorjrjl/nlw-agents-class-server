import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import z from "zod/v4"
import { desc, eq } from "drizzle-orm"

export const getRoomsQuestionsRoute: FastifyPluginCallbackZod =  (app) =>{
    app.get('/rooms/:id/questions', {
        schema: {
            params: z.object({id: z.string()})
        }},
        
        async (request) => {
            const { id } = request.params
            const result = await db.select({
                id: schema.questions.id,
                description: schema.questions.description,
                answer: schema.questions.awnser,
                createdAt: schema.questions.createdAt
            })
                .from(schema.questions)
                .where(eq(schema.questions.roomId, id))
                .orderBy(desc(schema.questions.createdAt))

        return result
    })
}