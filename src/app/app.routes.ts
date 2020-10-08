import { RouterModule, Routes } from '@angular/router';


import { HomeComponent, RegisterComponent, UsComponent, ProfileViewComponent, VerifyControlComponent, CheckoutResponseComponent, ContactComponent, ZonaPymesComponent } from './pages/pages.index';
import { InfoPostComponent } from './components/components.index';

// LoginVerifyGuard





const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    // {
        // path: 'dashboard',
        // component: DashboardComponent,
        // canActivate: [ VerificaTokenGuard ],
        // data: { titulo: 'Dashboard' }
    // },
    { path: 'verify/:type', component: VerifyControlComponent },
    { path: 'us', component: UsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'zonaPyme', component: ZonaPymesComponent },
    { path: 'checkoutResponse/:id', component: CheckoutResponseComponent },
    { path: 'checkoutResponse/:id/:validate', component: CheckoutResponseComponent },
    { path: 'publication/infoPost/:id', component: InfoPostComponent },
    { path: 'user/:id', component: ProfileViewComponent },
    { path: 'register',
    // canActivate: [NoLoginVerifyGuard],
    component: RegisterComponent,
    },
    { path: '**', component: HomeComponent },
    { path: '', component: HomeComponent }
];



export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );