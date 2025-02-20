import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Customer } from './customer/customer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerConnection } from './customer-connection/customer-connection';
import { ConnectionArguments } from 'src/common/connection-arguments/connection-arguments';
import { PrismaFindManyArguments } from '@devoxa/prisma-relay-cursor-connection';
import { Order } from '../orders/order/order';
import { Customer as PrismaCustomer } from '@prisma/client';
import { OrderDataLoaderService } from './order-data-loader/order-data-loader.service';
import { findManyCursorConnection } from 'src/common/find-many-cursor-connection';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private prisma: PrismaService,
    private orderDataLoader: OrderDataLoaderService,
  ) {}

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

  @ResolveField(() => [Order])
  orders(@Parent() parent: PrismaCustomer) {
    return this.orderDataLoader.load(parent.id);
  }
}
