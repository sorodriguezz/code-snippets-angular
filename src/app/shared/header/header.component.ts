import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLogin: boolean = false;
  public loggedUser:string | null = sessionStorage.getItem("user");

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.isLogin = true;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
