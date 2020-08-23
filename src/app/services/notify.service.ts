import { Router } from "@angular/router";
import { _SERVICIOS } from "./../config/config";
import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

// para poder usar el map
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

import { throwError } from "rxjs/internal/observable/throwError";

import { _NotifyModel } from "../models/models.index";

import swal from "sweetalert2";
import { UsersService } from './users.service';

@Injectable({
  providedIn: "root",
})
export class NotifyService {
  // icons
  // success
  // error
  // warning
  // info
  // question
  swalNormal = swal;
  Toast = swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    },
  });


  notificaciones: any = [];


  constructor(
    public http: HttpClient,
    public _userService: UsersService
    ) {}

  sendNotifyEmailPOST(data: _NotifyModel, token: string = null) {
    // return;
    let url = _SERVICIOS + "/notify";
    url = (token != null)? `${url}?t=${token}`: url;


    //console.log('correo que se envia', data);

    return this.http.post(url, data).pipe(
      map((resp: any) => {


        return resp;
      }),
      catchError((err) => {

        return throwError(err);
      })
    );
  }



  welcomeMessage(title, message){

  }




  getNotifyByUserGET(id){


    let url = `${_SERVICIOS}/notify/${id}?t=${this._userService.token}`;

    //console.log('envia notif', url);
    return this.http.get(url).pipe(
        map((resp: any) => {

          //console.log(this.notificaciones);

        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }

  getAllNotifyByUserGET(id){


    let url = `${_SERVICIOS}/notify?t=${this._userService.token}`;

    console.log('envia notif', url);
    return this.http.get(url).pipe(
        map((resp: any) => {

          //console.log(this.notificaciones);

        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }

  deleteNotificactionDELETE(id){

    let url = `${_SERVICIOS}/notify/${id}?t=${this._userService.token}`;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
      );
  }





}
