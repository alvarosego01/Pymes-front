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
import { NotifyService } from "src/app/services/service.index";
import { _PostModel } from "../models/postModel";
import { UsersService } from "./users.service";

import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PostsService {
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
    public _notifyService: NotifyService,
    public _usersService: UsersService // public _globalConfig: _globalConfig
  ) // public notificacion = new EventEmitter<any>();
  {}

  getMyPublications() {
    let url = `${_SERVICIOS}/post/publicaciones?t=${this._usersService.token}`;

    // una vez logeado hace falta grabar la sesión en el local storage designado.
    return this.http.get(url).pipe(
      map((resp: any) => {
        // ////console.log('respuesta', resp);

        return resp;
      }),
      catchError((err) => {
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  createPublication(post: any, archivo: any) {
    // //console.log(archivo., 'coño pana');
    // //console.log(post.title, 'coño pana');

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
        //console.log(archivo[i].name);
        formData.append("files[]", archivo[i], archivo[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // //console.log( 'Imagen subida' );
            resolve(JSON.parse(xhr.response));
          } else {
            // //console.log( 'Fallo la subida' );
            resolve(JSON.parse(xhr.response));
          }
        }
      };

      // this._globalConfig.spinner = false;
      let url = _SERVICIOS + "/post" + "?t=" + token;

      ////console.log('la url', url);
      ////console.log('formada', formData);

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
