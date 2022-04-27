import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private roles!: string[];
  authority!: string;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_DOCTOR') {
          this.authority = 'doctor';
          return false;
        }
        this.authority = 'patient';
        return true;
      });
    }
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
  toHomePage(){
    this.router.navigate(['home']);
  }
}
