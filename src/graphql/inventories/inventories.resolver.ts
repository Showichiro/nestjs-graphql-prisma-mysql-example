import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inventory } from './inventory/inventory';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryConnection } from './inventory-connection/inventory-connection';
import { findManyCursorConnection } from 'src/common/find-many-cursor-connection';
import { PrismaFindManyArguments } from '@devoxa/prisma-relay-cursor-connection';
import { ConnectionArguments } from 'src/common/connection-arguments/connection-arguments';

@Resolver(() => Inventory)
export class InventoriesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => InventoryConnection)
  async inventoryConnection(
    @Args('connectionArgs', { type: () => ConnectionArguments })
    connectionArgs: ConnectionArguments,
  ): Promise<InventoryConnection> {
    return findManyCursorConnection(
      (args: PrismaFindManyArguments<{ id: number }>) =>
        this.prisma.inventory.findMany(args),
      () => this.prisma.customer.count(),
      connectionArgs,
    );
  }
}
