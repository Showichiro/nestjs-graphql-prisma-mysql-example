import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
import { GraphQLError } from 'graphql/error';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(ComplexityPlugin.name);
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async requestDidStart(): Promise<GraphQLRequestListener<BaseContext>> {
    const maxComplexity = 20;
    const { schema } = this.gqlSchemaHost;
    const logger = this.logger;

    return {
      // eslint-disable-next-line @typescript-eslint/require-await
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
        logger.log(`Query Complexity: ${complexity}`);
      },
    };
  }
}
