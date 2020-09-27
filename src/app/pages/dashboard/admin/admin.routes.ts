

import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminVerifyGuard } from 'src/app/services/guards/guards.index';

import { AlertaPymesComponent, PostManagerComponent } from './admin.components.index';
import { DashboardComponent } from '../dashboard.component';
import { InfoPostComponent } from 'src/app/components/components.index';
import { ControlCategoryComponent } from './control-category/control-category.component';
import { UserControlComponent } from './user-control/user-control.component';
import { PurchaseStatsComponent } from './purchase-stats/purchase-stats.component';
import { GeneralBalanceComponent } from '../dashboard.pages.index';

const adminRoutes: Routes = [

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminVerifyGuard],
        canActivateChild: [AdminVerifyGuard],
        children: [
            {
                path: "generalBalance",
                component: GeneralBalanceComponent,
              },

            {
                path: 'usersManager',
                component: UserControlComponent,
            },
            {
                path: 'alertaPymes',
                component: AlertaPymesComponent,
            },
            {
                path: 'ventasOrdenes',
                component: PurchaseStatsComponent,
            },
            {
                path: 'postManager',
                component: PostManagerComponent,
            },
            {
                path: 'categoryControl',
                component: ControlCategoryComponent,
            },
            { path: 'infoPost/:id', component: InfoPostComponent },
            {
                path: '**',
                component: DashboardComponent
            }

        ]
    }

];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );
