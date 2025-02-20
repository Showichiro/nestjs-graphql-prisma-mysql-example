import { Injectable, Scope } from '@nestjs/common';
import { BaseDataLoader } from 'src/common/base-data-loader/base-data-loader';
import { Order } from 'src/graphql/orders/order/order';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class OrderDataLoaderService extends BaseDataLoader<
  number,
  Omit<Order, 'customer' | 'inventory'>[]
> {
  constructor(private prisma: PrismaService) {
    super();
  }

  protected async batchLoad(
    keys: number[],
  ): Promise<(Omit<Order, 'customer' | 'inventory'>[] | Error)[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId: { in: keys } },
    });
    const mappedOrders = keys.map((id) => {
      const myOrders = orders.filter((o) => o.customerId === id);
      return myOrders;
    });
    return mappedOrders;
  }
}
