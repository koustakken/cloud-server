import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
	providers: [AuthService, LocalStrategy],
	controllers: [AuthController],
	imports: [UsersModule, PassportModule],
})
export class AuthModule { }