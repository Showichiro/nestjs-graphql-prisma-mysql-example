import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Edge as PrismaRelayEdge,
  PageInfo as PrismaRelayPageInfo,
  Connection as PrismaRelayConnection,
} from '@devoxa/prisma-relay-cursor-connection';

export function Connection<T>(GenericClass: Type<T>): any {
  @ObjectType(`${GenericClass.name}PageInfo`)
  class PageInfo implements PrismaRelayPageInfo {
    @Field(() => Boolean, { nullable: false })
    hasNextPage: boolean;

    @Field(() => Boolean, { nullable: false })
    hasPreviousPage: boolean;

    @Field(() => String, { nullable: true })
    startCursor: string;

    @Field(() => String, { nullable: true })
    endCursor: string;
  }

  @ObjectType(`${GenericClass.name}Edge`)
  class Edge<T> implements PrismaRelayEdge<T> {
    @Field(() => String, { nullable: false })
    cursor: string;

    @Field(() => GenericClass, { nullable: false })
    node: T;
  }

  @ObjectType({ isAbstract: true })
  class IConnection implements PrismaRelayConnection<T> {
    @Field(() => [GenericClass], { nullable: false })
    nodes: T[];

    @Field(() => [Edge], { nullable: false })
    edges: Edge<T>[];

    @Field(() => PageInfo, { nullable: false })
    pageInfo: PageInfo;

    @Field(() => Int, { nullable: false })
    totalCount: number;
  }

  return IConnection;
}
