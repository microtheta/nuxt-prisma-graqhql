import prisma from '~~/prisma';
import { nonNull, intArg, extendType, objectType } from 'nexus'


export const Review = objectType({
  name: 'Review',
  definition(t) {
    t.id('id')
    t.nonNull.string('name', {
      resolve(parent) {
        return parent.name || "Team Brosa";
      }
    })
    t.string('rating')
    t.string('review')
    t.string('date', {
      resolve(parent) {
        return new Date(parent.created_at).toISOString();
      }
    })
  }
})


export const ReviewsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('reviews', {
      type: 'Review',
      args: {
        id:  nonNull(intArg())
      },
      resolve(parent, args, context) {
        return prisma.spree_reviews.findMany({
          where: {
            product_id: args.id
          }
        })
      }
    })
  },
})
