import { Router } from "@angular/router";
import { _SERVICIOS, _EPAYCOSERIAL, _VERIFYEPAYCOURL } from "./../config/config";
import { Injectable } from "@angular/core";

// se importa la clase o el modelo de datos de tipo usuario
// import { UsuarioModel } from './../models/usuario.model';

import { HttpClient } from "@angular/common/http";

// para poder usar el map
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

import { throwError } from "rxjs/internal/observable/throwError";

// import { NotifyService } from "src/app/services/service.index";
import { UsersService } from "./users.service";

import { EventEmitter } from "@angular/core";
import { GlobalConfigService } from "./-global-config.service";

@Injectable({
  providedIn: 'root'
})
export class BoostServiceService {

  constructor(

    public http: HttpClient,
    public router: Router,
    public GlobalConfigService: GlobalConfigService,
    public _userService: UsersService

  ) { }



  getAllBoostGET(paginate){


    let url = `${_SERVICIOS}/boost/all?t=${this._userService.token}&paginate=${paginate}`;
    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }


  getInfoBoostByIdGET(id: string){


    let url = `${_SERVICIOS}/boost/${id}?t=${this._userService.token}`;
    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }



}
