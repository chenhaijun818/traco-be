import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, StreamableFile } from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as sharp from 'sharp';
import { createReadStream } from "fs";
import { join } from "path";
import * as process from "process";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file): any {
    const image = sharp(file.buffer);
    image.metadata().then(data => {
      if (data.width > 300) {

      }
    })
    return 'ok'
  }

  @Get('getFile')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'src/statics/rjjsbx.jpg'));
    return new StreamableFile(file);
  }

}
