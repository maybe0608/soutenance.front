import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IconModule } from '@ant-design/icons-angular';
import { NgbDropdownModule, NgbModal, NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { LoginComponent } from '../../login/login.component';
import { ModalDemandeComponent } from '../../modal-demande/modal-demande.component';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [CommonModule,RouterModule,IconModule, HttpClientModule, NgbDropdownModule,NgbNavItem,NgbNavLink,NgbNavContent,NgbNavOutlet,NgbNav,LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.css'
})
export class NavRightComponent implements OnInit{
  @Input() styleSelectorToggle: any;
  notifications: any[] = [];
  apiUrl = 'http://localhost/backend/beneficiaires';
  profile: any;

  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.profile = JSON.parse(user).nom;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/beneficiaire']); 
  }

  openDemandeModal(): void {
    const modalRef = this.modalService.open(ModalDemandeComponent);
    modalRef.result.then((medicaments: any[]) => {
      if (medicaments) {
        const user = JSON.parse(localStorage.getItem('user')!);
        const id_beneficiaire = user.id;
        const defaultDemande = {
          statut: 'en cours',
          nb_demande: medicaments.length,
          id_beneficiaire: id_beneficiaire
        };
  
        this.http.post<any>(`${this.apiUrl}/createDemandes.php`, defaultDemande)
          .subscribe({
            next: response => {
              console.log('Nouvelle demande créée:', response);
              medicaments.forEach((med: any) => {
                const detailDemande = {
                  id_demande: response.id,
                  id_medicament: med.id,
                  quantite: med.quantite
                };
                this.http.post<any>(`${this.apiUrl}/createDetailDemande.php`, detailDemande)
                  .subscribe({
                    next: res => console.log('Détail de la demande ajouté:', res),
                    error: err => console.error('Erreur lors de l\'ajout du détail de la demande:', err)
                  });
              });
            },
            error: error => {
              console.error('Erreur lors de la création de la demande:', error);
            }
          });
      }
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }

  getNotifications(id: number): void {
    this.http.get(`${this.apiUrl}/beneficiaire_notif.php?id_beneficiaire=${id}`).subscribe(
      (data: any) => {
        this.notifications = data;
      },
      error => {
        console.error('Error fetching notifications', error);
      }
    );
  }
}