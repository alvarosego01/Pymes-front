import { Router } from "@angular/router";
import { _SERVICIOS } from "./../config/config";
import { Injectable } from "@angular/core";

// se importa la clase o el modelo de datos de tipo usuario
// import { UsuarioModel } from './../models/usuario.model';

import { HttpClient, HttpHeaders } from "@angular/common/http";

// para poder usar el map
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

import { throwError } from "rxjs/internal/observable/throwError";
import {
  _UserModelNatural,
  _UserModelCompany,
  _NotifyModel,
} from "../models/models.index";

import { NotifyService } from "./notify.service";
import { RoleTransformPipe } from "../pipes/role-transform.pipe";
// import { GlobalConfigService } from './service.index';

@Injectable({
  providedIn: "root",
})
export class UsersService {
  loginVisible: Boolean = false;
  recoveryPassword: Boolean = false;
  loginMobileVisible: Boolean = false;

  usuario: any;
  roleName: string;
  token: string;

  captcha: number[] = [0, 0, 0];

  constructor(
    public http: HttpClient,
    public router: Router
  ) // private _notifyService: NotifyService,
  // // public GlobalConfigService: GlobalConfigService
  {
    // se llama al cargar storage siemp que se inicialize el servicio para que tengan datos manejables.
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token && this.token.length > 5 ? true : false;
  }

  setNewVisitPUT(id) {
    // /post/view/5ed1087cd1baa3076cf32edd
    let url = `${_SERVICIOS}/user/view/`;

    ////// ////////////console.log('url', url);
    // ////// ////////////console.log('lo que se manda', dataCompany);

    let l = {
      id: id,
    };
    return this.http.put(url, l).pipe(
      map((resp: any) => {
        //////////// ////////////console.log("respuesta", resp);
        // alert("Usuario registrado");
        // swal('Perro registrado', '' , 'success');
        let n = new _NotifyModel(
          "nAccountCreatedNoVerify",
          null,
          resp.data._id
        );

        return resp;
      }),
      catchError((err) => {
        // ////// ////////////console.log('error visita', err);
        return throwError(err);
      })
    );
  }

  getAllUsers() {
    let url = `${_SERVICIOS}/user`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getUserProfileGET(idUser) {
    let url = `${_SERVICIOS}/user/profile/${idUser}`;
    //////////// ////////////console.log(data, "llega data notif");
    return this.http.get(url).pipe(
      map((resp: any) => {
        //////////// ////////////console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// ////////////console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  login(usuario: _UserModelNatural) {
    let url = `${_SERVICIOS}/login`;

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.message.id_user, resp.message.t, resp.data);

        this.loginVisible = false;

        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  /* -------------------------------------
      <- Cargar storage ->
      Descripción: Con esta funcion nos aseguramos
      de que las variables token y usuario siempre tengan
      un valor valido o nulo que mostrar
    --------------------------------------- */
  cargarStorage() {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("user"));

      switch (this.usuario.role) {
        case "CLIENTE_ROLE":
          this.roleName = "Persona natural";
          break;
        case "EMPRESA_ROLE":
          this.roleName = "Empresa";
          break;
        case "ADMIN_ROLE":
          this.roleName = "Administrador";
          break;

        default:
          // code...
          break;
      }
    } else {
      this.token = null;
      this.usuario = null;
    }

    // //////////// ////////////console.log('cargar storage token: ', this.token);
  }

  setCaptcha() {
    let var1: number = Math.floor(Math.random() * 10);
    let var2: number = Math.floor(Math.random() * 10);

    this.captcha[0] = var1;
    this.captcha[1] = var2;
    this.captcha[2] = var1 + var2;

    // //////////// ////////////console.log(this.captcha);
  }

  registroUsuarioPOST(
    usuarioNatural: _UserModelNatural = null,
    usuarioCompany: _UserModelCompany = null,
    type
  ) {
    let url = _SERVICIOS + "/user";

    let usuario: any;
    if (type == "natural") {
      usuario = usuarioNatural;
    }
    if (type == "company") {
      usuario = usuarioCompany;
    }

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  /* -------------------------------------
      <- Guardar en Storage ->
      Descripción: Con esta funcion se almacenan
      el id, el usuario, el token en el localstorage
      para manejarse de manera dinamica sin importar
      que se elimine el navegador
    --------------------------------------- */
  guardarStorage(id: string, token: string, usuario: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    // se almacena el usuario pero hay que tener cuidado por que la respuesta que se retorna es un objeto.. para esto se transforma en un string por que localstorage solo almacena strings
    localStorage.setItem("user", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

    this.roleName = new RoleTransformPipe().transform(this.usuario.role);
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    // una vez al deslogear se pasa al login

    this.router.navigate(["/"]);
  }

  changeFileUser(archivo: File, tipo: string, file: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let token = this.token;

      formData.append("imagen", archivo, archivo.name);
      ////// ////////////console.log('envia tio', file);
      formData.append("type", file);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      let url = _SERVICIOS + "/upload/" + tipo + "/" + id + "?t=" + token;

      //////////// ////////////console.log('la url', url);
      //////////// ////////////console.log('formada', formData);

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }

  updateCompanyDataPUT(dataCompany: _UserModelCompany) {
    let url = `${_SERVICIOS}/user/${this.usuario._id}/?t=${this.token}`;

    return this.http.put(url, dataCompany).pipe(
      map((resp: any) => {
        //////////// ////////////console.log("respuesta", resp);
        // alert("Usuario registrado");
        // swal('Perro registrado', '' , 'success');
        let n = new _NotifyModel(
          "nAccountCreatedNoVerify",
          null,
          resp.data._id
        );
        // this._notifyService.sendNotifyEmailPOST(n).subscribe((resp) => {

        this.guardarStorage(this.usuario._id, this.token, resp["data"]);
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updateUserPUT(
    usuarioNatural: _UserModelNatural = null,
    usuarioCompany: _UserModelCompany = null,
    type
  ) {
    let url = `${_SERVICIOS}/user/${this.usuario._id}/?t=${this.token}`;

    let usuario: any;
    if (type == "natural") {
      usuario = usuarioNatural;
    }
    if (type == "company") {
      usuario = usuarioCompany;
    }

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {

        let n = new _NotifyModel(
          "nAccountCreatedNoVerify",
          null,
          resp.data._id
        );

        this.guardarStorage(this.usuario._id, this.token, resp["data"]);
      }),
      catchError((err) => {
        ////// ////////////console.log( 'el error', err);

        return throwError(err);
      })
    );
  }

  getLocation() {
    // this.GlobalConfigService.spinner = true;
    if ("geolocation" in navigator) {


      var x = new Promise((resolve, reject) => {
        // ////////// ////////////console.log('entra al geo');
        setTimeout(function () {
          reject("timeout");
        }, 10000);

        navigator.geolocation.getCurrentPosition((position) => {
          ////// ////////////console.log('entra');
          var l = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            mapUrl: `https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&hl=es;z=14&output=embed`,
          };
          // ////////// ////////////console.log(position.coords.latitude, position.coords.longitude);

          resolve(l);
        });
      });

      return x;
    } else {
    }
  }

  promiseTimeout(ms, promise) {
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        reject("Timed out in " + ms + "ms.");
      }, ms);
    });

    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
  }

  changePasswordPUT(data, token = null) {

    let url = `${_SERVICIOS}/user/changePassword`;
    url = token != null ? `${url}?t=${token}` : url;

    //console.log('la url', url);
    //console.log('la data', data);
    return this.http.put(url, data).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );

  }

  changeEmailPUT(token) {

    let url = `${_SERVICIOS}/user/changeEmail?t=${token}`;
    // url = token != null ? `${_SERVICIOS}?t=${token}` : url;

    //console.log('la url', url);
    // //console.log('la data', data);

    return this.http.put(url, null).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );

  }

}
