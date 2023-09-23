import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        const extensions = error.extensions as Record<string, any>;
        const exception = extensions?.exception as Record<string, any>;

        const graphQLFormattedError: GraphQLFormattedError = {
          message: exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Where the database is running
      host: process.env.DB_HOST || 'db',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      // Where the entities are goint to be found
      // Automatically sincronizes databases schema
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
