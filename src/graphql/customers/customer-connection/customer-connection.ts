import { ObjectType } from '@nestjs/graphql';
import { Customer } from '../customer/customer';
import { Connection } from 'src/common/connection/connection';

@ObjectType()
export class CustomerConnection extends Connection<Customer>(Customer) {}
