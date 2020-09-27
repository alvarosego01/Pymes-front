import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { NotifyService } from "src/app/services/service.index";

@Component({
  selector: "app-notify-preview",
  templateUrl: "./notify-preview.component.html",
  styleUrls: ["./notify-preview.component.sass"],
})
export class NotifyPreviewComponent implements OnInit {
  existNotif: boolean = false;

  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService
  ) {
    this.getAllNotifyByUser();
  }

  ngOnInit(): void {}

  getAllNotifyByUser(paginate: number = 1) {
    if (this._usersService.estaLogueado() == true) {
      this._notifyService
        .getAllNotifyByUserGET(paginate)
        .subscribe(
          (resp) => {
            var data = resp.data;

            this._notifyService.notificaciones = resp.data;
            this._notifyService.paginator = resp.paginator;

            // if (resp.data.registros && resp.data.registros.length > 0) {
            //   this.existNotif = true;
            // }

            //////// console.log("notificaciones", resp.data);
          },
          (err) => {}
        );
    }
  }
}
