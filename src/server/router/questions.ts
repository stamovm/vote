import { createRouter } from './context'
import { z } from 'zod'

export const questionsRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany()
    },
  })
  .mutation('create', {
    input: z.object({ question: z.string().min(4).max(650) }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pollQuestion.create({
        data: { question: input.question },
      })
    },
  })
