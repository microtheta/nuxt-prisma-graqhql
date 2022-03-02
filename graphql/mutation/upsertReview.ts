import prisma from '~~/prisma';
import { extendType, stringArg, nonNull, intArg, arg } from 'nexus'

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('upsertReview', {
      type: 'Review',
      args: {
        id: intArg(),
        name: nonNull(stringArg()),
        rating: nonNull(intArg()),
        review: stringArg(),
        product_id: nonNull(intArg())
      },
      async resolve(_root, args, ctx) {
        const review = await prisma.spree_reviews.upsert({
          where: {
            id: args.id || -1
          },
          update: {
            name: args.name,
            rating: args.rating,
            review: args.review,
            product_id: args.product_id,
            updated_at: new Date()
          },
          create: {
            name: args.name,
            rating: args.rating,
            review: args.review,
            product_id: args.product_id,
            updated_at: new Date(),
            created_at: new Date()
          }
        })
        return review
      },
    })
  },
})
