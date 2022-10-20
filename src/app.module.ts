import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './environment/environment';
import { AppValuesModule } from './modules/app-values/app-values.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { LogsModule } from './modules/logs/logs.module';
import { MailModule } from './modules/mails/mails.module';
import { StatsModule } from './modules/stats/stats.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Environment.db_host,
      port: 3306,
      username: Environment.db_user,
      password: Environment.db_password,
      database: Environment.db_name,
      logging: Environment.db_log_enabled,
      synchronize: false,
      migrationsTableName: 'migrations',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      timezone: 'utc',
    }),
    AuthModule,
    UserModule,
    StatsModule,
    MailModule,
    FilesModule,
    LogsModule,
    AppValuesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
