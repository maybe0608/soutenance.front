import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  profile: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost/backend/beneficiaires/login_beneficiaire.php', credentials)
      .subscribe({
        next: response => {
          console.log('Login successful', response);
          // Store user information in localStorage
          localStorage.setItem('user', JSON.stringify(response.user));
          // Redirect to the user's account page
          this.router.navigate(['accueil/beneficiaire/monCompte']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect.';
          } else {
            console.error('Error logging in', error);
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          }
        }
      });
  }
}