import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




import { PipesModule } from 'src/app/pipes/pipes.module';
import { ADMIN_ROUTES } from './admin.routes';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // [RouterModule.forChild(DASHBOARD_ROUTES)]
    ADMIN_ROUTES,
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
export class ADMIN_MODULE { }
