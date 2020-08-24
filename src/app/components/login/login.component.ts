// importaciones nativas
// import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
// import { UsersService, NotifyService} from 'src/app/services/service.index';
// import { _UserModelNatural } from 'src/app/models/userModel';

import { HttpClient } from '@angular/common/http';
import {OnInit, Component} from '@angular/core';
import {UsersService, NotifyService} from '../../services/service.index';
import { GlobalConfigService } from 'src/app/services/-global-config.service';


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
       public GlobalConfigService: GlobalConfigService
  ){}


  ngOnInit(): void {
  }


  loginUser( forma: NgForm ){

    if( forma.invalid ){
      this._notifyService.Toast.fire({
        title:'Datos invalidos',
        icon: 'error'
      });
      return;
    }
      this.GlobalConfigService.spinner = true;

    let usuario = {
      email: forma.value.Email,
      pass: forma.value.Pass
    }



    this._usersService.login( usuario )
      .subscribe( resp => {



        this.router.navigate(['/dashboard']);
        ////////// //////////////console.log('FUNCIONA', resp);
        this.GlobalConfigService.spinner = false;

        this._notifyService.Toast.fire({
          title: resp.message.w,
          icon: 'success'
        });


        // //// //////////////console.log(resp);
      },
      ERR => {
        var resp = ERR;
        // //// //////////////console.log(resp.error);
          this._notifyService.Toast.fire({
            title: resp.error.message,
            icon: 'error'
          });

        this.GlobalConfigService  .spinner = false;
      }
      );
  }

  openRecoveryPassword(){

    ////console.log('open recovery');

    this._usersService.loginVisible = false;

    this._usersService.recoveryPassword = true;

    return;
  }





}
