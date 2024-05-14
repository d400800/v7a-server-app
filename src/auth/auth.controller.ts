import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './is-public.decorator';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
