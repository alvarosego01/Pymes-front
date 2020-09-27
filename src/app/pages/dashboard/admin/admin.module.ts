import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { PipesModule } from "src/app/pipes/pipes.module";
import { ADMIN_ROUTES } from "./admin.routes";
import { ControlCategoryComponent } from "./control-category/control-category.component";
import { UserControlComponent } from "./user-control/user-control.component";
import { PautaControlComponent } from "./pauta-control/pauta-control.component";
import { BoostOrdersComponent } from "./boost-orders/boost-orders.component";
import { PurchaseStatsComponent } from "./purchase-stats/purchase-stats.component";
import { GLOBALCOMPONENTS_MODULE } from "src/app/components/components.module";
import { AlertaPymesComponent } from './alerta-pymes/alerta-pymes.component';

@NgModule({
  declarations: [
    ControlCategoryComponent,

    UserControlComponent,

    PautaControlComponent,

    BoostOrdersComponent,

    PurchaseStatsComponent,

    AlertaPymesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // [RouterModule.forChild(DASHBOARD_ROUTES)]
    GLOBALCOMPONENTS_MODULE,
    ADMIN_ROUTES,
    PipesModule,
  ],
  exports: [RouterModule],
  //   providers: [
  // PostsService,
  // UsersService,
  // SearchService,
  // NotifyService,
  //
  //   ]
})
export class ADMIN_MODULE {}
