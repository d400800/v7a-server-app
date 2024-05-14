import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './is-public.decorator';
import { SignInDto } from './dtos/sign-in.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const { access_token } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.send({
      message: 'Login successful',
    });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
    });

    return res.send({
      message: 'Logout successful',
    });
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
