import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './winston-logger.service';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;

const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;
// const connectionStringDev = `mongodb://admin:example@localhost:27017`;

console.log('connectionString:', connectionString);

@Module({
  imports: [
    MongooseModule.forRoot(connectionString, {
      dbName: MONGO_DB,
    }),
    WinstonModule.forRoot({
      transports: winstonLogger.transports,
      format: winstonLogger.format,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CompaniesModule,
    ShoppingListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
