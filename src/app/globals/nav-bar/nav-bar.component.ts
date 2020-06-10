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
        // console.log(this.router.url);
  }


  searchByText(forma: NgForm){

    if(forma.value.Busqueda == null || forma.value.Busqueda == '' ){

        return;
    }

    let l = {
      title: forma.value.Busqueda.toLowerCase(),
      typeFind: 'buscador'
    }



    this.GlobalConfigService.spinner = true;
    this._searchService.searchByTextPOST(l).subscribe((resp) => {
      // ////console.log(resp);




      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // ////console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });


        if( resp.data.length > 0  && resp.data[0].length > 0 ){

          this._searchService.registros = resp.data[0];

          ////console.log(this._searchService.registros);
        }else{
          this._searchService.registros = [];
        }

        // if(!this.url.path().includes("/home") || (this.url.path().length == 1) ){
        //   this.router.navigate(["/home"]);
        // }


      } else {
        // this._notifyService.Toast.fire({
        // title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        // icon: "error",
        // });
      }

      this.GlobalConfigService.spinner = false;
    });

  }

  ocultarLogin(e: Event) {
    // ////////console.log(e.target['className']);


      if( e.target['className'] != '' &&
         !e.target['className'].includes("loginController") &&
         !e.target['className'].includes("navButton") &&
         this._usersService.loginVisible == true ){

        this._usersService.loginVisible = false;

         // if(l){
      }





  }

}
