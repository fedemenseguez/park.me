import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(readonly router: Router, public authService: AuthService) { }

  reportFreeSpace() {
    this.router.navigate(['./free-space-report']);
  }
  goHome(){
    this.router.navigate(['./home']);
  }

  logout() {
    this.authService.name = '';
    sessionStorage.clear();
  }
}
