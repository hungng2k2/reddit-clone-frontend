import { RefreshTokenPayload } from './../../interface/refresh-token.payload';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { SignupRequestPayload } from 'src/app/interface/signup-request.payload';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { CustomResponse } from 'src/app/interface/custom-response.payload';
import { LoginRequestPayload } from 'src/app/interface/login-request.payload';
import { AuthReponse } from 'src/app/interface/auth-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = `${environment['apiUrl']}/api/auth`;
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  }

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup$ = (signupRequestPayload: SignupRequestPayload) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/signup`, signupRequestPayload)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  login$ = (loginRequestPayload: LoginRequestPayload) => <Observable<boolean>>
    this.http.post<CustomResponse<AuthReponse>>(`${this.apiUrl}/login`, loginRequestPayload)
      .pipe(
        map(response => {
          this.localStorage.store('authenticationToken', response.data?.authenticationToken)
          this.localStorage.store('username', response.data?.username)
          this.localStorage.store('refreshToken', response.data?.refreshToken)
          this.localStorage.store('expireAt', response.data?.expireAt)
          return true
        }),
        catchError(this.handleError)
      )

  logout() {
    this.http.post<Observable<CustomResponse<string>>>(`${this.apiUrl}/logout`, this.refreshTokenPayload).subscribe({
      next: console.log,
      error: console.error
    })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expireAt');
  }

  refreshToken$ = (): Observable<AuthReponse> => {
    const refreshTokenPayload: RefreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    return this.http.post<CustomResponse<AuthReponse>>(`${this.apiUrl}/refresh/token`, refreshTokenPayload)
      .pipe(
        tap(response => {
          this.localStorage.store('authenticationToken', response.data?.authenticationToken);
          this.localStorage.store('expireAt', response.data?.expireAt);
        }),
        map(response => response.data!)
      )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured - Error code: ${error.status}`);
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getJwtToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }
  getUsername(): string {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }
  getExpirationTime(): Date {
    return this.localStorage.retrieve('expireAt');
  }
}

