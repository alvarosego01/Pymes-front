import { Router, ActivatedRoute } from "@angular/router";
import { _SERVICIOS } from "./../config/config";
import { Injectable } from "@angular/core";

// se importa la clase o el modelo de datos de tipo usuario
// import { UsuarioModel } from './../models/usuario.model';

import { HttpClient, HttpParams } from "@angular/common/http";

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
import { GlobalConfigService } from './-global-config.service';
// import { VerifyService } from './verify.service';



// import {HttpParams} from  "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class SearchService {


  homeTitleResults: string = 'Destacados';

  catState = {
    base: null,
    child: null
  }


  registros: any = [];

  paginator: any = [];

  publications: any = [];

  constructor(
    public http: HttpClient,
    // public HttpParams: HttpParams,
    public router: Router,
    // public router: Router,
    public activatedRoute: ActivatedRoute,
    public _userService: UsersService,
    private GlobalConfig: GlobalConfigService
  ) { }


  // pagina: string;
  // porPagina: string;
  // params: any = {}


    setParameters(params = null, pagina = 0){

      if( params == null && pagina == 0 ){
        this.router.navigate([], {

          queryParams: {


          }
        });
      }


      if( (params != null) || params.busqueda != 'todo'){
        this.homeTitleResults = 'Resultados';
      }
      if( (params == null) || params.busqueda == 'todo'){

        this.router.navigate([], {

          queryParams: {
            busqueda: 'todo',
            pagina: pagina,


          }
        });

      }
      if( params.busqueda == 'buscador'){

        this.router.navigate([], {

          queryParams: {
            busqueda: 'buscador',
            pagina: pagina,


          }
        });

      }

      if(params.busqueda == 'categoria' && params.subCategoria == null){

        this.router.navigate([], {

          queryParams: {
            busqueda: 'categoria',
            categoria: params.categoria,
            pagina: pagina,


          }
        });

      }

      if(params.busqueda == 'catSub' && params.subCategoria != null){

        this.router.navigate([], {

          queryParams: {
            busqueda: 'catSub',
            categoria: params.categoria,
            subCategoria: params.subCategoria,
            pagina: pagina,


          }
        });

      }

      if(params.busqueda == 'price'){

        this.router.navigate([], {

          queryParams: {
            busqueda: 'price',
            pagina: pagina,


          }
        });

      }

      if(params.busqueda == 'order'){

        this.router.navigate([], {

          queryParams: {
            busqueda: 'order',
            pagina: pagina,


          }
        });

      }

      // si es flexible entonces
      if( (params.busqueda == 'flexible') && params.length > 0){



      }


    }

  searchByOrderPOST(argumento){

    let url = `${_SERVICIOS}/find/orderBy`;
    // /orderBy/:p/:t
    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        return resp;
      }),
      catchError( err =>{
        ////////// console.log(err);

        return throwError(err);
      })
      );

  }




setActualReactions() {

    ////// console.log('actualizacio');
    if(this.registros.length > 0){

      this.registros.forEach((relement, index) => {

      // ////// console.log(relement.reactions.length);
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

  ////// console.log('con reaction', this.registros);

}







  setFirstLookPOST(){

    let url = `${_SERVICIOS}/find`;


      let agumento = {
        typeFind: 'all',
        movil: this.GlobalConfig.isMobile()
      }

      return this.http.post( url, agumento ).pipe(
        map( (resp: any) => {

          return resp;
        }),
        catchError( err =>{
          ////////// console.log(err);

          return throwError(err);
        })
        );

  }



  searchByTextPOST(argumento){

    let url = `${_SERVICIOS}/find`;


    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        return resp;
      }),
      catchError( err =>{
        ////////// console.log(err);

        return throwError(err);
      })
      );



  }



  searchByCategoryPOST(argumento: any){

    ////// console.log(argumento);
    let url = `${_SERVICIOS}/find`;


    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        return resp;
      }),
      catchError( err =>{
        ////////// console.log(err);

        return throwError(err);
      })
      );


  }

  searchByPricePOST(argumento){


    ////// console.log(argumento);
    let url = `${_SERVICIOS}/find`;


    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        // ////// console.log('respuesta', resp);
        return resp;
      }),
      catchError( err =>{
        // ////// console.log(err , 'error desde servicio');

        return throwError(err);
      })
      );


  }

  recallPaginatePOST(argumento: any){

    let url = `${_SERVICIOS}/find`;


    return this.http.post( url, argumento ).pipe(
      map( (resp: any) => {

        // ////// console.log('respuesta', resp);
        return resp;
      }),
      catchError( err =>{
        // ////// console.log(err , 'error desde servicio');

        return throwError(err);
      })
      );



  }




  getParameters(){

  return new Promise((resolve,reject) => {

    this.activatedRoute.queryParams.subscribe(params => {

        resolve(params);

      });

    })
  }

  changePaginator(data: any){


    console.log('coño es movil? ',this.GlobalConfig.isMobile());

    if(Object.keys(data.params).length == 0 || data.params.busqueda == 'todo'){

      let argumento = {
        movil: this.GlobalConfig.isMobile(),
        typeFind: 'all',
        oldPaginate: this.paginator,
        changePaginator: data.change
      }

      return argumento;

    }

    if(Object.keys(data.params).length > 0){

      if(data.params.busqueda == 'buscador'){

        let argumento = {
          // categoryp: data.params.categoria,
          // child: null,
          movil: this.GlobalConfig.isMobile(),
          typeFind: 'buscador',
          title: data.title,
          oldPaginate: this.paginator,
          changePaginator: data.change
        }
        return argumento;
      }

      if(data.params.busqueda == 'categoria' && data.params.subCategoria == null){

        let argumento = {
          categoryp: data.params.categoria,
          child: null,
          movil: this.GlobalConfig.isMobile(),
          typeFind: 'category',
          oldPaginate: this.paginator,
          changePaginator: data.change
        }
        return argumento;
      }

      if(data.params.busqueda == 'catSub' && data.params.subCategoria != null){
        let argumento = {
          categoryp: data.params.categoria,
          child: (data.params.subCategoria != null && data.params.subCategoria != '')? data.params.subCategoria : null,
          movil: this.GlobalConfig.isMobile(),
          typeFind: 'category',
          oldPaginate: this.paginator,
          changePaginator: data.change
        }


        return argumento;
      }

    }

  }


  clearParams(){


  }

}
