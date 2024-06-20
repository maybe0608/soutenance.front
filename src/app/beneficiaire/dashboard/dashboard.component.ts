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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const beneficiaireId = user.id;

    this.http.get<any[]>(`http://localhost/backend/beneficiaires/demandes.php?id_beneficiaire=${beneficiaireId}`)
      .subscribe({
        next: response => {
          this.demandes = response;
          this.calculateTotals();
        },
        error: error => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            // Cas où la réponse est HTML (probablement une erreur PHP)
            console.error('Erreur PHP détectée:', error);
            // Afficher un message d'erreur approprié à l'utilisateur ou gérer le problème
          } else {
            console.error('Erreur lors de la récupération des demandes:', error);
            // Afficher un message d'erreur générique à l'utilisateur ou gérer le problème
          }
        }
      });
}

calculateTotals(): void {
    this.totalDemandes = this.demandes.length;
    this.totalApprouves = this.demandes.filter(d => d.statut === 'Approuvé').length;
    this.totalRejetes = this.demandes.filter(d => d.statut === 'Rejeté').length;
    this.totalEnAttente = this.demandes.filter(d => d.statut === 'En attente').length;
}

  retrieveTransactionHistory(): void {
    // Filtrer les 5 dernières demandes avec statut "recuperer"
    const recupererDemandes = this.demandes.filter(d => d.statut === 'recuperer').slice(0, 5);

    // Récupérer les informations nécessaires pour la transaction history
    for (const demande of recupererDemandes) {
      const transaction = {
        id: demande.id,
        date_etude: demande.date_etude,
        nom_medicament: '',
        statut: demande.statut,
        nb_demande: demande.nb_demande
      };

      // Récupérer le nom du médicament correspondant
      this.http.get<any>(`http://localhost/backend/beneficiaires/medicaments.php?id=${demande.id_medicament}`)
        .subscribe(medicament => {
          transaction.nom_medicament = medicament.nom;
          this.transactionHistory.push(transaction);
        });
    }
  }
}