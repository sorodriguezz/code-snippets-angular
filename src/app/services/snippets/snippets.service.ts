import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @author: Sebastián Rodríguez
   */
  getAllSnippets(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/snippets`, {})
  }

}
