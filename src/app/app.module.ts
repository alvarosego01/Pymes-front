import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// rutas
import { APP_ROUTES } from './app.routes';

// servicios
import {
  // PostsService,
         UsersService,
         SearchService,
         NotifyService,
         _globalConfig} from '../app/services/service.index';

// componentes
import { AppComponent } from './app.component';
import { HomeComponent, NotFoundComponent, RegisterComponent } from './pages/pages.index';
import { SearchComponent, PostsListsComponent, InfoPostComponent, CategoryListsComponent } from './components/components.index';
import { NavBarComponent, FooterComponent } from './globals/globals.index';
import { recursosWeb } from './config/recursosWeb';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { UsComponent } from './pages/us/us.component';
import { NavDashboardComponent } from './components/nav-dashboard/nav-dashboard.component';

// click fuera
import { ClickOutsideModule } from 'ng-click-outside';

// MODULOS

import { DASHBOARD_MODULE } from './pages/dashboard/dashboard.module';
import { PipesModule } from './pipes/pipes.module';
import { PostsService } from './services/posts.service';
<<<<<<< HEAD
import { ADMIN_MODULE } from './pages/dashboard/admin/admin.module';
import { NewsletterComponent } from './globals/newsletter/newsletter.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';


=======
import { SocialFloatComponent } from './globals/social-float/social-float.component';
>>>>>>> production




import { StarRatingModule } from 'angular-star-rating';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { BreadComponent } from './globals/bread/bread.component';

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    SearchComponent,
    PostsListsComponent,
    InfoPostComponent,
    CategoryListsComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    RegisterComponent,
    ContactComponent,
    LoginComponent,
    UsComponent,
    NavDashboardComponent,
    SocialFloatComponent,
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    HttpClientModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    DASHBOARD_MODULE,
    ADMIN_MODULE,
    PipesModule,
    StarRatingModule.forRoot(),
    PdfViewerModule
  ],
  providers: [
    PostsService,
    UsersService,
    SearchService,
    recursosWeb,
    _globalConfig,
    NotifyService
  ],
  bootstrap: [AppComponent],

})


export class AppModule {

  // platformBrowserDynamic().bootstrapModule(AppModule);
 }


