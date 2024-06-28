import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterOutlet, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  errorMessage: string | null = null;
  showModal: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log('SignupComponent initialized');
  }

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      this.http.post('http://localhost/backend/donateurs/add_donateur.php', signupForm.value)
        .subscribe({
          next: response => {
            console.log('Donateur added successfully', response);
            this.router.navigate(['/login']); // Rediriger vers la page de connexion
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 409) {
              this.errorMessage = 'Vous avez déjà un compte existant.';
              this.showModal = true;
            } else {
              console.error('Error adding donateur', error);
              this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            }
          }
        });
    }
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/login']);
  }

}
