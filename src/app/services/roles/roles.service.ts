import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient,
  ) { }

  listRoles(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/roles`, {});
  }

}
