import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  private urls = {};
  shortner(url: string): string {
    const shortenedUrl = this.getUniqueUrl();
    this.urls[shortenedUrl] = url;
    return shortenedUrl;
  }

  private getUniqueUrl(): string {
    let acceptedId = false;
    let shortenedUrl = this.makeUniqueUrl(5);
    while (!acceptedId) {
      if (!this.isUsedNewUrl(shortenedUrl)) {
        acceptedId = true;
        continue;
      }
      shortenedUrl = this.makeUniqueUrl(5);
    }

    return shortenedUrl;
  }

  getMainUrlByUniqueUrl(shortenedUrl: string): string | undefined {
    return this.urls[shortenedUrl] ? this.urls[shortenedUrl] : undefined;
  }

  private isUsedNewUrl(shortenedUrl: string): boolean {
    return this.urls[shortenedUrl];
  }

  private makeUniqueUrl(length: number): string {
    var result = [];
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      );
    }
    return result.join('');
  }
}
