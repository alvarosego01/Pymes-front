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
import { PostsService } from './posts.service';


@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _postService: PostsService,
    public _userService: UsersService
  ) { }



  verifyPublicationPOST(idPublication, user, elect, reasons = null){


    let url = `${_SERVICIOS}/verify/${idPublication}/${user}?t=${this._userService.token}`;

    let l = {
      status: (elect == 'Aprobado')? true: false,
      reasons: (reasons != null)? reasons : null
    }

    return this.http.post(url, l).pipe(
      map((resp: any) => {

        return resp;
      }),
      catchError((err) => {

        return throwError(err);
      })
    );

  }

}
