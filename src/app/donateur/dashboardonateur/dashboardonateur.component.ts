import { NavbarComponent } from './../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboardonateur',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './dashboardonateur.component.html',
  styleUrl: './dashboardonateur.component.css'
})
export class DashboardonateurComponent implements OnInit{
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
    const donId = user.id;

    this.http.get<any[]>(`http://localhost/backend/dons/dons.php?id_don=${donId}`)
      .subscribe({
        next: response => {
          this.demandes = response;
          this.calculateTotals();
          this.retrieveTransactionHistory(donId); // Appel de la fonction pour récupérer l'historique des transactions
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

  retrieveTransactionHistory(donId: number): void {
    this.http.get<any[]>(`http://localhost/backend/dons/medicaments.php?id_don=${donId}`)
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
