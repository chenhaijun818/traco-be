import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { CoreModule } from "./core/core.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    ProjectModule,
    CoreModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot("mongodb://127.0.0.1/lizen")
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
