import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-benevole',
  standalone: true,
  imports: [CommonModule,FormsModule,SignupComponent,LoginComponent,RouterModule],
  templateUrl: './benevole.component.html',
  styleUrl: './benevole.component.css'
})
export class BenevoleComponent {
  showSignup: boolean = true;

 toggleForm(showSignup: boolean) {
   this.showSignup = showSignup;
 }
}