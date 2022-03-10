import prisma from '~~/prisma';
import { extendType, list, objectType } from 'nexus'


export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.id('id')
    t.string('name')
    t.string('productname', {
      resolve(parent) {
        return parent.name;
      }
    })
    t.string('description')
    t.string('slug')
    t.int('reviews_count')
    t.field('reviews', {
      type: list('Review'),
      resolve(parent) {
        return prisma.spree_reviews.findMany({
          where: {
            product_id: parent.id
          }
        })
      }
    })
  }
})


export const ProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('products', {
      type: 'Product',
      resolve(parent, args, context) {
        return  prisma.spree_products.findMany({
          where: {
            deleted_at: null
          },
          take: 10 })
      }
    })
  },
})
