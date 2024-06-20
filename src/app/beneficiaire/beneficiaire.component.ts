import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-beneficiaire',
  standalone: true,
  imports: [LoginComponent,SignupComponent,CommonModule,FormsModule,RouterOutlet,HttpClientModule],
  templateUrl: './beneficiaire.component.html',
  styleUrl: './beneficiaire.component.css'
})
export class BeneficiaireComponent {
   showSignup: boolean = true;

  toggleForm(showSignup: boolean) {
    this.showSignup = showSignup;
  }
}
