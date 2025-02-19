import {
  findManyCursorConnection as cursorConnection,
  PrismaFindManyArguments,
} from '@devoxa/prisma-relay-cursor-connection';
import { Prisma } from '@prisma/client';
import { ConnectionArguments } from './connection-arguments/connection-arguments';
import { decodeCursor } from './decode-cursor';
import { encodeCursor } from './encode-cursor';
import { getCursor } from './get-cursor';

type Model =
  Prisma.TypeMap['model'][Prisma.ModelName]['operations']['findMany']['result'];

export const findManyCursorConnection = <ID extends string | number>(
  findMany: (args: PrismaFindManyArguments<{ id: ID }>) => Promise<Model>,
  aggregate: () => Promise<number>,
  args: ConnectionArguments,
) => {
  return cursorConnection(findMany, aggregate, args, {
    getCursor,
    encodeCursor,
    decodeCursor,
  });
};
