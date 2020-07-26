

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent , ProfileComponent, PostControlComponent, HomeComponent} from './dashboard.pages.index';
import { LoginVerifyGuard } from 'src/app/services/guards/login-verify.guard';
import { AdminVerifyGuard } from 'src/app/services/guards/guards.index';
import { NotifyViewComponent } from './notify-control/notify-view.component';
import { NotifyControlComponent } from './notify-control/notify-control.component';





const dashboardRoutes: Routes = [

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [LoginVerifyGuard],
        canActivateChild: [LoginVerifyGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'postControl',
                component: PostControlComponent,
            },
            {
                path: 'notify',
                component: NotifyControlComponent,
            },
            {
                path: 'notify/message/:id',
                component: NotifyViewComponent,
            },

            {
                path: '**',
                component: PostControlComponent
            }
        ]
    }

];


export const DASHBOARD_ROUTES = RouterModule.forChild( dashboardRoutes );
