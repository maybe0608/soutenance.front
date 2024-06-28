import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IconModule } from '@ant-design/icons-angular';
import { NgbDropdownModule, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navright',
  standalone: true,
  imports: [CommonModule,RouterModule,IconModule,NgbDropdownModule,NgbNavItem,NgbNavLink,NgbNavContent,NgbNavOutlet,NgbNav,LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  templateUrl: './navright.component.html',
  styleUrl: './navright.component.css'
})
export class NavrightComponent implements OnInit{
  @Input() styleSelectorToggle: any;
 
  notifications: any[] = [];
  apiUrl = 'http://localhost/backend/donateurs';
constructor(private router: Router, private http: HttpClient) { }

  profile: any;

  ngOnInit(): void {
    // Get user information from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.profile = JSON.parse(user).nom;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']); 
    // Redirection après la déconnexion si nécessaire
  }


  getNotifications(id: number): void {
    this.http.get(`${this.apiUrl}/donateur_notif.php?id_donateur=${id}`).subscribe(
      (data: any) => {
        this.notifications = data;
      },
      error => {
        console.error('Error fetching notifications', error);
      }
    );
  }


}