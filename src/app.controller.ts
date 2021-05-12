import { Controller, Req, Get, Post, UseGuards, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private urlService: UrlService,
  ) {}

  @Get('r/*')
  getHello(@Req() request: Request, @Res() response: Response) {
    //Log user request and information like IP, Browser, OS,
    const redirectedUrl = this.urlService.getMainUrlByUniqueUrl(
      request.originalUrl.split('/')[2],
    );
    if (redirectedUrl) {
      response.redirect(redirectedUrl);
    } else {
      response.statusCode = 404;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
