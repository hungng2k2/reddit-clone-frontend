import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { AuthReponse } from '../interface/auth-response.payload';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('refresh') !== -1 || request.url.indexOf('login') !== -1
      || (request.url.indexOf('/api/posts/') !== -1 && request.method.indexOf('GET') !== -1)
      || (request.url.indexOf('/api/subreddit') !== -1 && request.method.indexOf('GET') !== -1)) {
      return next.handle(request);
    }

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status == 403) {
        return this.handleAuthErrors(request, next);
      }
      else {
        return throwError(error);
      }
    }));
  }

  private handleAuthErrors(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken$().pipe(
        switchMap((response: AuthReponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(response.authenticationToken);
          return next.handle(this.addToken(request, response.authenticationToken));
        })
      )
    }
    return next.handle(this.addToken(request, this.refreshTokenSubject.getValue()));
  }

  private addToken(request: HttpRequest<unknown>, jwtToken: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${jwtToken}`)
    });
  }
}
