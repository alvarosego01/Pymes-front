

import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminVerifyGuard } from 'src/app/services/guards/guards.index';

import { PostManagerComponent } from './admin.components.index';






const dashboardRoutes: Routes = [

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminVerifyGuard],
        canActivateChild: [AdminVerifyGuard],
        children: [

            {
                path: 'postManager',
                component: PostManagerComponent
            }

        ]
    }

];


export const ADMIN_ROUTES = RouterModule.forChild( dashboardRoutes );
