import { RouterModule, Routes } from "@angular/router";
import {
  DashboardComponent,
  ProfileComponent,
  PostControlComponent,
  HomeComponent,
  BillingPurchaseComponent,
  InfoBoostComponent,
  HistorialBillingPublicationComponent,
  HistorialPublicationsComponent,
  GeneralBalanceComponent,
} from "./dashboard.pages.index";
import { LoginVerifyGuard } from "src/app/services/guards/login-verify.guard";
import { AdminVerifyGuard } from "src/app/services/guards/guards.index";
import { NotifyViewComponent } from "./notify-control/notify-view.component";
import { NotifyControlComponent } from "./notify-control/notify-control.component";
import { PaymentComponent } from "./payment/payment.component";

const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LoginVerifyGuard],
    canActivateChild: [LoginVerifyGuard],
    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "billing",
        component: BillingPurchaseComponent,
      },
      {
        path: "generalBalance",
        component: GeneralBalanceComponent,
      },
      {
        path: "historialPost",
        component: HistorialPublicationsComponent,
      },
      {
        path: "historialBillingPost/:id",
        component: HistorialBillingPublicationComponent,
      },
      {
        path: "infoPauta/:id",
        component: InfoBoostComponent,
      },
      {
        path: "paymentProcess/:id",
        component: PaymentComponent,
      },
      {
        path: "postControl",
        component: PostControlComponent,
      },
      {
        path: "notify",
        component: NotifyControlComponent,
      },
      {
        path: "notify/message/:id",
        component: NotifyViewComponent,
      },

      {
        path: "**",
        component: PostControlComponent,
      },
    ],
  },
];

export const DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);
