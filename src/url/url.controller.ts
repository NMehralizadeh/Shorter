import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}
  @Post('shortner')
  shortner(@Req() request: Request) {
    return this.urlService.shortner(request.query['url'].toString());
  }
}
