import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(userId: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { userId }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}