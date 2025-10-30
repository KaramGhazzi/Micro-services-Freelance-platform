import { NestFactory } from '@nestjs/core';
import { writeSubGraphSchema } from '@package/general';
import { AppModule } from '../app.module';

async function generate() {
  const app = await NestFactory.create(AppModule, {
    preview: true,
  });

  await app.init();

  writeSubGraphSchema(app);

  await app.close();
}

generate().then(() => {
  process.exit(0);
});
