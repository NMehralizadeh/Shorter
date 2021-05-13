import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UrlController } from './url/url.controller';
import { UrlService } from './url/url.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017'),
  ],
  controllers: [AppController, UrlController],
  providers: [AppService, UrlService],
})
export class AppModule {
  constructor(private usersSerive: UsersService) {
    this.createAdminUser();
  }

  createAdminUser() {
    this.usersSerive.getByUsername('admin').then((user) => {
      if (!user) {
        this.usersSerive.createAdminUser();
      }
    });
  }
}
