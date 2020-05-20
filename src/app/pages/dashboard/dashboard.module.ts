import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// pages
import { NotifyControlComponent,
    PostControlComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent } from './dashboard.pages.index';

import { DASHBOARD_ROUTES } from './dashboard.routes';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PostManagerComponent } from './admin/post-manager/post-manager.component';
import { AdminComponent } from './admin/admin.component';
import { ADMIN_MODULE } from './admin/admin.module';




@NgModule({
  declarations: [
    NotifyControlComponent,
    PostControlComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent,
    PostManagerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // [RouterModule.forChild(DASHBOARD_ROUTES)]
    DASHBOARD_ROUTES,
    PipesModule
  ],
  exports: [RouterModule]
  //   providers: [
    // PostsService,
    // UsersService,
    // SearchService,
    // NotifyService,
    // _globalConfig,
//   ]

})
export class DASHBOARD_MODULE { }
