import { ApolloServer } from 'apollo-server-micro'
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { schema } from '~~/graphql/schema';


const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    //console.log(req.headers)
    return req;
  },

  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
})

const startServer = apolloServer.start()

export default async function handler(req, res) {
  await startServer
  await apolloServer.createHandler({
    path: '/',
  })(req, res)
}
