import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { VerificationModule } from './verification/verification.module';
import { DocumentsModule } from './documents/documents.module';
import { SavedPropertiesModule } from './saved-properties/saved-properties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    TasksModule,
    UsersModule,
    AuthModule,
    PropertiesModule,
    VerificationModule,
    DocumentsModule,
    SavedPropertiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
