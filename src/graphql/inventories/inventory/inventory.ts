import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Inventory as PrismaInventory } from '@prisma/client';

@ObjectType()
export class Inventory implements PrismaInventory {
  @Field(() => ID, { nullable: false })
  id: number;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => Int, { nullable: false })
  quantity: number;
  @Field(() => String, { nullable: false })
  description: string;
  @Field(() => Date, { nullable: false })
  createdAt: Date;
  @Field(() => Date, { nullable: false })
  updatedAt: Date;
}
