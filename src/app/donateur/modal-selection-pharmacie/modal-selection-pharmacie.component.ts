import { CommonModule, NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit,Input, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-selection-pharmacie',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './modal-selection-pharmacie.component.html',
  styleUrl: './modal-selection-pharmacie.component.css'
})
export class ModalSelectionPharmacieComponent implements OnInit{
  pharmacies: any[] = [];
  filteredMedicaments: any[] = [];
  selectedPharmacie: any = null;
  selectedMedicament: any = null;
  showMedicamentForm: boolean = false;
  medicamentSearch: string = '';
  quantite: number = 0;
  medicaments: any[] = [];
  apiUrl = 'http://localhost/backend/donateurs';

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch pharmacies on init
    this.http.get<any[]>(`${this.apiUrl}/pharmacies.php`)
      .subscribe(pharmacies => this.pharmacies = pharmacies);
  }

  filterMedicaments(): void {
    if (this.medicamentSearch.length > 0) {
      this.http.get<any[]>(`${this.apiUrl}/medicaments2.php?search=${this.medicamentSearch}`)
        .subscribe({
          next: medicaments => this.filteredMedicaments = medicaments,
          error: error => {
            console.error('Error fetching medicaments:', error);
            this.filteredMedicaments = [];
          }
        });
    } else {
      this.filteredMedicaments = [];
    }
  }

  selectPharmacie(pharmacie: any): void {
    this.selectedPharmacie = pharmacie;
    this.showMedicamentForm = true;
  }

  selectMedicament(medicament: any): void {
    this.selectedMedicament = medicament;
    this.medicamentSearch = medicament.nom; // Set the medication name in the input field
    this.filteredMedicaments = []; // Clear the medication list
    // Programmatically focus on the quantity input field
    const quantityInput = document.getElementById('quantiteInput');
    if (quantityInput) {
      quantityInput.focus();
    }
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
    this.activeModal.close({
      pharmacie: this.selectedPharmacie,
      medicaments: this.medicaments
    });
  }

  dismissModal(): void {
    this.activeModal.dismiss();
  }
}