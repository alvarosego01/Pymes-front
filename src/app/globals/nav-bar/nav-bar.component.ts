import { Component, OnInit } from "@angular/core";
import { recursosWeb } from "src/app/config/recursosWeb";
import { LoginComponent } from "src/app/components/login/login.component";

import { UsersService } from "src/app/services/service.index";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.sass"],
})
export class NavBarComponent implements OnInit {
  icono: string = "";

  constructor(
    private recursosWeb: recursosWeb,
    public _usersService: UsersService
  )
  // public loginComponent: LoginComponent
  {
    this.icono = recursosWeb.getIcons("logoWeb");
  }

  ngOnInit(): void {}

  openLogin() {
    this._usersService.loginVisible = !this._usersService.loginVisible;
  }

  ocultarLogin(e: Event) {
    // //console.log(e.target['className']);


      if( e.target['className'] != '' &&
         !e.target['className'].includes("loginController") &&
         !e.target['className'].includes("navButton") &&
         this._usersService.loginVisible == true ){

        this._usersService.loginVisible = false;

         // if(l){
      }





  }

}
