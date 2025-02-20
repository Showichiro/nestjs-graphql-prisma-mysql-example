import { Injectable, Scope } from '@nestjs/common';
import { BaseDataLoader } from 'src/common/base-data-loader/base-data-loader';
import { Inventory } from 'src/graphql/inventories/inventory/inventory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class InventoryDataLoaderService extends BaseDataLoader<
  number,
  Inventory
> {
  constructor(private prisma: PrismaService) {
    super();
  }

  protected async batchLoad(keys: number[]): Promise<(Inventory | Error)[]> {
    const inventories = await this.prisma.inventory.findMany({
      where: { id: { in: keys } },
    });
    const mappedInventories = keys.map((id) => {
      const inventory = inventories.find((c) => c.id === id);
      return inventory || new Error(`Inventory with id ${id} not found`);
    });

    return mappedInventories;
  }
}
