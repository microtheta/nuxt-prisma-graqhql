import { nonNull, intArg, extendType, objectType } from 'nexus'

const PostsDataSource = [{
  id: 1,
  title: 'First post',
  body: "Body of the first post",
  published: true,
  author: {
    id: 1,
    name: 'Mahesh',
    location: 'India'
  }
},
{
  id: 2,
  title: 'Post 2',
  body: "Body of the second post",
  published: false,
  author: {
    id: 4,
    name: 'Bob',
    location: 'Sydney'
  }
},
{
  id: 3,
  title: 'Post 3',
  body: "Body of the third post",
  published: true,
  author: {
    id: 2,
    name: 'Team Brosa',
    location: 'Melbourne'
  }
}]

export const Post = objectType({
  name: 'Post',            // <- Name of type
  definition(t) {
    t.int('id')            // <- Field named `id` of type `Int`
    t.string('title')      // <- Field named `title` of type `String`
    t.string('body')       // <- Field named `body` of type `String`
    t.field('author', {
      type: 'User'
    })
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('post', {
      description: 'Posts with give id',
      type: 'Post',
      args: {
        id:  nonNull(intArg())
      },
      resolve(parent, args, context) {
        return PostsDataSource.find(p => p.id == args.id);
      }
    }),
    t.list.field('posts', {
      description: 'Sample posts that are published',
      type: 'Post',
      resolve(parent, args, context, info) {
        return PostsDataSource.filter(p => p.published);
      }
    })
    t.nonNull.list.field('drafts', {
      description: 'Posts that are not published yet.',
      type: 'Post',
      resolve(parent, args, context) {
        return PostsDataSource.filter(p => !p.published);
      }
    })
  },
})


export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
  }
})
