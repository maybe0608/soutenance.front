import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboarbenevole',
  standalone: true,
  imports: [HttpClientModule,RouterOutlet,NavbarComponent,CommonModule,FormsModule],
  templateUrl: './dashboarbenevole.component.html',
  styleUrl: './dashboarbenevole.component.css'
})
export class DashboarbenevoleComponent implements OnInit {
  demandes: any[] = [];
  filteredDemandes: any[] = [];
  searchTerm: string = '';
  demandeDetails: any[] = [];
  isModalVisible: boolean = false;
  currentDemandeId: number | null = null;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const benevoleId = user.id;

    this.http.get<any[]>(`http://localhost/backend/benevoles/demandes.php?id_benevole=${benevoleId}`)
      .subscribe({
        next: response => {
          this.demandes = response;
          this.filterDemandes();
        },
        error: error => {
          console.error('Erreur lors de la récupération des demandes:', error);
        }
      });
}

filterDemandes(): void {
    this.filteredDemandes = this.demandes.filter(demande =>
      demande.statut.startsWith('accepté')
    );
}
refreshDemandes(): void {
  const user = JSON.parse(localStorage.getItem('user')!);
  const benevoleId = user.id;
  
  this.http.get<any[]>(`http://localhost/backend/benevoles/demandes.php?id_benevole=${benevoleId}`)
    .subscribe({
      next: response => {
        this.demandes = response;
        this.filterDemandes(); // Réapplique le filtrage
      },
      error: error => {
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    });
}

  searchBeneficiaire(): void {
    this.filteredDemandes = this.demandes.filter(demande =>
      demande.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
 
  viewDetails(id: number): void {
    this.currentDemandeId = id;
    this.http.get<any[]>(`http://localhost/backend/benevoles/medicaments.php?id_demande=${id}`)
      .subscribe({
        next: response => {
          this.demandeDetails = response;
          this.isModalVisible = true;
        },
        error: error => {
          console.error('Erreur lors de la récupération des détails de la demande:', error);
        }
      });
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  validateDemande(): void {
    if (this.currentDemandeId !== null) {
      this.http.post('http://localhost/backend/benevoles/update_demande.php', {
        id: this.currentDemandeId,
        statut: 'remis'
      }).subscribe({
        next: response => {
          console.log('Réponse du serveur:', response);
          console.log('Demande validée');
          this.closeModal();
          // Refresh the list of demandes if needed
        },
        error: error => {
          console.error('Erreur lors de la validation de la demande:', error);
        }
      });
    }
  }
  

  refuseDemande(): void {
    if (this.currentDemandeId !== null) {
      this.http.post('http://localhost/backend/benevoles/update_demande.php', {
        id: this.currentDemandeId,
        statut: 'refusé'
      }).subscribe({
        next: response => {
          console.log('Demande refusée');
          this.closeModal();
          // Refresh the list of demandes if needed
        },
        error: error => {
          console.error('Erreur lors du refus de la demande:', error);
        }
      });
    }
  }
}