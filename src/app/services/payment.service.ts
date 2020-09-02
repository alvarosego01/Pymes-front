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
import { VerifyService } from "./verify.service";
import { GlobalConfigService } from "./-global-config.service";

declare var ePayco;
@Injectable({
  providedIn: "root",
})
export class PaymentService {

  process: any = null;

  handler = ePayco.checkout.configure({
    key: _EPAYCOSERIAL,

    test: true,
  });

  constructor(
    public http: HttpClient,
    public router: Router,
    public GlobalConfigService: GlobalConfigService,
    public _userService: UsersService
  ) {
  }


  getFacturaByIdGET(id: string) {
    let url = `${_SERVICIOS}/billing/${id}?t=${this._userService.token}`;
    //console.log("el url", url);
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  open(data) {
    this.handler.open(data);
  }



  paymentVerifyGET(ref){

  let url = `${_VERIFYEPAYCOURL}/${ref}`;

  return this.http.get(url).pipe(
      map((resp: any) => {
      return resp;
  }),
  catchError((err) => {
      return throwError(err);
  })
  );

  }


  confirmBillPUT(data: any){

    let url = `${_SERVICIOS}/paymentConfirmation`;
    return this.http.put(url, data).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );


  }


  getAllBills(paginate){

    let url = `${_SERVICIOS}/billing/all?t=${this._userService.token}&paginate=${paginate}`;
    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }
  getBillsByUserGET(paginate){

    let url = `${_SERVICIOS}/billing/byUser?t=${this._userService.token}&paginate=${paginate}`;
    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }

  getBillsByPostGET(paginate, postId){

    let url = `${_SERVICIOS}/billing/byPost/${this._userService.usuario._id}/${postId}?t=${this._userService.token}&paginate=${paginate}`;

    //console.log('envio datos', url);
    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }





 getStatusEpayco(status) {

    switch (status) {

            case 'Aceptada':

            return 1;

            break;

            case 'Rechazada':

            return 3;

            break;

            case 'Pendiente':

            return 2;

            break;

            case 'Fallida':

            return 3;

            break;

            case 'Reversada':

            return 3;

            break;

            case 'Retenida':

            return 2;

            break;

            case 'Iniciada':

            return 2;

            break;

            case 'Expirada':

            return 3;

            break;

            case 'Abandonada':

            return 3;

            break;

            case 'Cancelada':

            return 3;

            break;

            case 'Antifraude':

            return 3;

            break;


        default:
            break;
    }


}


}
