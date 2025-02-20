import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Customer as PrismaCustomer } from '@prisma/client';
import { Order } from 'src/graphql/orders/order/order';

@ObjectType()
export class Customer implements PrismaCustomer {
  @Field(() => ID, { nullable: false })
  id: number;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  description: string;
  @Field(() => Date, { nullable: false })
  createdAt: Date;
  @Field(() => Date, { nullable: false })
  updatedAt: Date;
  @Field(() => [Order])
  orders: Array<Order>;
}
