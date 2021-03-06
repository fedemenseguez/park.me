import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FreeSpaceReportComponent } from './components/free-space-report/free-space-report.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'free-space-report',
    component: FreeSpaceReportComponent,
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent, pathMatch: 'full'}, 
  { path: 'callback', component: LoginComponent}, 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FreeSpaceReportComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, HomeComponent],
})
export class AppModule {}
