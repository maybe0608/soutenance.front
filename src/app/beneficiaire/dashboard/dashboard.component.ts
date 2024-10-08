import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  demandes: any[] = [];
  totalDemandes: number = 0;
  totalApprouves: number = 0;
  totalRejetes: number = 0;
  totalEnAttente: number = 0;
  transactionHistory: any[] = [];
  totalApprouves2: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const beneficiaireId = user.id;

    this.http.get<any[]>(`http://localhost/backend/beneficiaires/demandes.php?id_beneficiaire=${beneficiaireId}`)
      .subscribe({
        next: response => {
          this.demandes = response;
          this.calculateTotals();
          this.retrieveTransactionHistory(beneficiaireId); // Appel de la fonction pour récupérer l'historique des transactions
        },
        error: error => {
          console.error('Erreur lors de la récupération des demandes:', error);
        }
      });
  }

  calculateTotals(): void {
    this.totalDemandes = this.demandes.length;
    this.totalApprouves = this.demandes.filter(d => d.statut === 'accepté complètement').length;
    this.totalRejetes = this.demandes.filter(d => d.statut === 'Rejeté').length;
    this.totalApprouves2 = this.demandes.filter(d => d.statut === 'accepté partiellement').length;
    this.totalEnAttente = this.demandes.filter(d => d.statut === 'en cours').length;
  }

  retrieveTransactionHistory(beneficiaireId: number): void {
    this.http.get<any[]>(`http://localhost/backend/beneficiaires/medicaments.php?id_beneficiaire=${beneficiaireId}`)
      .subscribe({
        next: response => {
          this.transactionHistory = response;
        },
        error: error => {
          console.error('Erreur lors de la récupération de l\'historique des transactions:', error);
        }
      });
  }
}