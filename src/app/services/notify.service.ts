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

  constructor(public http: HttpClient) {}

  sendNotifyEmailPOST(data: _NotifyModel) {
    return;
    let url = _SERVICIOS + "/notify";
    ////////console.log(data, "llega data notif");
    return this.http.post(url, data).pipe(
      map((resp: any) => {
        ////////console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return true;
      }),
      catchError((err) => {
        ////////console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
