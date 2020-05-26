import { Router } from "@angular/router";
import { _SERVICIOS } from "./../config/config";
import { Injectable } from "@angular/core";

// se importa la clase o el modelo de datos de tipo usuario
// import { UsuarioModel } from './../models/usuario.model';

import { HttpClient } from "@angular/common/http";

// para poder usar el map
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

import { throwError } from "rxjs/internal/observable/throwError";
import {
  _UserModelNatural,
  _UserModelCompany,
  _NotifyModel,
} from "../models/models.index";
// import { NotifyService } from "src/app/services/service.index";
import { _PostModel } from "../models/postModel";
import { UsersService } from "./users.service";

import { EventEmitter } from "@angular/core";
import { NgForm } from '@angular/forms';
// import { VerifyService } from './verify.service';




@Injectable({
  providedIn: 'root'
})
export class SearchService {


  publications: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userService: UsersService
  ) { }


  setFirstLook(){

    let url = `${_SERVICIOS}/find`;
    if(this._userService.estaLogueado() == true){

    let argumento = {
      // status: false,
      city: this._userService.usuario.city,
      department: this._userService.usuario.department
    }

      return this.http.get( url ).pipe(
        map( (resp: any) => {

          return resp;
        }),
        catchError( err =>{
          ////console.log(err);

          return throwError(err);
        })
        );
    }
  }



  sendSearchByUbicacion(forma: NgForm){

  }

  searchByCategory(argumento: string){

  }

  searchByPrice(type){

  }

}
