import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_URL: z.url().startsWith('postgresql://')
})

export const env = envSchema.parse(process.env)