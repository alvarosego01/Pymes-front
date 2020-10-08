import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService, VerifyService,   NotifyService, UsersService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { _NotifyModel } from 'src/app/models/notifyModel';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-verify-control',
  templateUrl: './verify-control.component.html',
  styleUrls: ['./verify-control.component.sass']
})
export class VerifyControlComponent implements OnInit {
  enviado: boolean = false;


  token: string = null;

  type: string = null;



  fieldTextType: boolean;
  repeatFieldTextType: boolean;


  constructor(

    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _searchService: SearchService,
    public _verifyService: VerifyService,
    public _notifyService: NotifyService,
    public _userService: UsersService,
    public GlobalConfigService: GlobalConfigService,

  ) {

    this.receptVerify();

  }

  ngOnInit(): void {
  }



  async receptVerify(){


    this.activatedRoute.params.subscribe( async (params) => {
      let type = params["type"];
      //////// console.log(type);

      if(type != null && type != ''){

        await this._searchService.getParameters().then( (resp: any) => {

          //////// console.log('resp', resp);
          let t = (resp.t != null && resp.t != '')? resp.t: null;

            if(t == null){
              this.router.navigate(["/home"]);
            }else{
              this.token = t;
              this.decodeURL(t);

            }

        },err => {

        })


      }else{
        this.router.navigate(["/home"]);
      }


    });




  }


  decodeURL(url){

    this.GlobalConfigService.spinner = true;
    this._verifyService.decodeURLPOST(url).subscribe( async (resp: any) => {

      this._notifyService.Toast.fire({
        title: resp.message,
        icon: 'success'
      })
      //////// console.log('la resp del decoded', resp);

      this.type = resp.data.type;
      // this.url = resp.data.url;


      // dependiendo de la respuesta, se dispara el verify correspondiente
      // en caso de, cambio de email, o validaciones con url
      if(this.type == 'changeEmail'){

        await this.changeEmail().then(r => {

          this.router.navigate(["/home"]);
        },err => {
          this.router.navigate(["/home"]);
        })

      }


      this.GlobalConfigService.spinner = false;
    }, (err: any) => {

      this._notifyService.Toast.fire({
        title: err.message,
        icon: 'error'
      })

      this.GlobalConfigService.spinner = false;
      this.router.navigate(["/home"]);
    });


  }



  changePassword(forma: NgForm){

    if(forma.value.Pass == '' ||    forma.value.Pass == null){
      this._notifyService.Toast.fire({
        title: 'Debes escribir una contraseña nueva',
        icon: 'error'
      });
      return;
    }


    if(forma.value.Pass != forma.value.CPass){
      this._notifyService.Toast.fire({
        title:'Validación de contraseña incorrecta',
        icon: 'error'
      });
      return;
    }

    var l = {
      pass: forma.value.Pass,
    }

    this.GlobalConfigService.spinner = true;

    this._userService.changePasswordPUT(l, this.token).subscribe((resp) => {
      //////// console.log('la resp', resp);

      this._notifyService.Toast.fire({
        title: resp.message,
        icon: 'success'
      });

      let n = new _NotifyModel(
        "nAccountChangePassword",
        null,
        resp.data._id
      );

      this._notifyService.sendNotifyEmailPOST(n).subscribe((resp: any) => {

      }, err => {

      });

      this.GlobalConfigService.spinner = false;
      this.router.navigate(['/home']);

    }, (err) => {

      this._notifyService.Toast.fire({
        title: err.message,
        icon: 'error'
      });

      this.GlobalConfigService.spinner = false;
    });



  }


  changeEmail(){

    return new Promise((resolve,reject) => {

      let t = this._userService.token;
      this.GlobalConfigService.spinner = true;
      this._userService.changeEmailPUT(this.token).subscribe((resp) => {
        // var data = resp.data;

        this._notifyService.Toast.fire({
          title: resp.message,
          icon: 'success'
        })


        let l = new _NotifyModel(
          "nAccountChangeEmail",
          null,
          resp.data._id
          );

          this._notifyService.sendNotifyEmailPOST(l, t).subscribe((resp: any) => {
            //////// console.log('email enviado', resp);
          // return;
          // this.GlobalConfigService.spinner = false;
        }, err => {
          // //////// console.log('email error');
        });

        resolve(true);
        this.GlobalConfigService.spinner = false;
      }, (err) => {

        this._notifyService.Toast.fire({
          title: err.message,
          icon: 'error'
        })

        reject(false);
      });

    })
  }


  alEnviar(){


    this.enviado = true;

  }



  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }


}
