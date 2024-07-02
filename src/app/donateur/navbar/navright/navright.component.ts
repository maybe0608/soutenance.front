import { ModalSelectionPharmacieComponent } from './../../modal-selection-pharmacie/modal-selection-pharmacie.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IconModule } from '@ant-design/icons-angular';
import { NgbDropdownModule, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet, NgbNav, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navright',
  standalone: true,
  imports: [CommonModule,RouterModule,IconModule,NgbDropdownModule,NgbNavItem,NgbNavLink,NgbNavContent,NgbNavOutlet,NgbNav,LoginComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  templateUrl: './navright.component.html',
  styleUrl: './navright.component.css'
})
export class NavrightComponent implements OnInit{
  profile: string | null = null; // Assurez-vous que profile est correctement typé pour éviter les erreurs
  apiUrl = 'http://localhost/backend/donateurs';
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.profile = JSON.parse(user).nom;
    }
  }

 
  faireDon(): void {
    // Ouvrir la fenêtre modale pour sélectionner la pharmacie
    this.selectPharmacie();
  }
  
 // Méthode pour ouvrir la fenêtre modale de sélection de pharmacie
selectPharmacie(): void {
  const modalRef = this.modalService.open(ModalSelectionPharmacieComponent);
  modalRef.result.then((result: { pharmacie: any, medicaments: any[] }) => {
    if (result) {
      const user = JSON.parse(localStorage.getItem('user')!);
      const id_donateur = user.id;
      const defaultDon = {
        nb_don: result.medicaments.length,
        etat: 'en cours',
        id_donateur: id_donateur,
        id_pharmacie: result.pharmacie.id
      };

      this.http.post<any>(`${this.apiUrl}/createDons.php`, defaultDon)
        .subscribe({
          next: (response: any) => {
            console.log('Nouveau don créé:', response);
            result.medicaments.forEach((med: { id: number, quantite: number }) => {
              const detailDon = {
                id_don: response.id,
                id_medicament: med.id,
                quantite: med.quantite
              };
              this.http.post<any>(`${this.apiUrl}/createDetailDon.php`, detailDon)
                .subscribe({
                  next: (res: any) => console.log('Détail du don ajouté:', res),
                  error: (err: any) => console.error('Erreur lors de l\'ajout du détail du don:', err)
                });
            });
            this.router.navigate(['/donateur/monCompte/Don']);
          },
          error: (error: any) => {
            console.error('Erreur lors de la création du don:', error);
          }
        });
    }
  }, (reason: any) => {
    console.log('Modal dismissed with reason:', reason);
  });
}

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/donateur']);
    // Vous pouvez ajouter des redirections supplémentaires après la déconnexion si nécessaire
  }

}