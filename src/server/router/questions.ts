import { createRouter } from './context'
import { z } from 'zod'

export const questionsRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany()
    },
  })
  .query('get-by-id', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      return await prisma?.pollQuestion.findFirst({
        where: {
          id: input.id,
        },
      })
    },
  })
  .mutation('create', {
    input: z.object({ question: z.string().min(4).max(650) }),
    async resolve({ input, ctx }) {
      console.log('ctx is ======', ctx)
      return await ctx.prisma.pollQuestion.create({
        data: { question: input.question, options: [] },
      })
    },
  })
