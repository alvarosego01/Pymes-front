import { RouterModule, Routes } from '@angular/router';


import { HomeComponent, RegisterComponent, UsComponent } from './pages/pages.index';
import { LoginVerifyGuard } from './services/guards/login-verify.guard';
import { NoLoginVerifyGuard } from './services/guards/guards.index';

// LoginVerifyGuard


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    // {
        // path: 'dashboard',
        // component: DashboardComponent,
        // canActivate: [ VerificaTokenGuard ],
        // data: { titulo: 'Dashboard' }
    // },
    { path: 'us', component: UsComponent },
    { path: 'register',
    // canActivate: [NoLoginVerifyGuard],
    component: RegisterComponent,
    },
    { path: '**', component: HomeComponent },
    { path: '', component: HomeComponent }
];



export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );