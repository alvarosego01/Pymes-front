import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {

  NotifyService,
} from "src/app/services/service.index";
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: "app-newsletter",
  templateUrl: "./newsletter.component.html",
  styleUrls: ["./newsletter.component.sass"],
})
export class NewsletterComponent implements OnInit {

  enviado: boolean = false;
  constructor(
    public globalConfig: GlobalConfigService,
    public _notifyService: NotifyService
  ) {}

  ngOnInit(): void {}

  cargarNewsLetter(forma: NgForm) {
    var l = {
      email: forma.value.Email,
      name: forma.value.Nombre,
      city: forma.value.Ciudad,
    };
    this.globalConfig.spinner = true;

    this.globalConfig.newsLetterAddPOST(l).subscribe(
      (resp) => {
        // this.router.navigate(['/dashboard']);
        ////////// ////// console.log('FUNCIONA', resp);
        this.globalConfig.spinner = false;

        this._notifyService.Toast.fire({
          title: resp.message,
          icon: "success",
        });

        forma.reset();

        // //// ////// console.log(resp);
      },
      (ERR) => {
        var resp = ERR;
        console.error('error custom', resp.error);
        // this._notifyService.Toast.fire({
        //   title: resp.error.message,
        //   icon: "error",
        // });

        let e = ERR.error.message.errors || null;
        if(e != null){

          let errors: any = [];

        for (var [key, value] of Object.entries(e)) {
          ////// console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
          errors.push(value);
        }

        errors.forEach((element, idx) => {

          this._notifyService.Toast.fire({
            title: element.message ||'Algo ha salido mal, intente más tarde',
            icon: "error",

          });

        });

      }else{

        this._notifyService.Toast.fire({
          title: 'Algo ha salido mal, intente más tarde',
          icon: "error",

        });

      }

        this.globalConfig.spinner = false;
      }
    );
  }


  alEnviar(){


    this.enviado = true;

  }






}
