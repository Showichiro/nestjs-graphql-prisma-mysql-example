import { Args, Query, Resolver } from '@nestjs/graphql';
import { Customer } from './customer/customer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerConnection } from './customer-connection/customer-connection';
import { ConnectionArguments } from 'src/common/connection-arguments/connection-arguments';
import {
  findManyCursorConnection,
  PrismaFindManyArguments,
} from '@devoxa/prisma-relay-cursor-connection';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => CustomerConnection)
  async customersConnection(
    @Args('connectionArgs', { type: () => ConnectionArguments })
    connectionArgs: ConnectionArguments,
  ): Promise<CustomerConnection> {
    return findManyCursorConnection(
      (args: PrismaFindManyArguments<{ id: number }>) =>
        this.prisma.customer.findMany(args),
      () => this.prisma.customer.count(),
      connectionArgs,
    );
  }
}
