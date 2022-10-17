import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API template')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableCors({ origin: [Environment.app_origin_url || '*'], credentials: true });
  const document = SwaggerModule.createDocument(app, config);
  app.use('/api/docs/swagger.json', (req: any, res: any) => {
    res.send(document);
  });

  SwaggerModule.setup('swagger', app, null, {
    swaggerUrl: `/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(Environment.app_port);
  console.log('\x1b[36m%s\x1b[0m', '[Nest] Server started on port ' + Environment.app_port + ' => http://localhost:' + Environment.app_port + ' 🚀');
}
bootstrap();
