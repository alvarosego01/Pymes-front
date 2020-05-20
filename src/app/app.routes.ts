import { RouterModule, Routes } from '@angular/router';


import { HomeComponent, RegisterComponent, UsComponent } from './pages/pages.index';
import { LoginVerifyGuard } from './services/guards/login-verify.guard';

// LoginVerifyGuard


const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent },
    // {
        // path: 'dashboard',
        // component: DashboardComponent,
        // canActivate: [ VerificaTokenGuard ],
        // data: { titulo: 'Dashboard' }
    // },
    { path: 'aboutUs', component: UsComponent },
    { path: 'register',
    component: RegisterComponent,
    },
    { path: '**', component: UsComponent }
];



export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );