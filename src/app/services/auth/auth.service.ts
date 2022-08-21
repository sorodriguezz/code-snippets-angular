import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  signin(credenciales: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/signin`, credenciales, {});
  }

  authTokenVerify(): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/verify`, {})
      .pipe(
        map((data: any) => {
          if(data.permitido) return true;
          Swal.fire({
            title: 'Acceso denegado',
            text: 'No tienes permisos para acceder a esta sección',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          sessionStorage.removeItem(environment.TOKEN);
          return false;
        }),
        catchError(() => of(false))
      );
  }
}
