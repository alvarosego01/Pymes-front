import { BrowserModule, Title } from '@angular/platform-browser';
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
         GlobalConfigService} from '../app/services/service.index';

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
import { ADMIN_MODULE } from './pages/dashboard/admin/admin.module';
import { NewsletterComponent } from './globals/newsletter/newsletter.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';


import { SocialFloatComponent } from './globals/social-float/social-float.component';



import { StarRatingModule } from 'angular-star-rating';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { BreadComponent } from './globals/bread/bread.component';

import {IMaskModule} from 'angular-imask';
import { PlanesComponent } from './components/planes/planes.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PostEditionComponent } from './pages/dashboard/dashboard.pages.index';


// import { SortablejsModule } from 'angular-sortablejs';
import { SortablejsModule } from 'ngx-sortablejs';


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
    NewsletterComponent,
    ProfileViewComponent,
    PdfViewComponent,
    PostEditionComponent,
    BreadComponent,
    SocialFloatComponent,
    PlanesComponent,
    PaginatorComponent,
    LoadingComponent


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
    PdfViewerModule,
    IMaskModule,
    SortablejsModule.forRoot({
      animation: 150,
      swapThreshold: 1
    })
  ],
  providers: [
    PostsService,
    UsersService,
    SearchService,
    recursosWeb,
    GlobalConfigService,
    NotifyService,
    Title
  ],
  bootstrap: [AppComponent],

})


export class AppModule {

  // platformBrowserDynamic().bootstrapModule(AppModule);
 }


