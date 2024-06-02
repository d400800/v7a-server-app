import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './is-public.decorator';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from './is-admin.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let userData;

    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      userData = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request['user'] = userData;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }

    if (isAdmin) {
      if (userData?.role === 'admin') {
        return true;
      } else {
        throw new UnauthorizedException();
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    console.log(request.cookies);

    return request.cookies?.access_token;
  }
}
