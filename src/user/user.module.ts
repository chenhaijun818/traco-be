import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController]
})
export class UserModule {
}
