import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Properties } from 'src/app/properties/properties';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: [
      'admin@gmail.com', [
        Validators.required,
        Validators.pattern(Properties.VALIDATION_EMAIL)
      ]
    ],
    password: ['p4s530rd', [Validators.required]],
  });

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router,
  ) {
    if(sessionStorage.getItem(environment.TOKEN)) {
      this.router.navigate(['/home']);
    }
  }

  public login(): void {
    if( this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe({
        next: (data: any) => {
          sessionStorage.setItem(environment.TOKEN, data.token);
          sessionStorage.setItem(environment.USER, data.user);
          sessionStorage.setItem(environment.EMAIL, data.email);
          sessionStorage.setItem(environment.ROLES, data.roles);
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Contraseña o correo incorrecto',
      });
    }
  }

}
