import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthUser {
  id: string;
  displayName: string;
  email: string | null;
}

export interface AuthStatus {
  authenticated: boolean;
  user?: AuthUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthproxyService {
  // this will be azure URL as we expose this in express server
  private apiUrl = '/api/auth/';
  private authStatusSubject = new BehaviorSubject<AuthStatus>({ authenticated: false });
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }
  checkAuthStatus(): Observable<AuthStatus> {
    return this.http.get<AuthStatus>(`${this.apiUrl}status`, { withCredentials: true }).pipe(
      tap(status => this.authStatusSubject.next(status))
    );
  }

  login(): void {
    window.location.href = '/auth/google';
  }
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.authStatusSubject.next({ authenticated: false }))
    );
  }

  get isAuthenticated(): boolean {
    return this.authStatusSubject.value.authenticated;
  }

  get currentUser(): AuthUser | null {
    return this.authStatusSubject.value.user || null;
  }
}
