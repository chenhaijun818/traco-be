import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Role, RoleSchema} from "../models/role";

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: Role.name, schema: RoleSchema}
      ])
  ],
  controllers: [RoleController]
})
export class RoleModule {}
