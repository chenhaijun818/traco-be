
import {join} from 'node:path';
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { CoreModule } from "./core/core.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import {ServeStaticModule} from "@nestjs/serve-static";
import {config} from 'dotenv';
config({path: '.env'})
@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, './certs')}),
    UserModule,
    ProjectModule,
    CoreModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:27017/traco`, {
      user: process.env.MONGO_DB_USERNAME,
      pass: process.env.MONGO_DB_PASSWORD
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TokenInterceptor
    }
  ]
})
export class AppModule {
}
