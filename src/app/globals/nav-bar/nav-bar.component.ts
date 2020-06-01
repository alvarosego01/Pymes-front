import { Component, OnInit } from "@angular/core";
import { recursosWeb } from "src/app/config/recursosWeb";
import { LoginComponent } from "src/app/components/login/login.component";

import { UsersService, SearchService, _globalConfig } from "src/app/services/service.index";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.sass"],
})
export class NavBarComponent implements OnInit {
  icono: string = "";

  constructor(
    private recursosWeb: recursosWeb,
    public _usersService: UsersService,
    public _searchService: SearchService,
    public _globalConfig: _globalConfig
  )
  // public loginComponent: LoginComponent
  {
    this.icono = recursosWeb.getIcons("logoWeb");
  }

  ngOnInit(): void {}

  openLogin() {
    this._usersService.loginVisible = !this._usersService.loginVisible;
  }


  searchByText(forma: NgForm){

    if(forma.value.Busqueda == null || forma.value.Busqueda == '' ){

        return;
    }

    let l = {
      title: forma.value.Busqueda.toLowerCase(),
      typeFind: 'buscador'
    }

    this._globalConfig.spinner = true;
    this._searchService.searchByTextPOST(l).subscribe((resp) => {
      // //console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // //console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });

        if( resp.data.length > 0  && resp.data[0].length > 0){
          this._searchService.registros = resp.data[0];
          //console.log(this._searchService.registros);
        }else{
          this._searchService.registros = [];
        }
      } else {
        // this._notifyService.Toast.fire({
        // title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        // icon: "error",
        // });
      }

      this._globalConfig.spinner = false;
    });

  }

  ocultarLogin(e: Event) {
    // //////console.log(e.target['className']);


      if( e.target['className'] != '' &&
         !e.target['className'].includes("loginController") &&
         !e.target['className'].includes("navButton") &&
         this._usersService.loginVisible == true ){

        this._usersService.loginVisible = false;

         // if(l){
      }





  }

}
