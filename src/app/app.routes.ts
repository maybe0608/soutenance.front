import { DashboardComponent } from './beneficiaire/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { DonateurComponent } from './donateur/donateur.component';
import { DashboardonateurComponent } from './donateur/dashboardonateur/dashboardonateur.component';
export const routes: Routes = [
    //generale
    { path: '', component: AccueilComponent },
 
  //benef
//  { path: 'accueil/beneficiaire/login', component: LoginComponent },
//  { path: 'accueil/beneficiaire/signup', component:SignupComponent}
    { path: 'beneficiaire', component: BeneficiaireComponent },
    {path: 'beneficiaire/monCompte', component:DashboardComponent},
   // donateur
   {path:'donateur', component: DonateurComponent},
    {path:'donateur/monCompte', component: DashboardonateurComponent}

];
