import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  Res,
  Inject,
} from '@nestjs/common';
import { Logger } from 'winston';
import { AuthService } from './auth.service';
import { Public } from './is-public.decorator';
import { SignInDto } from './dtos/sign-in.dto';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('health-check')
  healthCheck() {
    this.logger.log(`Accessed health-check route`, this);

    return 'OK';
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    this.logger.log(`Log-in: ${signInDto.username}`, this);

    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
    });

    this.logger.log(`Log-out: ${req.user.username}`, this);

    return res.send({
      message: 'Logout successful',
    });
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
