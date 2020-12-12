import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(readonly route: ActivatedRoute, readonly router: Router) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((token: string) => {
      const rawToken = token;
      const parsedToken = rawToken.split('=')[1];
      localStorage.setItem('token', parsedToken);
      this.router.navigateByUrl('home');
    });
  }
}
