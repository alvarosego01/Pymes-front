import { Component, OnInit } from "@angular/core";
import { NotifyService, UsersService } from "src/app/services/service.index";
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: "app-notify-view",
  templateUrl: "./notify-view.component.html",
  styleUrls: ["./notify-view.component.sass"],
})
export class NotifyViewComponent implements OnInit {
  existNotif: boolean = false;

  notificacion:any = [];
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService
  ) {

    this.activatedRoute.params.subscribe((params) => {
      let id = params["id"];

      this.getNotifyByUser(id);

    });
    // this.GlobalConfigService.spinner = true;
  }

  ngOnInit(): void {}

  getNotifyByUser(id) {
    if (this._usersService.estaLogueado() == true) {
      this.GlobalConfigService.spinner = true;
      this._notifyService
        .getNotifyByUserGET(id)
        .subscribe(
          (resp) => {

            var data = resp.data;

            this.notificacion = data;

            if (this.notificacion) {
              this.existNotif = true;
            }

            this._notifyService.Toast.fire({
              title: resp.message,
              icon: 'success'
            })

            //////// console.log("notificacion", resp.data);
            this.GlobalConfigService.spinner =false;
          },
          (err) => {

            this._notifyService.Toast.fire({
              title: 'No existe la notificación',
              icon: 'error'
            })
            this.GlobalConfigService.spinner = false;

            this.router.navigate(["/dashboard/notify"]);

          }
        );
    }
  }


  deleteNotif(id){


    this._notifyService.swalNormal.fire({
      title: 'Eliminar notificación',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.GlobalConfigService.spinner = true;
        this._notifyService.deleteNotificactionDELETE(id).subscribe((resp) => {

          this._notifyService.Toast.fire({
            title: resp.message,
            icon: 'success'
          })
          this.getAllNotifyByUser();
          this.GlobalConfigService.spinner = false;
          this.router.navigate(["/dashboard/notify"]);
        }, (err) => {

          this._notifyService.Toast.fire({
            title: err.message,
            icon: 'error'
          })


          this.GlobalConfigService.spinner = false;
        });

      }
    })

  }

  getAllNotifyByUser() {

      this._notifyService
        .getAllNotifyByUserGET(this._usersService.usuario._id)
        .subscribe(
          (resp) => {
            var data = resp.data;

            this._notifyService.notificaciones = resp.data;

            // if (resp.data.registros && resp.data.registros.length > 0) {
            //   this.existNotif = true;
            // }

            //////// console.log("notificaciones", resp.data);
          },
          (err) => {}
        );

  }

}
