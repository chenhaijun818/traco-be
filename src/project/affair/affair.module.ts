import { Module } from '@nestjs/common';
import { AffairController } from "./affair.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Affair, AffairSchema } from "../models/affair";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Affair.name, schema: AffairSchema }
    ]),
  ],
  controllers: [AffairController]
})
export class AffairModule {}
