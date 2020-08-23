import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// pages
import { NotifyControlComponent,
    PostControlComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    PostEditionComponent,
    PublicationPreviewComponent,
  } from './dashboard.pages.index';

import { DASHBOARD_ROUTES } from './dashboard.routes';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PostManagerComponent } from './admin/post-manager/post-manager.component';
import { AdminComponent } from './admin/admin.component';


import {IMaskModule} from 'angular-imask';
import { NotifyViewComponent } from './notify-control/notify-view.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'ngx-sortablejs';
import { AppModule } from 'src/app/app.module';
import { StarRatingModule } from 'angular-star-rating';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PaymentComponent } from './payment/payment.component';
import { PlanPautaComponent } from './plan-pauta/plan-pauta.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { BillingPurchaseComponent } from './billing-purchase/billing-purchase.component';
import { InfoBoostComponent } from './info-boost/info-boost.component';
import { HistorialPublicationsComponent } from './historial-publications/historial-publications.component';
import { HistorialBillingPublicationComponent } from './historial-billing-publication/historial-billing-publication.component';
import { GeneralBalanceComponent } from './general-balance/general-balance.component';
import { GlobalPaginatorComponent } from 'src/app/components/global-paginator/global-paginator.component';
// import { COMPONENTS_MODULE } from 'src/app/components/components.module';



@NgModule({
  declarations: [

    PublicationPreviewComponent,
    NotifyControlComponent,
    PostControlComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent,
    PostManagerComponent,
    AdminComponent,
    NotifyViewComponent,
    PostEditionComponent,
    PaymentComponent,
    PlanPautaComponent,
    BillingPurchaseComponent,
    InfoBoostComponent,
    HistorialPublicationsComponent,
    HistorialBillingPublicationComponent,
    GeneralBalanceComponent,
    GlobalPaginatorComponent


  ],
  imports: [
    CommonModule,
    BrowserModule,
    ClickOutsideModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    StarRatingModule.forRoot(),
    PdfViewerModule,
    IMaskModule,
    SortablejsModule.forRoot({
      animation: 150,
      swapThreshold: 1,
    }),
    DpDatePickerModule,
    DASHBOARD_ROUTES,
    // COMPONENTS_MODULE
    // AppModule
    // InfoPostComponent
    // PublicationPreviewComponent
  ],
  exports: [
    // RouterModule
    // GlobalPaginatorComponent,
    PostEditionComponent
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]



})
export class DASHBOARD_MODULE { }
