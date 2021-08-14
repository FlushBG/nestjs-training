import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.stage}`],
    }),
    AuthModule,
    TasksModule,
    TypeOrmModule.forRoot({
      // TODO: Move to proper configuration management
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      // Bad for production, better use migrations
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
