import { createRouter } from './context'
import { z } from 'zod'
import * as trpc from '@trpc/server'

export const questionsRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany()
    },
  })
  .query('get-by-id', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      const question = await ctx.prisma.pollQuestion.findFirst({
        where: {
          id: input.id,
        },
      })

      return { question, isOwner: false }
    },
  })
  .mutation('create', {
    input: z.object({
      question: z.string().min(3).max(600),
    }),
    async resolve({ input, ctx }) {
      // if (!ctx.token) return { error: 'Unauthorized' }

      return await ctx.prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: ['option 1', 'option 2', 'option 3'],
          ownerToken: 'token',
        },
      })
    },
  })
