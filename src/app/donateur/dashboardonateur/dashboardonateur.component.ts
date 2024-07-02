import { NavbarComponent } from './../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboardonateur',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './dashboardonateur.component.html',
  styleUrl: './dashboardonateur.component.css'
})
export class DashboardonateurComponent implements OnInit{
  dons: any[] = [];
  totalDons: number = 0;
  totalAcceptes: number = 0;
  totalRejetes: number = 0;
  totalEnCours: number = 0;
  transactionHistory: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const donId = user.id;

    this.http.get<any[]>(`http://localhost/backend/donateurs/dons.php?id_don=${donId}`)
      .subscribe({
        next: response => {
          this.dons = response;
          this.calculateTotals();
          this.retrieveTransactionHistory(donId);
        },
        error: error => {
          console.error('Erreur lors de la récupération des dons:', error);
        }
      });
  }

  calculateTotals(): void {
    this.totalDons = this.dons.length;
    this.totalAcceptes = this.dons.filter(d => d.etat === 'remis').length;
    this.totalRejetes = this.dons.filter(d => d.etat === 'rejeté').length;
    this.totalEnCours = this.dons.filter(d => d.etat === 'en cours').length;
  }

  retrieveTransactionHistory(donId: number): void {
    this.http.get<any[]>(`http://localhost/backend/donateurs/medicaments.php?id_don=${donId}`)
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