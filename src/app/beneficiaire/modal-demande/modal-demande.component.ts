import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-demande',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule ],
  templateUrl: './modal-demande.component.html',
  styleUrl: './modal-demande.component.css'
})
export class ModalDemandeComponent implements OnInit {
  filteredMedicaments: any[] = [];
  selectedMedicament: any = null;
  showMedicamentForm: boolean = true;
  medicamentSearch: string = '';
  quantite: number = 0;
  medicaments: any[] = [];
  apiUrl = 'http://localhost/backend/beneficiaires';

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {}

  ngOnInit(): void {
    // Additional initialization if needed
  }

  filterMedicaments(): void {
    if (this.medicamentSearch.length > 0) {
      this.http.get<any[]>(`${this.apiUrl}/medicaments2.php?search=${this.medicamentSearch}`)
        .subscribe({
          next: (medicaments: any[]) => this.filteredMedicaments = medicaments,
          error: (error: any) => {
            console.error('Error fetching medicaments:', error);
            this.filteredMedicaments = [];
          }
        });
    } else {
      this.filteredMedicaments = [];
    }
  }
  
  selectMedicament(medicament: any): void {
    this.selectedMedicament = medicament;
    this.medicamentSearch = medicament.nom; // Set selected medicament name in the input field
    this.filteredMedicaments = []; // Hide the medicament list
  }

  addMedicament(): void {
    if (this.medicaments.length < 5) {
      this.medicaments.push({
        id: this.selectedMedicament.id,
        quantite: this.quantite
      });
      this.selectedMedicament = null;
      this.medicamentSearch = '';
      this.quantite = 0;
      this.filteredMedicaments = [];
    } else {
      alert('Nombre de médicaments atteint. Faites une nouvelle demande.');
    }
  }

  confirmSelection(): void {
    this.activeModal.close(this.medicaments);
  }

  dismissModal(): void {
    this.activeModal.dismiss();
  }
}