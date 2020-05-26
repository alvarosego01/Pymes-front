import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  PostsService,
  _globalConfig,
  NotifyService,
  UsersService,
} from "src/app/services/service.index";

import { LocationStrategy } from "@angular/common";

@Component({
  selector: 'app-posts-lists',
  templateUrl: './posts-lists.component.html',
  styleUrls: ['./posts-lists.component.sass']
})
export class PostsListsComponent implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
    public _notifyService: NotifyService,
    public _userService: UsersService
  ) { }

  ngOnInit(): void {
  }


  sendReaction(type: string, id = null) {

    // if (this.reactions.myReaction != null) {
    //   type = null;
    //   this.reactions.myReaction = null;
    // }

    // this._globalConfig.spinner = true;
    // let idPublic = (id != null)? id:this.publication._id;
    // this._postService.sendReactionPOST(idPublic, type).subscribe((resp) => {
    //   //
    //   if (resp.status == 200 && resp.ok == true) {
    //     this._notifyService.Toast.fire({
    //       title: resp.message,
    //       // text: '¡Gracias por unirte a Mercado Pyme!',
    //       icon: "success",
    //     });
    //     this.setActualReactions();
    //   } else {
    //     this._notifyService.Toast.fire({
    //       title: resp.message,
    //       // text: '¡Gracias por unirte a Mercado Pyme!',
    //       icon: "error",
    //     });
    //   }

    //   this._globalConfig.spinner = false;
    // });
  }


}
