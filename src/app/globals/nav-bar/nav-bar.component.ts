import { Component, OnInit } from "@angular/core";
import { recursosWeb } from "src/app/config/recursosWeb";
import { LoginComponent } from "src/app/components/login/login.component";

import { UsersService, SearchService, GlobalConfigService } from "src/app/services/service.index";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';

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
    public GlobalConfigService: GlobalConfigService,
  )
  // public loginComponent: LoginComponent
  {
    this.icono = recursosWeb.getIcons("logoWeb");

  }

  ngOnInit(): void {}

  openLogin() {
    this._usersService.loginVisible = !this._usersService.loginVisible;
     // Do comparision here.....
        ///////////////////////////
        // // console.log(this.router.url);
  }




  ocultarLogin(e: Event) {
    // ////////// console.log(e.target['className']);


      if( e.target['className'] != '' &&
         !e.target['className'].includes("loginController") &&
         !e.target['className'].includes("navButton") &&
         this._usersService.loginVisible == true ){

        this._usersService.loginVisible = false;

         // if(l){
      }





  }

}
