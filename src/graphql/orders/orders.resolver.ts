import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from './order/order';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderConnection } from './order-connection/order-connection';
import { ConnectionArguments } from 'src/common/connection-arguments/connection-arguments';
import { PrismaFindManyArguments } from '@devoxa/prisma-relay-cursor-connection';
import { findManyCursorConnection } from 'src/common/find-many-cursor-connection';
import { Customer } from '../customers/customer/customer';
import { Order as PrismaOrder } from '@prisma/client';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private prisma: PrismaService,
    private customerDataLoader: CustomerDataLoaderService,
  ) {}

  @Query(() => OrderConnection)
  async ordersConnection(
    @Args('connectionArgs', { type: () => ConnectionArguments })
    connectionArgs: ConnectionArguments,
  ): Promise<OrderConnection> {
    return findManyCursorConnection(
      (args: PrismaFindManyArguments<{ id: number }>) =>
        this.prisma.order.findMany(args),
      () => this.prisma.order.count(),
      connectionArgs,
    );
  }

  @ResolveField(() => Customer)
  async customer(@Parent() parent: PrismaOrder) {
    return this.customerDataLoader.load(parent.customerId);
  }
}
