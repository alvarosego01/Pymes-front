import { Component, OnInit, Input, AfterViewInit, DoCheck, OnChanges } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  PostsService,
  _globalConfig,
  NotifyService,
  UsersService,
  SearchService,
} from "src/app/services/service.index";

import { LocationStrategy } from "@angular/common";

@Component({
  selector: "app-posts-lists",
  templateUrl: "./posts-lists.component.html",
  styleUrls: ["./posts-lists.component.sass"],
})
export class PostsListsComponent implements OnInit, OnChanges {

  @Input('idUser') idUser: string;
  @Input('type') type: string;
  @Input('not') not: string = null;



  registros: any = [];

  // idUserComponent
  // notComponent
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
    public _notifyService: NotifyService,
    public _userService: UsersService,
    public _searchService: SearchService
  ) {
    // this._searchService.registros = [];
    // //console.log('entra en vista');
    this.setFirstLook();

    // console.log('constrcutor');


    // if((this.type == 'sugerencia') && this.idUser != null && this.idUser != ''){
    //   console.log('caso especial');
    //   this._searchService.registros = [];
    //   this.getUserPublication(this.idUser, this.not);

    //   // console.log('aaa', this._searchService.registros);
    // }


    console.log('constructor');

  }

  ngOnChanges() {
    console.log('onchanges');

    if( (this.type == 'sugerencia') && this.idUser != null && this.idUser != ''){
      // this._searchService.registros = [];
      this.getUserPublication(this.idUser, this.not);


    }

  }

  ngOnInit(): void {
    console.log('ngoninit');
  // //console.log('IDUSER ', this.idUser);
      if((this.type == 'sugerencia') && this.idUser != null && this.idUser != ''){
        // this._searchService.registros = [];
      this.getUserPublication(this.idUser, this.not);

      // console.log('aaa', this._searchService.registros);
    }


  }



 getUserPublication(idUser, not = null){

  // this.idUser = null;

  let l = {
    desde: 0,
    limite: 4,
    not: not
  }

  //console.log('lo que se manda', l);

  this._globalConfig.spinner = true;
  this._postService.getUserPublicationGET(idUser ,l).subscribe((resp) => {
    // //console.log(resp);

    if (resp.status == 200 && resp.ok == true) {


      // this.statsGeneral = resp.data;
      this._searchService.registros  = resp.data
      //console.log(resp.data, 'los registros nuevos');
      // this.setUserInformation();
      // if(this.usuarioInfo.length > 0){
      // }
      this._searchService.setActualReactions();

      this._globalConfig.spinner = false;
    } else {
      // this._notifyService.Toast.fire({
      // title: resp.message,
      // text: '¡Gracias por unirte a Mercado Pyme!',
      // icon: "error",
      // });
      this._globalConfig.spinner = false;
    }

    this._globalConfig.spinner = false;

  });




}

  setFirstLook() {
    this._globalConfig.spinner = true;
    this._searchService.setFirstLookPOST().subscribe((resp) => {
      // //console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // //console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });
        if( resp.data.length > 0  && resp.data[0].length > 0){
          this._searchService.registros = resp.data[0];
          this._searchService.setActualReactions();
          console.log('actualiza', this._searchService.registros);
        }else{
          // this._searchService.registros = [];
        }
      } else {
        // this._notifyService.Toast.fire({
        // title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        // icon: "error",
        // });
      }

      this._globalConfig.spinner = false;
    });
  }


  sendReaction(registro ,type: string ) {

    // //console.log(registro, 'registor');

    // if(this._userService.estaLogueado() == false){
    //   this._notifyService.Toast.fire({
    //     title: 'Debes iniciar sesión o registrarte',
    //     text: 'Para poder reaccionar',
    //     icon: "error",
    //   });

    //   return;
    // }

    if ( (this._userService.estaLogueado() == true) && registro.myReaction != null) {
      type = null;
      registro.myReaction = null;
    }

    this._globalConfig.spinner = true;
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
        if((this.type == 'sugerencia') && this.idUser != null && this.idUser != ''){

          this.getUserPublication(this.idUser, this.not);


        }else{

        }

      } else {
        this._notifyService.Toast.fire({
          title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: "error",
        });
      }

      this._globalConfig.spinner = false;
    });

  }

  setActualReactions(idPublic) {
    this._globalConfig.spinner = false;
    this._postService
      .setActualReactionsGET(idPublic)
      .subscribe((resp) => {
        // //console.log(resp);

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
            if ( (this._userService.estaLogueado() == true) && element.idUser === this._userService.usuario._id) {
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

        this._globalConfig.spinner = false;
      });
  }


  goPublication(id){
    // ['/publication/infoPost', item._id
    // this.router.navigate(['/publication/infoPost', id]);
    this.router.navigate(["publication/infoPost", id]);
  }




}
