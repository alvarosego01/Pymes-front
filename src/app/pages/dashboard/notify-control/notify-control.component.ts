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




  notificaciones: any = [];

  paginator: any = null;


  constructor(
        public router: Router,
    public activatedRoute: ActivatedRoute,
    public _notifyService: NotifyService,
    public _usersService: UsersService,
       public GlobalConfigService: GlobalConfigService
  ) {

    this.getAllNotifyByUser();

  }

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
          this.getAllNotifyByUser(this.paginator.currentPage);
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

  getAllNotifyByUser(paginate: number = 1) {

    this.GlobalConfigService.spinner = true;
      this._notifyService
      .getAllNotifyByUserGET(paginate)
      .subscribe(
        (resp) => {
          var data = resp.data;

          this.notificaciones = resp.data;


          this.paginator = resp.paginator;

          //console.log('la respuesta', resp);
          this.GlobalConfigService.spinner = false;
        },
        (err) => {

          this.GlobalConfigService.spinner = false;
          }
        );

  }

  newPageResponse(paginate){

    this.paginator.currentPage = paginate;

    this.getAllNotifyByUser(paginate);

  }


}
