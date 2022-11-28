import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Environment } from './environment/environment';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API template')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableCors({ origin: [Environment.app_origin_url || '*'], credentials: true });

  app.use(session({
    secret: Environment.access_token_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  const document = SwaggerModule.createDocument(app, config);
  app.use('/api/docs/swagger.json', (req: any, res: any) => {
    res.send(document);
  });

  SwaggerModule.setup('swagger', app, document, {
    swaggerUrl: `/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(Environment.app_port);
  console.log('\x1b[36m%s\x1b[0m', '[Nest] Server started on port ' + Environment.app_port + ' => http://localhost:' + Environment.app_port + ' API docs on http://localhost:8000/swagger 🚀');
}
bootstrap();
