import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    readonly route: ActivatedRoute,
    readonly router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((token: string) => {
      const rawToken = token;
      const parsedToken = rawToken.split('=')[1];
      sessionStorage.setItem('token', parsedToken);
      const decodedToken: any = jwt_decode(parsedToken);
      this.authService.name = decodedToken.name;
      this.router.navigateByUrl('home');
    });
  }
}
