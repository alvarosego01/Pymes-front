import { Component, OnInit } from '@angular/core';
// import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import { NotifyService, UsersService } from 'src/app/services/service.index';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { _NotifyModel } from 'src/app/models/notifyModel';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.sass']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor(

    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public http: HttpClient,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }



  openLogin() {

    //////// console.log('open login');

    this._usersService.loginVisible = true;

    this._usersService.recoveryPassword = false;
  }




  recoveryPassword( forma: NgForm ){

    if( forma.invalid ){
      this._notifyService.Toast.fire({
        title:'Datos invalidos',
        icon: 'error'
      });
      return;
    }
      this.GlobalConfigService.spinner = true;

    let data = {
      emailNewPassword: forma.value.Email,
      type: 'nAccountPasswordChangeRequest'
      // pass: forma.value.Pass
    }

    this._notifyService.sendNotifyEmailPOST(data).subscribe((resp: any) => {
      //////// console.log('email enviado', resp);

      this._notifyService.Toast.fire({
        title: resp.message,
        icon: 'success'
      })

      this.GlobalConfigService.spinner = false;
    }, err => {


      this._notifyService.Toast.fire({
        title: err.error.message || 'Algo ha salido mal, intente más tarde',
        icon: 'error'
      })
      // //////// console.log('email error');
      this.GlobalConfigService.spinner = false;
    });

  }



}
