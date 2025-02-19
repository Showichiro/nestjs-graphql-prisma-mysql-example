import { ConnectionArguments as PrismaRelayConnectionArguments } from '@devoxa/prisma-relay-cursor-connection';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ConnectionArguments implements PrismaRelayConnectionArguments {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}
