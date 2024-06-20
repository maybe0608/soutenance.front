import { DashboardComponent } from './beneficiaire/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
export const routes: Routes = [
    //generale
    { path: '', component: AccueilComponent },
   { path: 'beneficiaire', component: BeneficiaireComponent },
  //benef
//  { path: 'accueil/beneficiaire/login', component: LoginComponent },
//  { path: 'accueil/beneficiaire/signup', component:SignupComponent}
    {path: 'accueil/beneficiaire/monCompte', component:DashboardComponent}
];
