import { Component, OnInit } from "@angular/core";
import { recursosWeb } from "src/app/config/recursosWeb";
import { LoginComponent } from "src/app/components/login/login.component";

import { UsersService, SearchService } from "src/app/services/service.index";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.sass"],
})
export class NavBarComponent implements OnInit {
  icono: string = "";

  constructor(
    private url: LocationStrategy,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private recursosWeb: recursosWeb,
    public _usersService: UsersService,
    public _searchService: SearchService,
    public GlobalConfigService: GlobalConfigService
  )
  // public loginComponent: LoginComponent
  {
    this.icono = recursosWeb.getIcons("logoWeb");

  }

  ngOnInit(): void {}

  openLogin() {
    //////// console.log('open login ');
    this._usersService.loginVisible = !this._usersService.loginVisible;

    this._usersService.recoveryPassword = false;
  }




  ocultarLogin(e: Event) {


    //////// console.log('ocultar login');
      if( e.target['className'] != '' &&
         !e.target['className'].includes("loginController") &&
         !e.target['className'].includes("navButton") &&
         this._usersService.loginVisible == true ){

        this._usersService.loginVisible = false;

         // if(l){
      }





  }


  ocultarRecovery(e: Event){


    this._usersService.loginVisible = true;
    this._usersService.recoveryPassword = false;

  }

}
