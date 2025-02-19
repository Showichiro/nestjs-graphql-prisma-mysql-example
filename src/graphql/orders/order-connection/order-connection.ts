import { ObjectType } from '@nestjs/graphql';
import { Connection } from 'src/common/connection/connection';
import { Order } from '../order/order';

@ObjectType()
export class OrderConnection extends Connection<Order>(Order) {}
