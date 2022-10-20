import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './core/database.service';
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
      synchronize: true,
      migrationsTableName: 'migrations',
      migrationsRun: true,
      migrations: [/*...*/],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      timezone: 'utc',
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    StatsModule,
    MailModule,
    FilesModule,
    LogsModule,
    AppValuesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {
  constructor(
    private dbService: DatabaseService,
  ) {
    this.init();
  }

  private async init() {
    await this.dbService.seedDB();
  }
}
