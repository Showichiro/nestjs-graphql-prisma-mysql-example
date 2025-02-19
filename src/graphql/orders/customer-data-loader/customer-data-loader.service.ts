import { Injectable, Scope } from '@nestjs/common';
import { BaseDataLoader } from 'src/common/base-data-loader/base-data-loader';
import { Customer } from 'src/graphql/customers/customer/customer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class CustomerDataLoaderService extends BaseDataLoader<
  number,
  Customer
> {
  constructor(private prisma: PrismaService) {
    super();
  }

  protected async batchLoad(keys: number[]): Promise<(Customer | Error)[]> {
    const customers = await this.prisma.customer.findMany({
      where: { id: { in: keys } },
    });
    const mappedCustomers = keys.map((id) => {
      const customer = customers.find((c) => c.id === id);
      return customer || new Error(`Customer with id ${id} not found`);
    });

    return mappedCustomers;
  }
}
