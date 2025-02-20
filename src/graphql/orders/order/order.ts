import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Order as PrismaOrder } from '@prisma/client';
import { Customer } from 'src/graphql/customers/customer/customer';
import { Inventory } from 'src/graphql/inventories/inventory/inventory';

@ObjectType()
export class Order implements Omit<PrismaOrder, 'customerId' | 'inventoryId'> {
  @Field(() => ID, { nullable: false })
  id!: number;
  @Field(() => Int, { nullable: false })
  quantity: number;
  @Field(() => String, { nullable: true })
  description: string;
  @Field(() => Date, { nullable: false })
  createdAt: Date;
  @Field(() => Date, { nullable: false })
  updatedAt: Date;
  @Field(() => Customer)
  customer: Customer;
  @Field(() => Inventory)
  inventory: Inventory;
}
