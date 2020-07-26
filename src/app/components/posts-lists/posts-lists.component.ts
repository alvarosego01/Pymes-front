import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  DoCheck,
  OnChanges,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  PostsService,
  GlobalConfigService,
  NotifyService,
  UsersService,
  SearchService,
} from "src/app/services/service.index";

import { LocationStrategy } from "@angular/common";
// import { EventEmitter } from 'events';

@Component({
  selector: "app-posts-lists",
  templateUrl: "./posts-lists.component.html",
  styleUrls: ["./posts-lists.component.sass"],
})
export class PostsListsComponent implements OnInit, OnChanges {
  @Input("idUser") idUser: string;
  @Input("type") type: string;
  @Input("not") not: string = null;
  @Input("byCategory") byCategory: string = null;

  registros: any = [];

  // idUserComponent
  // notComponent
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public GlobalConfigService: GlobalConfigService,
    public _notifyService: NotifyService,
    public _userService: UsersService,
    public _searchService: SearchService
  ) {
    this._searchService.registros = [];
  }

  ngOnChanges() {
    // //// ////////////console.log('onchanges');
    // //// ////////////console.log('entra en vista');

    if (this.type == "sugerencia" && this.not != null && this.idUser != null && this.idUser != "") {
      //
      //// ////////////console.log('sugerencias');
      this.getSuggestPublic(this.byCategory, this.not);
    } else if (
      this.type == "othersUser" &&
      this.idUser != null &&
      this.idUser != ""
    ) {
      // //// ////////////console.log('aaa', this._searchService.registros);

      this.getUserPublication(this.idUser);
    }
    // else{
//
        // this.setFirstLook();
    // }
  }




  ngOnInit(): void {
    // ////////////console.log(this.listado);


  }

  getSuggestPublic(category, not = null) {
    // this.idUser = null;

    let l = {
      desde: 0,
      limite: 4,
      not: not,
    };
    // category: this.byCategory

    ////// ////////////console.log('lo que se manda', l);

    this.GlobalConfigService.spinner = true;
    this._postService.getSuggestPublicPOST(category, l).subscribe(
      (resp) => {
        // ////// ////////////console.log(resp);

        if (resp.status == 200 && resp.ok == true) {
          // this.statsGeneral = resp.data;

this._searchService.registros = resp.data;
          ////// ////////////console.log(resp.data, 'los registros nuevos');
          // this.setUserInformation();
          // if(this.usuarioInfo.length > 0){
          // }
          if (
            this._searchService.registros &&
            this._searchService.registros.length > 0
          ) {
            this._searchService.setActualReactions();
          }

          this.GlobalConfigService.spinner = false;
        } else {
          // this._notifyService.Toast.fire({
          // title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          // icon: "error",
          // });
          this.GlobalConfigService.spinner = false;
        }

        this.GlobalConfigService.spinner = false;
      },
      (err) => {
        this.GlobalConfigService.spinner = false;
      }
    );
  }
  getUserPublication(idUser) {
    // this.idUser = null;

    let l = {
      desde: 0,
      limite: 4,
      // not: not,
    };

    ////// ////////////console.log('lo que se manda', l);

    this.GlobalConfigService.spinner = true;
    this._postService.getUserPublicationGET(idUser, l).subscribe(
      (resp) => {
        // ////// ////////////console.log(resp);

        if (resp.status == 200 && resp.ok == true) {
          // this.statsGeneral = resp.data;

this._searchService.registros = resp.data;
          ////// ////////////console.log(resp.data, 'los registros nuevos');
          // this.setUserInformation();
          // if(this.usuarioInfo.length > 0){
          // }
          if (
            this._searchService.registros &&
            this._searchService.registros.length > 0
          ) {
            this._searchService.setActualReactions();
          }

          this.GlobalConfigService.spinner = false;
        } else {
          // this._notifyService.Toast.fire({
          // title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          // icon: "error",
          // });
          this.GlobalConfigService.spinner = false;
        }

        this.GlobalConfigService.spinner = false;
      },
      (err) => {
        this.GlobalConfigService.spinner = false;
      }
    );
  }


  sendReaction(registro, type: string) {
    // ////// ////////////console.log(registro, 'registor');

    if (
      this._userService.estaLogueado() == true &&
      registro.myReaction != null
    ) {
      type = null;
      registro.myReaction = null;
    }

    this.GlobalConfigService.spinner = true;
    let idPublic = registro._id;
    this._postService.sendReactionPOST(idPublic, type).subscribe((resp) => {
      //
      if (resp.status == 200 && resp.ok == true) {
        this._notifyService.Toast.fire({
          title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: "success",
        });
        // this.setActualReactions();
        // this.setActualReactions(idPublic);
        if (this.type == "sugerencia" && this.not != null && this.idUser != null && this.idUser != "") {
          this.getUserPublication(this.idUser);
        } else if (
          this.type == "othersUser" &&
          this.idUser != null &&
          this.idUser != ""
        ) {
          this.getUserPublication(this.idUser);
        } else {
        }
      } else {
        this._notifyService.Toast.fire({
          title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: "error",
        });
      }

      this.GlobalConfigService.spinner = false;
    });
  }

  setActualReactions(idPublic) {
    this.GlobalConfigService.spinner = false;
    this._postService.setActualReactionsGET(idPublic).subscribe((resp) => {
      // ////// ////////////console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        resp.reactions.like = 0;
        resp.reactions.dislike = 0;
        resp.data.forEach((element) => {
          if (element.reaction === "like") {
            resp.reactions.like++;
          }
          if (element.reaction === "dislike") {
            resp.reactions.dislike++;
          }
          if (
            this._userService.estaLogueado() == true &&
            element.idUser === this._userService.usuario._id
          ) {
            resp.reactions.myReaction = element.reaction;
          }
        });
      } else {
        // this._notifyService.Toast.fire({
        // title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        // icon: "error",
        // });
      }

      this.GlobalConfigService.spinner = false;
    });
  }

  goPublication(id) {
    // ['/publication/infoPost', item._id
    // this.router.navigate(['/publication/infoPost', id]);
    // this.router.navigate(["publication/infoPost", id]).then(result => {
    //   if(result){
        window.open(`/#/publication/infoPost/${id}`, '_blank');
      // }
    // });
  }
}
