import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '@ant-design/icons-angular';
import { NgbDropdownModule, NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [CommonModule,RouterModule,IconModule,NgbDropdownModule,NgbNavItem,NgbNavLink,NgbNavContent,NgbNavOutlet,NgbNav,LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.css'
})
export class NavRightComponent implements OnInit{
  @Input() styleSelectorToggle: any;
 
  notifications: any[] = [];
  apiUrl = 'http://localhost/backend/beneficiaires';

  constructor(private http: HttpClient) {}

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
    // Redirection après la déconnexion si nécessaire
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