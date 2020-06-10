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
import { EditPostComponent } from './edit-post/edit-post.component';



import {IMaskModule} from 'angular-imask';


@NgModule({
  declarations: [
    NotifyControlComponent,
    PostControlComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent,
    PostManagerComponent,
    AdminComponent,
    EditPostComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // [RouterModule.forChild(DASHBOARD_ROUTES)]
    DASHBOARD_ROUTES,
    PipesModule,
    IMaskModule
  ],
  exports: [RouterModule]
  //   providers: [
    // PostsService,
    // UsersService,
    // SearchService,
    // NotifyService,
    // GlobalConfigService,
//   ]

})
export class DASHBOARD_MODULE { }
