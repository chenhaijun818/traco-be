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

@Module({
  imports: [
    UserModule,
    ProjectModule,
    CoreModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot("mongodb://traco-mongo:27017/traco", {
      user: 'user',
      pass: '123456'
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
