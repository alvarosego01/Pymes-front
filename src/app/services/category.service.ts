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

// import { NotifyService } from "src/app/services/service.index";
import { _PostModel } from "../models/postModel";
import { UsersService } from "./users.service";

import { EventEmitter } from "@angular/core";
import { VerifyService } from './verify.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  allCategoryList: any = [];

  constructor(
    public _userService: UsersService,
    public http:HttpClient
  ) { }



  newCategoryPOST(data: any){

    if(data.type == 'New'){


      let url = `${_SERVICIOS}/category/?t=${this._userService.token}`;
      // ////////////console.log('url', url);
    // una vez logeado hace falta grabar la sesión en el local storage designado.
    return this.http.post(url ,data).pipe(
      map((resp: any) => {
        // //////////// //////////////console.log('respuesta', resp);

        return resp;
      }),
      catchError((err) => {
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }else{


    let url = `${_SERVICIOS}/category/subcategoria/${data.type}?t=${this._userService.token}`;
    ////////////console.log('url', url);
  // una vez logeado hace falta grabar la sesión en el local storage designado.
  return this.http.post(url ,data).pipe(
    map((resp: any) => {
      // //////////// //////////////console.log('respuesta', resp);

      return resp;
    }),
    catchError((err) => {
      // swal( 'Error en al registrar', err.error.mensaje, 'error');
      return throwError(err);
    })
  );


  }

  }


  getCategoryGET(){

    let url = `${_SERVICIOS}/category/`;

  return this.http.get(url).pipe(
    map((resp: any) => {
      // //////////// //////////////console.log('respuesta', resp);

      return resp;
    }),
    catchError((err) => {
      // swal( 'Error en al registrar', err.error.mensaje, 'error');
      return throwError(err);
    })
  );


  }


  editCategoryPUT(data: any){



    if(data.type == 'principal'){

      var l = {
        name: data.change
      }

      let url = `${_SERVICIOS}/category/principal/${data._id}?t=${this._userService.token}`;
    // ////////////console.log('url', url);
  // una vez logeado hace falta grabar la sesión en el local storage designado.
  return this.http.put(url, l).pipe(
    map((resp: any) => {
      // //////////// //////////////console.log('respuesta', resp);

      return resp;
    }),
    catchError((err) => {
      // swal( 'Error en al registrar', err.error.mensaje, 'error');
      return throwError(err);
    })
    );

  }else if(data.type == 'child'){

//
    // _id
// idx
// type
// change

    var l ={
      name: data.change
    }

    let url = `${_SERVICIOS}/category/subcategoria/${data._id}/${data.idx}?t=${this._userService.token}`;
    // ////////////console.log('url', url);
  // una vez logeado hace falta grabar la sesión en el local storage designado.
  return this.http.put(url, l).pipe(
    map((resp: any) => {
      // //////////// //////////////console.log('respuesta', resp);

      return resp;
    }),
    catchError((err) => {
      // swal( 'Error en al registrar', err.error.mensaje, 'error');
      return throwError(err);
    })
    );

  }

  }




  getCategoryId(id: string, type: string){



  }


}
