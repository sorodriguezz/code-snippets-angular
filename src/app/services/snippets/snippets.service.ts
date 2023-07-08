import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetsService {
  constructor(private http: HttpClient) {}

  /**
   * @author: Sebastián Rodríguez
   */
  getAllSnippets(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/snippets`, {});
  }

  /**
   * @author: Sebastián Rodríguez
   */
  getActiveSnippets(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/snippets-actives`, {});
  }

  /**
   * @author: Sebastián Rodríguez
   */
  getInactiveSnippets(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/snippets-inactives`, {});
  }
  /**
   * @author: Sebastián Rodríguez
   */
  changeSnippetStatus(slug: string): Observable<any> {
    return this.http.patch(`${environment.BASE_URL}/snippets/${slug}`, {});
  }
}
