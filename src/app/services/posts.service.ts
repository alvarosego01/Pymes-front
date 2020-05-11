import { Router } from "@angular/router";
import { URL_SERVICIOS } from "./../config/config";
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

@Injectable({
  providedIn: "root",
})
export class PostsService {
  categoryPrincipal = [
    {
      base: "Accesorios",
      child: ["Bisutería", "Perfumes", "Gafas", "Bolsos"],
    },
    {
      base: "Bebes y niños",
      child: ["Vestuario", "Zapatos", "Accesorios", "Juguetes"],
    },
    {
      base: "Belleza",
      child: ["Maquillaje", "Spas uñas", "Cabello", "Tratamientos", "Cejas"],
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
      child: [],
    },
    // {
    //   base: "Electrónica",
    //   child: [],
    // },
    {
      base: "Educación",
      child: ["Cursos", "Diplomados", "Técnicos", "Talleres"],
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
      ],
    },
    {
      base: "Vehículos",
      child: ["Venta motos", "Carros", "Repuestos", "Llantas", "CDA", "SOAT"],
    },
    {
      base: "Hogar",
      child: ["Ropa", "Electrodomesticos", "Aseo"],
    },
    {
      base: "Tecnología",
      child: [
        "Celulares",
        "Electrodomesticos",
        // 'Aseo'
      ],
    },
    // {
    //   base: "Juguetes",
    //   child: [],
    // },
    // {
    //   base: "Libros",
    //   child: [],
    // },

    {
      base: "Moda",
      child: ["Vestuario y zapatos"],
    },
    // {
    //   base: "Motor",
    //   child: [],
    // },
    {
      base: "Ocio",
      child: [],
    },
    // {
    //   base: "Perfumeria",
    //   child: [],
    // },
    {
      base: "Restaurantes",
      child: [],
    },
    {
      base: "Supermercados",
      child: ["Minimercados", "Fruterías"],
    },
    {
      base: "Salud",
      child: [
        "Farmacias",
        "Médicos",
        "Psicologos",
        "Odontologos",
        "Bioenergética",
      ],
    },
    {
      base: "Viajes",
      child: [],
    },
    {
      base: "Otros",
      child: [],
    },
  ];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _notifyService: NotifyService,
    public _usersService: UsersService
  ) // public _globalConfig: _globalConfig
  {}

  getMyPublications() {
    let url = `${URL_SERVICIOS}/post/publicaciones?t=${this._usersService.token}`;

    // una vez logeado hace falta grabar la sesión en el local storage designado.
    return this.http.get(url).pipe(
      map((resp: any) => {
        // //console.log('respuesta', resp);

        return resp;
      }),
      catchError((err) => {
        // swal( 'Error en al registrar', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  createPublication(post: any, archivo: any) {
    // console.log(archivo., 'coño pana');
    // console.log(post.title, 'coño pana');

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

      formData.append("_category", post._category);
      formData.append("_rangoPrize", post._rangoPrize);
      formData.append("_cityTarget", post._cityTarget);
      formData.append("_socialNet", post._socialNet);

      // formData.append("img", archivo, archivo.name);
      for (var i = 0; i < archivo.length; ++i) {
        formData.append("files[]", archivo[i], archivo[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      // this._globalConfig.spinner = false;
      let url = URL_SERVICIOS + "/post" + "?t=" + token;

      //console.log('la url', url);
      //console.log('formada', formData);

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

  createFormData(
    object: Object,
    form?: FormData,
    namespace?: string
  ): FormData {
    const formData = form || new FormData();
    for (let property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (
        typeof object[property] === "object" &&
        !(object[property] instanceof File)
      ) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }
}
