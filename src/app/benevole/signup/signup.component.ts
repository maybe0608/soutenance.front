import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBenevoleComponent } from '../modal-benevole/modal-benevole.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,ModalBenevoleComponent,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{ 
  errorMessage: string = '';
  showForm: boolean = false;
 form_data : any={};
  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.openModal();
  }

  openModal(): void {
    const modalRef = this.modalService.open(ModalBenevoleComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.showForm = true;
      } else {
        this.showForm = false;
      }
    }).catch(() => {
      this.showForm = false;
    });
  }

  onSubmit() {

    console.log('Form Data:', this.form_data); // Log form data to verify it's correct

    this.http.post('http://localhost/backend/benevoles/send_email.php', this.form_data, {
      headers: { 'Content-Type': 'application/json' } // Use JSON content type
    }).subscribe({
      next: (response) => {
        console.log('Success', response);
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
}