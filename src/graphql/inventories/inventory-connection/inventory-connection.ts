import { ObjectType } from '@nestjs/graphql';
import { Connection } from 'src/common/connection/connection';
import { Inventory } from '../inventory/inventory';

@ObjectType()
export class InventoryConnection extends Connection<Inventory>(Inventory) {}
