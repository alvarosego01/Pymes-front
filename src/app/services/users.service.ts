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
  _NotifyModel
} from "../models/models.index";


import { NotifyService } from "./notify.service";
// import { _globalConfig } from './service.index';

@Injectable({
  providedIn: "root",
})
export class UsersService {

  loginVisible: Boolean = false;
  loginMobileVisible: Boolean = false;

  usuario: any;
  roleName: string;
  token: string;

  captcha: number[] = [0, 0, 0];


  constructor(
    public http: HttpClient,
    public router: Router,
    public _notifyService: NotifyService,
    // // public _globalConfig: _globalConfig
  ) {
    // se llama al cargar storage siemp que se inicialize el servicio para que tengan datos manejables.
    this.cargarStorage();
  }



  estaLogueado(){

    return (this.token.length > 5 )? true : false;

  }

  login( usuario: _UserModelNatural ){

    let url =  `${_SERVICIOS}/login`;

    ////console.log(_SERVICIOS);
    // const headers = new HttpHeaders()
    // // .set('content-type','application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    // .set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //     // Set
  // ////console.log(headers)
  // return this.http.get<Person[]>(this.baseURL + 'people',{'headers':headers})

    // this._globalConfig.spinner = true;
    // una vez logeado hace falta grabar la sesión en el local storage designado.

    return this.http.post(url, usuario ).pipe(
        map( (resp: any) => {

          console.log('modelo valido que se guarda', resp.data);

          this.guardarStorage(resp.message.id_user, resp.message.t, resp.data);

          this._notifyService.Toast.fire({
            title: resp.message.w,
            icon: 'success'
          });
          this.loginVisible = false;
          // this._globalConfig.spinner = false;
          return true;
        }),
        catchError( err =>{
          ////console.log(err);
          this._notifyService.Toast.fire({
            title: 'Algo ha salido mal',
            icon: 'error'
          });
          // this._globalConfig.spinner = false;
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
          this.roleName = 'Persona natural';
          break;
          case "EMPRESA_ROLE":
          this.roleName = 'Empresa';
          break;
          case "ADMIN_ROLE":
          this.roleName = 'Administrador';
          break;

        default:
          // code...
          break;
      }

    } else {
      this.token = null;
      this.usuario = null;
    }



    // //////console.log('cargar storage token: ', this.token);
  }

  setCaptcha() {
    let var1: number = Math.floor(Math.random() * 10);
    let var2: number = Math.floor(Math.random() * 10);

    this.captcha[0] = var1;
    this.captcha[1] = var2;
    this.captcha[2] = var1 + var2;

    // //////console.log(this.captcha);
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
        //////console.log("respuesta", resp);
        // alert("Usuario registrado");
        // swal('Perro registrado', '' , 'success');
        let n = new _NotifyModel(
          "nAccountCreatedNoVerify",
          null,
          resp.data._id
        );
        // this._notifyService.sendNotifyEmailPOST(n).subscribe((resp) => {
//
        // });
        // this._notifyService.Toast.fire({
        //   title: '¡Usuario registrado!',
        //   text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: 'success'
        // });

        this._notifyService.swalNormal.fire({
          title: "¡Cuenta creada con exito!",
          text: "Inicia sesión ahora mismo, y empieza a pautar con nosotros en la red",
          icon: "success",

          confirmButtonText: 'Aceptar'

        }).then((result) => {
          this.router.navigate(['/us']);
        });


        return true;
      }),
      catchError((err) => {
        this._notifyService.Toast.fire({
          title: 'Algo ha salido mal, intente más tarde',
          icon: 'error'
        });

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
    guardarStorage( id:string, token: string, usuario: any ){

      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      // se almacena el usuario pero hay que tener cuidado por que la respuesta que se retorna es un objeto.. para esto se transforma en un string por que localstorage solo almacena strings
      localStorage.setItem('user', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;


      switch (this.usuario.role) {
        case "CLIENTE_ROLE":
          this.roleName = 'Persona natural';
          break;
          case "EMPRESA_ROLE":
          this.roleName = 'Empresa';
          break;
          case "ADMIN_ROLE":
          this.roleName = 'Administrador';
          break;

        default:
          // code...
          break;
      }


    }


  logout(){
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    // una vez al deslogear se pasa al login

    this._notifyService.Toast.fire({
      title: '¡Vuelva pronto!',
      icon: 'success'
    });

    this.router.navigate(['/']);
  }

  changeFileUser( archivo: File, tipo: string, file: string,id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let token = this.token;

      formData.append( 'imagen', archivo, archivo.name );
      console.log('envia tio', file);
      formData.append( 'type', file );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {



            resolve( JSON.parse( xhr.response ) );
          } else {



            reject( xhr.response );
          }

        }
      };

      let url = _SERVICIOS + '/upload/' + tipo + '/' + id + '?t=' +token;

      //////console.log('la url', url);
      //////console.log('formada', formData);

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }






  updateCompanyDataPUT(dataCompany: _UserModelCompany){

 let url = `${_SERVICIOS}/user/${this.usuario._id}/?t=${this.token}`;

 console.log('url', url);
 console.log('lo que se manda', dataCompany);

    return this.http.put(url, dataCompany).pipe(
      map((resp: any) => {
        //////console.log("respuesta", resp);
        // alert("Usuario registrado");
        // swal('Perro registrado', '' , 'success');
        let n = new _NotifyModel(
          "nAccountCreatedNoVerify",
          null,
          resp.data._id
        );
        // this._notifyService.sendNotifyEmailPOST(n).subscribe((resp) => {
//
        // });
        this._notifyService.Toast.fire({
          title: '¡Usuario modificado!',
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: 'success'
        });
        console.log('respuesta guardada',resp['data']);
        // return true;
        this.guardarStorage( this.usuario._id , this.token, resp['data'])
      }),
      catchError((err) => {
        console.log( 'el error', err);
        this._notifyService.Toast.fire({
          title: 'Algo ha salido mal, intente más tarde',
          icon: 'error'
        });

        return throwError(err);
      })
    );
  }

  updateUserPUT(
    usuarioNatural: _UserModelNatural = null,
    usuarioCompany: _UserModelCompany = null,
    type){

 let url = `${_SERVICIOS}/user/${this.usuario._id}/?t=${this.token}`;
////console.log(url);
    let usuario: any;
    if (type == "natural") {
      usuario = usuarioNatural;
    }
    if (type == "company") {
      usuario = usuarioCompany;
    }

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        //////console.log("respuesta", resp);
        // alert("Usuario registrado");
        // swal('Perro registrado', '' , 'success');
        let n = new _NotifyModel(
          "nAccountCreatedNoVerify",
          null,
          resp.data._id
        );
        // this._notifyService.sendNotifyEmailPOST(n).subscribe((resp) => {
//
        // });
        this._notifyService.Toast.fire({
          title: '¡Usuario modificado!',
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: 'success'
        });
        console.log('respuesta guardada',resp['data']);
        // return true;
        this.guardarStorage( this.usuario._id , this.token, resp['data'])
      }),
      catchError((err) => {
        console.log( 'el error', err);
        this._notifyService.Toast.fire({
          title: 'Algo ha salido mal, intente más tarde',
          icon: 'error'
        });

        return throwError(err);
      })
    );
  }






  getLocation(){

    // this._globalConfig.spinner = true;
    if ("geolocation" in navigator){ //check geolocation available
      //try to get user current location using getCurrentPosition() method

      var x = new Promise((resolve, reject) => {

        // ////console.log('entra al geo');
        setTimeout(function(){reject('timeout')},10000);

      navigator.geolocation.getCurrentPosition( position => {
        console.log('entra');
        var l ={
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  mapUrl: `https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&hl=es;z=14&output=embed`
            }
              // ////console.log(position.coords.latitude, position.coords.longitude);


      this._notifyService.Toast.fire({
      title: '¡Localización almacenada!',
      // text:'El navegador no soporta la geolocalización',
      icon: 'success'
      });


      resolve(l);
      });



    });

    return x;

  }else{

    this._notifyService.Toast.fire({
      title: 'Lo sentimos',
      text:'El navegador no soporta la geolocalización',
      icon: 'error'
    });
    // reject(false);
      // ////console.log("Browser doesn't support geolocation!");
  }

  }

  promiseTimeout(ms, promise){

    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out in '+ ms + 'ms.')
      }, ms)
    })

    // Returns a race between our timeout and the passed in promise
    return Promise.race([
      promise,
      timeout
    ])
  }


}
