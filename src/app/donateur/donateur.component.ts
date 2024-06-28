import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashboardonateurComponent } from './dashboardonateur/dashboardonateur.component';

@Component({
  selector: 'app-donateur',
  standalone: true,
  imports: [LoginComponent,SignupComponent,NavbarComponent,FormsModule,RouterOutlet,HttpClientModule,CommonModule,DashboardonateurComponent],
  templateUrl: './donateur.component.html',
  styleUrl: './donateur.component.css'
})
export class DonateurComponent {
  showSignup: boolean = true;

  toggleForm(showSignup: boolean) {
    this.showSignup = showSignup;
  }
}
