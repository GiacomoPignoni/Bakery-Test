import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInput, AuthOutput } from 'src/app/models/auth';
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';

const USER_TOKEN_KEY = "Token";

@Injectable()
export class UserService {

  public isLogged = false;

  private _userToken: string;
  public get userToken(): string {
    return this._userToken;
  }

  constructor(
    private readonly http: HttpClient
  ) {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (token) {
      this._userToken = token;
      this.isLogged = true;
    }
  }

  public login(email: string, password: string): Observable<AuthOutput> {
    const input: AuthInput = {
      email,
      password
    };

    return this.http.post("user/auth", input).pipe(
      tap((res: AuthOutput) => {
        if (res && res.token) {
          this.isLogged = true;
          this.saveToken(res.token);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(USER_TOKEN_KEY);
    location.reload();
  }

  private saveToken(token: string): void {
    this._userToken = token;
    localStorage.setItem(USER_TOKEN_KEY, token);
  }
}
