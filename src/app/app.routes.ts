import { FormdonComponent } from './donateur/formdon/formdon.component';
import { DashboardComponent } from './beneficiaire/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { DonateurComponent } from './donateur/donateur.component';
import { DashboardonateurComponent } from './donateur/dashboardonateur/dashboardonateur.component';
import { FormdemandeComponent } from './beneficiaire/formdemande/formdemande.component';
import { BenevoleComponent } from './benevole/benevole.component';
import { DashboarbenevoleComponent } from './benevole/dashboarbenevole/dashboarbenevole.component';
export const routes: Routes = [
    //generale
    { path: '', component: AccueilComponent },
 
  //benef
//  { path: 'accueil/beneficiaire/login', component: LoginComponent },
//  { path: 'accueil/beneficiaire/signup', component:SignupComponent}
    { path: 'beneficiaire', component: BeneficiaireComponent },
    {path: 'beneficiaire/monCompte', component:DashboardComponent},
    {path: 'beneficiaire/monCompte/Demande', component:FormdemandeComponent},
   // donateur
   {path:'donateur', component: DonateurComponent},
    {path:'donateur/monCompte', component: DashboardonateurComponent},
    {path:'donateur/monCompte/Don', component:FormdonComponent},
    // benevole
    {path:'benevole', component: BenevoleComponent},
    {path:'benevole/monCompte', component: DashboarbenevoleComponent},
];
