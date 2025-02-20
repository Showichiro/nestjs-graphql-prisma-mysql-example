import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaService } from './prisma/prisma.service';
import { OrdersResolver } from './graphql/orders/orders.resolver';
import { CustomersResolver } from './graphql/customers/customers.resolver';
import { CustomerDataLoaderService } from './graphql/orders/customer-data-loader/customer-data-loader.service';
import { InventoriesResolver } from './graphql/inventories/inventories.resolver';
import { InventoryDataLoaderService } from './graphql/orders/inventory-data-loader/inventory-data-loader.service';
import { ComplexityPlugin } from './plugin/complexity-plugin/complexity-plugin';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    OrdersResolver,
    CustomersResolver,
    CustomerDataLoaderService,
    InventoriesResolver,
    InventoryDataLoaderService,
    ComplexityPlugin,
  ],
})
export class AppModule {}
