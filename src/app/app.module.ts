import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// rutas
import { APP_ROUTES } from "./app.routes";

// servicios
import {
  // PostsService,
  UsersService,
  SearchService,
  NotifyService,
  PaymentService,
} from "../app/services/service.index";

// componentes
import { AppComponent } from "./app.component";
import {
  HomeComponent,
  NotFoundComponent,
  RegisterComponent,
} from "./pages/pages.index";
import { NavBarComponent, FooterComponent } from "./globals/globals.index";
import { recursosWeb } from "./config/recursosWeb";
// recursosWeb
import { ContactComponent } from "./pages/contact/contact.component";
import { UsComponent } from "./pages/us/us.component";

// click fuera
import { ClickOutsideModule } from "ng-click-outside";

// MODULOS

import { DASHBOARD_MODULE } from "./pages/dashboard/dashboard.module";
import { PipesModule } from "./pipes/pipes.module";
import { PostsService } from "./services/posts.service";
import { ADMIN_MODULE } from "./pages/dashboard/admin/admin.module";
import { NewsletterComponent } from "./globals/newsletter/newsletter.component";
import { ProfileViewComponent } from "./pages/profile-view/profile-view.component";

import { SocialFloatComponent } from "./globals/social-float/social-float.component";

import { StarRatingModule } from "angular-star-rating";

import { PdfViewerModule } from "ng2-pdf-viewer";
import { BreadComponent } from "./globals/bread/bread.component";

import { IMaskModule } from "angular-imask";
import { NotifyPreviewComponent } from "./pages/dashboard/dashboard.pages.index";

// import { SortablejsModule } from 'angular-sortablejs';
import { SortablejsModule } from "ngx-sortablejs";
import { VerifyControlComponent } from "./pages/verify-control/verify-control.component";
import {
  // InfoPostComponent,
  InfoPostComponent,
  SearchComponent,
  LoginComponent,
  NavDashboardComponent,
  PaginatorComponent,
  PdfViewComponent,
  PlanesComponent,
  RecoveryPasswordComponent,
  CategoryListsComponent,
  PostsListsComponent,
} from "./components/components.index";
import { CommonModule } from "@angular/common";
import { GlobalConfigService } from "./services/-global-config.service";
// import { COMPONENTS_MODULE } from './components/components.module';

import { DpDatePickerModule } from "ng2-date-picker";
import { CheckoutResponseComponent } from "./pages/checkout-response/checkout-response.component";
import { GLOBALCOMPONENTS_MODULE } from "./components/components.module";
import { ZonaPymesComponent } from "./pages/zona-pymes/zona-pymes.component";
import { EditUserComponent } from "./pages/dashboard/admin/edit-user/edit-user.component";
// import { GlobalPaginatorComponent } from './components/global-paginator/global-paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotifyPreviewComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    RegisterComponent,
    ContactComponent,
    UsComponent,
    NewsletterComponent,
    ProfileViewComponent,
    BreadComponent,
    SocialFloatComponent,
    VerifyControlComponent,
    EditUserComponent,

    // componentes
    LoginComponent,
    NavDashboardComponent,
    PaginatorComponent,
    PdfViewComponent,
    PlanesComponent,
    RecoveryPasswordComponent,
    CategoryListsComponent,
    PostsListsComponent,
    SearchComponent,
    InfoPostComponent,
    CheckoutResponseComponent,
    ZonaPymesComponent,
    // GlobalPaginatorComponent,
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
    GLOBALCOMPONENTS_MODULE,
    APP_ROUTES,
    // COMPONENTS_MODULE,
    DASHBOARD_MODULE,
    ADMIN_MODULE,
  ],

  providers: [
    PostsService,
    UsersService,
    SearchService,
    recursosWeb,
    GlobalConfigService,
    NotifyService,
    PaymentService,
    Title,
  ],
  bootstrap: [AppComponent],
  exports: [
    // GlobalPaginatorComponent
    // InfoPostComponent
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  // entryComponents: []
})
export class AppModule {
  // platformBrowserDynamic().bootstrapModule(AppModule);
}
