import { makeSchema } from 'nexus'
import * as types from './types';
import * as mutation from './mutation';
import type { GraphQLSchema } from 'graphql';

export const schema = makeSchema({
  types: [types, mutation]
}) as unknown as GraphQLSchema;
