import { Component, OnInit } from '@angular/core';
import { NotifyService,   UsersService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-notify-control',
  templateUrl: './notify-control.component.html',
  styleUrls: ['./notify-control.component.sass']
})
export class NotifyControlComponent implements OnInit {

  constructor(
        public router: Router,
    public activatedRoute: ActivatedRoute,
    public _notifyService: NotifyService,
    public _usersService: UsersService,
       public GlobalConfigService: GlobalConfigService
  ) { }

  ngOnInit(): void {
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
          // this.router.navigate(["/dashboard/notify"]);
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

            //console.log("notificaciones", resp.data);
          },
          (err) => {}
        );

  }

}
