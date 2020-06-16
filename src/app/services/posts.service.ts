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
import { VerifyService } from './verify.service';

@Injectable({
  providedIn: "root",
})
export class PostsService {


  PDFFILE: string = null;
  idUserComponent: string = null; // = "this.publication.user._id";
  notComponent: string = null; // = "this.publication._id

  categoryPrincipal = [
    {
      base: "Accesorios",
      child: ["Bisutería", "Perfumes", "Gafas", "Bolsos", "Otra"],
    },
    {
      base: "Bebes y niños",
      child: ["Vestuario", "Zapatos", "Accesorios", "Juguetes", "Otra"],
    },
    {
      base: "Belleza",
      child: [
        "Maquillaje",
        "Spas uñas",
        "Cabello",
        "Tratamientos",
        "Cejas",
        "Otra",
      ],
    },
    // {
    // base: "Bricolaje",
    // child: [],
    // },
    // {
    // base: "Bodas",
    // child: [],
    // },
    {
      base: "Deporte",
      child: ["Otra"],
    },
    // {
    //   base: "Electrónica",
    //   child: [],
    // },
    {
      base: "Educación",
      child: ["Cursos", "Diplomados", "Técnicos", "Talleres", "Otra"],
    },
    {
      base: "Hogar",
      child: ["Ropa", "Electrodomesticos", "Aseo", "Otra"],
    },
    {
      base: "Moda",
      child: ["Vestuario y zapatos", "Otra"],
    },
    {
      base: "Ocio",
      child: ["Otra"],
    },
    {
      base: "Profesionales",
      child: [
        "Abogados",
        "Arquitectos",
        "Ingenieros",
        "Electricistas",
        "Pintores",
        "Fontaneros",
        "Otra",
      ],
    },
    {
      base: "Restaurantes",
      child: ["Otra"],
    },
    {
      base: "Salud",
      child: [
        "Farmacias",
        "Médicos",
        "Psicologos",
        "Odontologos",
        "Bioenergética",
        "Otra",
      ],
    },
    {
      base: "Supermercados",
      child: ["Minimercados", "Fruterías", "Otra"],
    },

    {
      base: "Tecnología",
      child: ["Celulares", "Electrodomesticos", "Otra"],
    },
    {
      base: "Vehículos",
      child: [
        "Venta motos",
        "Carros",
        "Repuestos",
        "Llantas",
        "CDA",
        "SOAT",
        "Otra",
      ],
    },

    {
      base: "Viajes",
      child: ["Otra"],
    },
    {
      base: "Otros",
      child: ["Otra"],
    },
  ];
  public notificacion = new EventEmitter<any>();
  constructor(
    public http: HttpClient,
    public router: Router,
    // public _verifyService: VerifyService,
    // public _notifyService: NotifyService,
    public _usersService: UsersService // public GlobalConfigService: GlobalConfigService
  ) // public notificacion = new EventEmitter<any>();
  {}

  // '/reactions/:id/:p',mdAutentication.verificaToken,(req,res,next)=>
  // {
  //   /////////////////////////////////////////////////////////////////
  //   likes.idUser = req.usuario._id; // id de quien le dio like/dislike
  //   likes.reaction = req.body.r; // la reaccion

  //   let index = req.params.p;
  //   let id = req.params.id;

  // (registro.index, this.publication._id , type
  sendReactionCommentPOST(index, idPublic, type){

    let url = `${_SERVICIOS}/post/comments/reactions/${idPublic}/${index}`;

    url = (this._usersService.estaLogueado() == true)? `${url}?t=${this._usersService.token}`: url;

    ////// console.log(url);

    let reaction = {
      r: type
    }

    return this.http.post(url, reaction).pipe(
      map((resp: any) => {

        return resp;
      }),
      catchError((err) => {

        return throwError(err);
      })
    );


  }

  getUserPublicationGET(idUser ,limites){

    // publicacionesUser/5ec5cb9121f1fc03d8067b34

    let url = `${_SERVICIOS}/post/publicacionesUser/${idUser}`;
    // console.log('url', url);
    //////////// console.log(data, "llega data notif");
    return this.http.post(url,  limites).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }
  getSuggestPublicPOST(category, limites){

    // publicacionesUser/5ec5cb9121f1fc03d8067b34

    let url = `${_SERVICIOS}/post/sameCategory/${category}`;
    // console.log('url', url);
    //////////// console.log(data, "llega data notif");
    return this.http.post(url,  limites).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }



  createCommentPOST(idPublication, data){
    // /post/comments
    let url = `${_SERVICIOS}/post/comments/${idPublication}`;


    // let url = `${_SERVICIOS}/post/comments/reactions/${idPublic}/${index}`;

    url = (this._usersService.estaLogueado() == true)? `${url}?t=${this._usersService.token}`: url;


    //////////// console.log(data, "llega data notif");
    return this.http.post(url, data).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }

  deleteCommentDELETE( ideComment, publicationId ){

    let url = `${_SERVICIOS}/post/comments/${publicationId}/${ideComment}?t=${this._usersService.token}`;
    //////////// console.log(data, "llega data notif");

    ////// console.log('url', url);
    return this.http.delete(url).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );

  }

  getCommentsGET(idUser){

    let url = `${_SERVICIOS}/post/comments/${idUser}`;
    //////////// console.log(data, "llega data notif");
    return this.http.get(url).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }
  getStatsGeneralGET(idUser){

    let url = `${_SERVICIOS}/post/stats/${idUser}`;
    //////////// console.log(data, "llega data notif");

    //// console.log('envia', url);
    return this.http.get(url).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }


  setNewVisitPUT(id){
    // /post/view/5ed1087cd1baa3076cf32edd
    let url = `${_SERVICIOS}/post/view/`;

    ////// console.log('url', url);
    // ////// console.log('lo que se manda', dataCompany);

    let l  ={
      id: id
    }
       return this.http.put( url, l ).pipe(
         map((resp: any) => {
           //////////// console.log("respuesta", resp);
           // alert("Usuario registrado");
           // swal('Perro registrado', '' , 'success');
           let n = new _NotifyModel(
             "nAccountCreatedNoVerify",
             null,
             resp.data._id
           );
           // this._notifyService.sendNotifyEmailPOST(n).subscribe((resp) => {
      //  ////// console.log('funciona visita', resp);
            return resp;
         }),
         catchError((err) => {

          // ////// console.log('error visita', err);
           return throwError(err);
         })
       );

  }


  // .......................................................


  sendReactionPOST(idPublic, type){
    // http://localhost:5160/post/reaction

    let url = `${_SERVICIOS}/post/reaction/${idPublic}`;

    // let url = `${_SERVICIOS}/post/comments/reactions/${idPublic}/${index}`;

    url = (this._usersService.estaLogueado() == true)? `${url}?t=${this._usersService.token}`: url;

    let reaction = {
      r: type
    }

    return this.http.post(url, reaction).pipe(
      map((resp: any) => {

        return resp;
      }),
      catchError((err) => {

        return throwError(err);
      })
    );

  }

  setActualRankingGET(idPublic){

    let url = `${_SERVICIOS}/post/ranking/stars/${idPublic}`;
    //////////// console.log(data, "llega data notif");
    return this.http.get(url).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }

  sendRankingPOST(idPublic, points){
    // http://localhost:5160/post/reaction

    let url = `${_SERVICIOS}/post/ranking/stars/${idPublic}`;


    url = (this._usersService.estaLogueado() == true)? `${url}?t=${this._usersService.token}`: url;

    let reaction = {
      points: points
    }

    // //// console.log(url);
    // return;

    return this.http.post(url, reaction).pipe(
      map((resp: any) => {

        return resp;
      }),
      catchError((err) => {

        return throwError(err);
      })
    );

  }


  setActualReactionsGET(idPublication){

    let url = `${_SERVICIOS}/post/reaction/${idPublication}`;
    //////////// console.log(data, "llega data notif");
    return this.http.get(url).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );


  }

  deletePublicDELETE(idPublic){

    let url = _SERVICIOS + '/post/' + idPublic;
    url += '?t=' + this._usersService.token;

    return this.http.delete( url ).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta", resp);
        // alert("Usuario registrado");
        // swal('Perro registrado', '' , 'success');
        // let n = new _NotifyModel(
        //   "nAccountCreatedNoVerify",
        //   null,
        //   resp.data._id
        // );
        // // this._notifyService.sendNotifyEmailPOST(n).subscribe((resp) => {
//
        // });

        return resp;
        // this.guardarStorage( this.usuario._id , this.token, resp['data'])
      }),
      catchError((err) => {
        ////// console.log( 'el error', err);


        return throwError(err);
      })
    );
  }

  getSinglePostGET(idPublication){

    let url = `${_SERVICIOS}/post/publicacion/${idPublication}`;


    url = (this._usersService.estaLogueado() == true)? `${url}?t=${this._usersService.token}`: url;

    //////////// console.log(data, "llega data notif");
    return this.http.get(url).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        // //// console.log('tra', r);
        return resp;
      }),
      catchError((err) => {
        // //// console.log("respuesta", err);
        // return err;
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );

  }

  getAllPublicationsGET() {
    // return;
    let url = _SERVICIOS + "/post";
    //////////// console.log(data, "llega data notif");
    return this.http.get(url).pipe(
      map((resp: any) => {
        //////////// console.log("respuesta notificacion", resp);
        // alert('Usuario registrado');

        return resp;
      }),
      catchError((err) => {
        //////////// console.log("respuesta notificacion", err);
        // alert('Error en al registrar');
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  getMyPublications() {
    let url = `${_SERVICIOS}/post/publicaciones?t=${this._usersService.token}`;

    // una vez logeado hace falta grabar la sesión en el local storage designado.
    return this.http.get(url).pipe(
      map((resp: any) => {
        // //////////// console.log('respuesta', resp);

        return resp;
      }),
      catchError((err) => {
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  createPublication(post: any, archivo: any) {
    // ////////// console.log(archivo., 'coño pana');
    // ////////// console.log(post.title, 'coño pana');

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let token = this._usersService.token;

      formData.append("title", post.title);
      formData.append("target", post.target);
      formData.append("content", post.content);
      formData.append("notContent", post.notContent);
      formData.append("days", post.days);
      formData.append("_mapUrl", post._mapUrl);
      // formData.append("dir", post.dir);
      // formData.append("department", post.department);
      // formData.append("city", post.city);
      formData.append("type", post.type);

      // formData = this.createFormData( post._category,formData, '_category');
      // formData = this.createFormData( post._rangoPrize,formData, '_rangoPrize');
      // formData = this.createFormData( post._cityTarget,formData, '_cityTarget');
      // formData = this.createFormData( post._socialNet,formData, '_socialNet');

      formData.append("_infoContact", post._infoContact);
      formData.append("_category", post._category);
      formData.append("_rangoPrize", post._rangoPrize);
      formData.append("_cityTarget", post._cityTarget);
      formData.append("_socialNet", post._socialNet);

      // formData.append("img", archivo, archivo.name);
      for (var i = 0; i < archivo.length; ++i) {
        ////////// console.log(archivo[i].name);
        formData.append("files[]", archivo[i], archivo[i].name);
      }

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          try {

          if (xhr.status === 200) {
            // ////////// console.log( 'Imagen subida' );
            resolve(JSON.parse(xhr.response));
          } else {
            // ////////// console.log( 'Fallo la subida' );
            resolve(JSON.parse(xhr.response));
          }

        }
        catch (e) {
            ////// console.log(e.status);
        }
        }

      };

      // this.GlobalConfigService.spinner = false;
      let url = _SERVICIOS + "/post" + "?t=" + token;

      //////////// console.log('la url', url);
      //////////// console.log('formada', formData);

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
