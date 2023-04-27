import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from 'node:fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {key: fs.readdirSync('./certs/traco.key'), cert: fs.readFileSync('./certs/traco.pem')}
  });
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
