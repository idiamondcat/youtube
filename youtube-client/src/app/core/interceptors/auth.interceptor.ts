import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    if (this.auth.isLogin.getValue()) {
      const newReq = req.clone({
        setHeaders: { Authorization: `Bearer ${this.auth.accessToken}` },
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}
