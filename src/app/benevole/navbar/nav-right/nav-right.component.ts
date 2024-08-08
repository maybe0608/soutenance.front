import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IconModule } from '@ant-design/icons-angular';
import { NgbDropdownModule, NgbModal, NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.css'
})
export class NavRightComponent {
  @Input() styleSelectorToggle: any;
  notifications: any[] = [];
  apiUrl = 'http://localhost/backend/volontaires'; // Update the API URL if needed
  profile: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.profile = JSON.parse(user).nom;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']); 
  }

  getNotifications(id: number): void {
    this.http.get(`${this.apiUrl}/volontaire_notif.php?id_volontaire=${id}`).subscribe(
      (data: any) => {
        this.notifications = data;
      },
      error => {
        console.error('Error fetching notifications', error);
      }
    );
  }
}