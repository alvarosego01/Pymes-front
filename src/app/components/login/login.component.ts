// importaciones nativas
// import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
// import { UsersService, NotifyService, _globalConfig } from 'src/app/services/service.index';
// import { _UserModelNatural } from 'src/app/models/userModel';

import { HttpClient } from '@angular/common/http';
import {OnInit, Component} from '@angular/core';
import {UsersService, NotifyService, _globalConfig} from '../../services/service.index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {




  constructor(
    public _notifyService: NotifyService,
    public _usersService: UsersService,
    public http: HttpClient,
    public router: Router,
    public _globalConfig: _globalConfig
  ){}


  ngOnInit(): void {
  }


  loginUser( forma: NgForm ){

    //////console.log("ingresando sesion", forma);

    if( forma.invalid ){
      this._notifyService.Toast.fire({
        title:'Datos invalidos',
        icon: 'error'
      });
      return;
    }
      this._globalConfig.spinner = true;
    // let usuario = new _UserModelNatural(
      // '',
      // forma.value.Email,
      // forma.value.Pass
    //  );
    let usuario = {
      email: forma.value.Email,
      pass: forma.value.Pass
    }
    // despues de que se cargan los datos en el modelo de clase de datos usuario entonces se llama la funcion de login y se pasan los datos por referencia

    //////console.log(usuario);


    this._usersService.login( usuario )
      .subscribe( resp => {
        this.router.navigate(['/dashboard']);
        //////console.log('FUNCIONA', resp);
        this._globalConfig.spinner = false;
      },
      ERR => {

        this._globalConfig.spinner = false;
      }
      );
  }



}
