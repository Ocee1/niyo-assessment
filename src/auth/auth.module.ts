import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TaskGateway } from 'src/tasks/tasks.gateway';
import { TasksModule } from 'src/tasks/tasks.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('EXPIRES_IN')
        }
      })
    }),
    UsersModule,
    TasksModule
  ],
  controllers: [AuthController],
  providers: [ AuthService, AuthGuard],
  exports: [
    JwtModule, AuthService
  ]
})
export class AuthModule {}
