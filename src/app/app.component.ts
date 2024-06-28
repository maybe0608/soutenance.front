import { SignupComponent } from './donateur/signup/signup.component';
import { LoginComponent } from './donateur/login/login.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import {  CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { HttpClientModule } from '@angular/common/http';
import { NavLeftComponent } from './beneficiaire/navbar/nav-left/nav-left.component';
import { NavRightComponent } from './beneficiaire/navbar/nav-right/nav-right.component';
import { DonateurComponent } from './donateur/donateur.component';
import { NavbarComponent } from './donateur/navbar/navbar.component';
import { NavrightComponent } from './donateur/navbar/navright/navright.component';
import { NavleftComponent } from './donateur/navbar/navleft/navleft.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterOutlet,RouterModule,BeneficiaireComponent,AccueilComponent,SignupComponent,LoginComponent,HttpClientModule,NavLeftComponent,NavRightComponent,DonateurComponent,NavbarComponent,
             NavrightComponent,NavleftComponent,LoginComponent,SignupComponent
  ],
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
