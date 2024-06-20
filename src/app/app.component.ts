import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import {  CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { SignupComponent } from './beneficiaire/signup/signup.component';
import { LoginComponent } from './beneficiaire/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavLeftComponent } from './beneficiaire/navbar/nav-left/nav-left.component';
import { NavRightComponent } from './beneficiaire/navbar/nav-right/nav-right.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterOutlet,RouterModule,BeneficiaireComponent,AccueilComponent,SignupComponent,LoginComponent,HttpClientModule,NavLeftComponent,NavRightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 
  constructor( private router :  Router) {
    
   }
  
  ngOnInit(): void {}
  onInscriptionClick() {
    this.router.navigate(['/beneficiaire']);
  }
}
