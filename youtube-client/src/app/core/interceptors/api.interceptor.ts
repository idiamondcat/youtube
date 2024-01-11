import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {
  private apiKey: string = environment.API_KEY;
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';

  intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    const newUrl = req.clone({
      url: `${this.youtubeUrl}/${req.url}`,
      setParams: {
        key: this.apiKey,
      },
    });
    return next.handle(newUrl);
  }
}
