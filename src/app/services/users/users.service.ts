import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  listUsers(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/users`, {});
  }

  getUserSlug(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/users/${slug}`, {});
  }

  changeUserStatus(slug: string): Observable<any> {
    return this.http.patch(`${environment.BASE_URL}/user/${slug}`, {});
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/user`, userData, {});
  }
}
