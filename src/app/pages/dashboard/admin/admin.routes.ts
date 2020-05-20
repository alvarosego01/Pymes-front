

import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminVerifyGuard } from 'src/app/services/guards/guards.index';

import { PostManagerComponent } from './admin.components.index';
import { DashboardComponent } from '../dashboard.component';






const adminRoutes: Routes = [

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminVerifyGuard],
        canActivateChild: [AdminVerifyGuard],
        children: [

            {
                path: 'postManager',
                component: PostManagerComponent
            },
            {
                path: '**',
                component: DashboardComponent
            }

        ]
    }

];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );
