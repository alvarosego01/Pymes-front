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

  registros: any = [];
  publications: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userService: UsersService
  ) { }


  searchByOrderPOST(argumento){

    let url = `${_SERVICIOS}/find/orderBy`;
    // /orderBy/:p/:t
    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        return resp;
      }),
      catchError( err =>{
        //////console.log(err);

        return throwError(err);
      })
      );

  }



setActualReactions() {

    //console.log('actualizacio');



    if(this.registros.length > 0){

      this.registros.forEach((relement, index) => {

      // //console.log(relement.reactions.length);
      // return;

      this.registros[index].like = 0;
      this.registros[index].dislike = 0;
      this.registros[index].myReaction = null;

      if(relement.reactions.length > 0){
        relement.reactions.forEach((element) => {
          if (element.reaction === "like") {
            this.registros[index].like++;
          }
          if (element.reaction === "dislike") {
            this.registros[index].dislike++;
          }

          if ( (this._userService.estaLogueado() == true) &&  element.idUser === this._userService.usuario._id) {
            this.registros[index].myReaction = element.reaction;
          }
        });

      }
    });
  }
  // this.registros = r;

  //console.log('con reaction', this.registros);

}







  setFirstLookPOST(){

    let url = `${_SERVICIOS}/find`;
    if(this._userService.estaLogueado() == true){

    let argumento = {
      status: false,
      city: this._userService.usuario.city,
      department: this._userService.usuario.department,
      typeFind: 'first'
    }

    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        return resp;
      }),
      catchError( err =>{
        //////console.log(err);

        return throwError(err);
      })
      );


    }else{

      let agumento = {
        typeFind: 'all'
      }

      return this.http.post( url, agumento ).pipe(
        map( (resp: any) => {

          return resp;
        }),
        catchError( err =>{
          //////console.log(err);

          return throwError(err);
        })
        );
    }
  }



  searchByTextPOST(argumento){

    let url = `${_SERVICIOS}/find`;


    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        return resp;
      }),
      catchError( err =>{
        //////console.log(err);

        return throwError(err);
      })
      );



  }

  sendSearchByUbicacionPOST(forma: NgForm){

  }

  searchByCategoryPOST(argumento: any){

    //console.log(argumento);
    let url = `${_SERVICIOS}/find`;


    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        return resp;
      }),
      catchError( err =>{
        //////console.log(err);

        return throwError(err);
      })
      );


  }

  searchByPricePOST(argumento){


    //console.log(argumento);
    let url = `${_SERVICIOS}/find`;


    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        // //console.log('respuesta', resp);
        return resp;
      }),
      catchError( err =>{
        // //console.log(err , 'error desde servicio');

        return throwError(err);
      })
      );


  }

}
