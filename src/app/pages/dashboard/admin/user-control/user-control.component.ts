import { Component, OnInit } from "@angular/core";
import { PostsService } from "src/app/services/posts.service";
import {
  NotifyService,
  VerifyService,
  UsersService,
} from "src/app/services/service.index";
import { GlobalConfigService } from "src/app/services/-global-config.service";

@Component({
  selector: "app-user-control",
  templateUrl: "./user-control.component.html",
  styleUrls: ["./user-control.component.sass"],
})
export class UserControlComponent implements OnInit {
  paginator: any = null;
  _users: any = [];

  constructor(
    public _postService: PostsService,
    public GlobalConfigService: GlobalConfigService,
    public _notifyService: NotifyService,
    public _verifyService: VerifyService,
    private _userService: UsersService
  ) {
    window.scroll(0, 0);

    this.getAlUsers();
  }

  ngOnInit(): void {}

  async getAlUsers(paginate: number = 1) {
    this.GlobalConfigService.spinner = true;

    await this._userService.getAllUsers(paginate).subscribe(
      (resp) => {
        ////// console.log('resultados', resp);
        var data = resp.data;

        this._users = data;

        this.paginator = resp.paginator;

        this.GlobalConfigService.spinner = false;
      },
      (err) => {
        this.GlobalConfigService.spinner = false;
      }
    );
  }

  newPageResponse(paginate) {
    this.getAlUsers(paginate);
  }

  confirmDeleteUser(id) {
    // console.log("abre confirm");

    this._notifyService.swalNormal
      .fire({
        title: "¿Deseas eliminar al usuario?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.value) {
          this.deleteUser(id);
        }
      });
  }

  deleteUser(id) {
    this.GlobalConfigService.spinner = true;
    this._userService.removeUserDELETE(id).subscribe(
      async (resp) => {
        var data = resp.data;

        this._notifyService.Toast.fire({
          title: resp.message,
          icon: "success",
        });

        await this.getAlUsers(this.paginator.currentPage);

        this.GlobalConfigService.spinner = false;
      },
      (err) => {
        console.error(err);

        this.GlobalConfigService.spinner = false;
      }
    );
  }
}
