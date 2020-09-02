import { Component, OnInit } from "@angular/core";
import { PostsService } from "src/app/services/posts.service";
import {

  NotifyService,
  VerifyService,
  UsersService,
} from "src/app/services/service.index";
import { GlobalConfigService } from 'src/app/services/-global-config.service';

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

  getAlUsers(paginate:number = 1) {
    this.GlobalConfigService.spinner = true;

    this._userService.getAllUsers(paginate).subscribe(
      (resp) => {

        //console.log('resultados', resp);
        var data = resp.data;

        this._users = data;

        this.paginator = resp.paginator;


        //////console.log('la resp', resp);

        this.GlobalConfigService.spinner = false;
      },
      (err) => {
        this.GlobalConfigService.spinner = false;
      }
    );
  }


  newPageResponse(paginate){

    this.getAlUsers(paginate);

  }


}
