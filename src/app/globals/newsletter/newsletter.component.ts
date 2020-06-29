import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  GlobalConfigService,
  NotifyService,
} from "src/app/services/service.index";

@Component({
  selector: "app-newsletter",
  templateUrl: "./newsletter.component.html",
  styleUrls: ["./newsletter.component.sass"],
})
export class NewsletterComponent implements OnInit {
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
        ////////// ////console.log('FUNCIONA', resp);
        this.globalConfig.spinner = false;

        this._notifyService.Toast.fire({
          title: resp.message,
          icon: "success",
        });

        forma.reset();

        // //// ////console.log(resp);
      },
      (ERR) => {
        var resp = ERR;
        // //// ////console.log(resp.error);
        this._notifyService.Toast.fire({
          title: resp.error.message,
          icon: "error",
        });

        this.globalConfig.spinner = false;
      }
    );
  }



}
