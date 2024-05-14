import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`,
      {
        dbName: MONGO_DB,
      },
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
