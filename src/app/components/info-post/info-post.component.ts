import { Component, OnInit } from "@angular/core";
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
import { ImagenPipe } from 'src/app/pipes/image-control.pipe';

@Component({
  selector: "app-info-post",
  templateUrl: "./info-post.component.html",
  styleUrls: ["./info-post.component.sass"],
})
export class InfoPostComponent implements OnInit {



  lectura: boolean = true;

  pdfSrc: string;

  ratingStars: number;

  imgActive: string = "";

  publication: any;
  idPublication: string;
  ciudades: string = "";

  activateMap: boolean = false;
  map: string = null;

  visit: any = {
    role: "",
    root: "",
  };

  reactions = {
    like: 0,
    dislike: 0,
    myReaction: null,
  };

  _Comentsreactions = {
    like: 0,
    dislike: 0,
    myReaction: null,
  };

  settingStars = {
    total: 0,
    myPoint: 0,
  };

  activateStars = [
    false,
    false,
    false,
    false,
    false
  ]

  points: number = 0;

  animacion: string = '';
  comments: any = [];

  imgPaginate: number = 0;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
    public _notifyService: NotifyService,
    private url: LocationStrategy,
    public _userService: UsersService,
    public _searchService: SearchService
  ) {
    activatedRoute.params.subscribe((params) => {
      let id = params["id"];

      this.setPublication(id);
      this.setNewVisit(id);
      this.getComments(id);
    });

    this.setTypeVisit();


    if(this._userService.estaLogueado() == true){

      this.lectura = false;

    }

  }

  ngOnInit(): void {}

  canDeleteComment( comments: any ){

    if(this._userService.estaLogueado() == true){


      let idPublic = this.publication._id;
      let idUser = this._userService.usuario._id;

      // dueño de la publicacion
      if( this.publication.user._id === idUser ){

        return true;
      }

      // si es administrador
      if( this._userService.roleName === 'Administrador' ){

        return true;
      }

      // dueño del comentario
      if( comments.idUser === idUser ){

        return true
      }


    }
    return false

  }

  setNewVisit(id){


    // this._globalConfig.spinner = true;
    this._postService
      .setNewVisitPUT(id)
      .subscribe((resp) => {
        // //console.log(resp);

        if (resp.status == 200 && resp.ok == true) {
          // this._notifyService.Toast.fire({
          // //console.log(resp);
          // this._notifyService.Toast.fire({
          //   title: resp.message,
          //   // text: '¡Gracias por unirte a Mercado Pyme!',
          //   icon: "success",
          // });
          // this.setActualRanking();
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


  sliderIMG(n) {

    let total_pages = Math.ceil(this.publication._files.length / 4);
    // //console.log('total', total_pages);
    switch (n) {

      case -1:
        this.imgPaginate = ( (this.imgPaginate > 0)  )? this.imgPaginate = this.imgPaginate - 1: this.imgPaginate;
        break;
        case +1:
        this.imgPaginate = (  (this.imgPaginate < total_pages ) )? this.imgPaginate = this.imgPaginate + 1: this.imgPaginate;
        break;

      default:
        break;

      }

      // //console.log('pagina', this.imgPaginate);
    }


    deleteComment(ideComment){

      this._globalConfig.spinner = true;
      // let idPublic = registro._id;
      //console.log('manda a eliminar');
      this._postService.deleteCommentDELETE(ideComment, this.publication._id ).subscribe((resp) => {
        this._globalConfig.spinner = false;
        if (resp.status == 200 && resp.ok == true) {
          this._notifyService.Toast.fire({
            title: resp.message,
            // text: '¡Gracias por unirte a Mercado Pyme!',
            icon: "success",
          });
          //console.log('manda a eliminar');
          // this.setActualReactions();
          // this.setActualReactions(idPublic);
          // if(this.idUser != null && this.idUser != ''){

            // this.getUserPublication(this.idUser, this.not);
            this.getComments(this.publication._id);




          // }else{

          // }

          this._globalConfig.spinner = false;
        } else {
          this._notifyService.Toast.fire({
            title: resp.message,
            // text: '¡Gracias por unirte a Mercado Pyme!',
            icon: "error",
          });
          this._globalConfig.spinner = false;
        }

        this._globalConfig.spinner = false;
      });

    }

    sendReactionComment(registro ,type: string ) {

      // //console.log(registro, 'registor');

      if(this._userService.estaLogueado() == false){
        this._notifyService.Toast.fire({
          title: 'Debes iniciar sesión o registrarte',
          text: 'Para poder reaccionar',
          icon: "error",
        });

        return;
      }

      if (registro.myReaction != null) {
        type = null;
        registro.myReaction = null;
      }


      this._globalConfig.spinner = true;
      let idPublic = registro._id;
      this._postService.sendReactionCommentPOST(registro._id, this.publication._id , type).subscribe((resp) => {
        this._globalConfig.spinner = false;
        if (resp.status == 200 && resp.ok == true) {
          this._notifyService.Toast.fire({
            title: resp.message,
            // text: '¡Gracias por unirte a Mercado Pyme!',
            icon: "success",
          });
          // this.setActualReactions();
          // this.setActualReactions(idPublic);
          // if(this.idUser != null && this.idUser != ''){

            // this.getUserPublication(this.idUser, this.not);
            this.getComments(this.publication._id);




          // }else{

          // }

          this._globalConfig.spinner = false;
        } else {
          this._notifyService.Toast.fire({
            title: resp.message,
            // text: '¡Gracias por unirte a Mercado Pyme!',
            icon: "error",
          });
          this._globalConfig.spinner = false;
        }

        this._globalConfig.spinner = false;
      });

    }



  setActiveIMG(files) {
    // //console.log(files);
    this.imgActive = files.file;
  }

  goLogin() {
    window.scroll(0, 0);
    this._userService.loginVisible = true;
  }

  setActualRanking() {
    this._globalConfig.spinner = false;
    this._postService
      .setActualRankingGET(this.publication._id)
      .subscribe((resp) => {
        // //console.log(resp);

        if (resp.status == 200 && resp.ok == true) {


          this.ratingStars = resp.data.points;
          // //console.log(this.settingStars.total);
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



  openPDF(file){

    // | imagen:'Post':this.publication._id
    let p = new ImagenPipe().transform(file, 'Post', this.publication._id);
    this._postService.PDFFILE = p;

    this.pdfSrc = p;
    // console.log(p);

    // // $('#pdfView').modal('show')
    // let ht = `
    // <pdf-viewer src="${this._postService.PDFFILE}"
    // [render-text]="true"

    // style="display: block; height: 500px">
    // </pdf-viewer>`;

    // // ht = `<app-pdf-view></app-pdf-view>`;

    // this._notifyService.swalNormal.fire({
    //   html: ht
    // });


  }

  sendPuntaje(e){
    // console.log('eventoo', e.rating);

    // console.log('eventoo', r)

    if(this._userService.estaLogueado() == false){
      this._notifyService.Toast.fire({
        title: 'Debes iniciar sesión o registrarte',
        text: 'Para poder reaccionar',
        icon: "error",
      });

      return;
    }


    this._globalConfig.spinner = true;
    this._postService
      .sendRankingPOST(this.publication._id, e.rating)
      .subscribe((resp) => {
        // //console.log(resp);

        if (resp.status == 200 && resp.ok == true) {
          // this._notifyService.Toast.fire({
          // //console.log(resp);
          this._notifyService.Toast.fire({
            title: resp.message,
            // text: '¡Gracias por unirte a Mercado Pyme!',
            icon: "success",
          });
          this.ratingStars = resp.data.points;
          // this.setActualRanking();

          console.log(resp.data);
        } else {
          // this._notifyService.Toast.fire({
          // title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          // icon: "error",
          // });
        }

        this._globalConfig.spinner = false;
      });
      this._globalConfig.spinner = false;



  }

  sendReaction(type: string ) {

    if(this._userService.estaLogueado() == false){
      this._notifyService.Toast.fire({
        title: 'Debes iniciar sesión o registrarte',
        text: 'Para poder reaccionar',
        icon: "error",
      });

      return;
    }

    if (this.reactions.myReaction != null) {
      type = null;
      this.reactions.myReaction = null;
    }

    this._globalConfig.spinner = true;
    let idPublic = this.publication._id;
    this._postService.sendReactionPOST(idPublic, type).subscribe((resp) => {
      //
      if (resp.status == 200 && resp.ok == true) {
        this._notifyService.Toast.fire({
          title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: "success",
        });
        this.setActualReactions();
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

  setActualReactions() {
    this._globalConfig.spinner = false;
    this._postService
      .setActualReactionsGET(this.publication._id)
      .subscribe((resp) => {
        // //console.log(resp);
        //console.log('la respuesta al like', resp);
        if (resp.status == 200 && resp.ok == true) {
          this.reactions.like = 0;
          this.reactions.dislike = 0;
          resp.data.forEach((element) => {
            if (element.reaction === "like") {
              this.reactions.like++;
            }
            if (element.reaction === "dislike") {
              this.reactions.dislike++;
            }
            if ( (this._userService.estaLogueado() == true) && element.idUser === this._userService.usuario._id) {
              this.reactions.myReaction = element.reaction;
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

  getComments(id) {
    this._globalConfig.spinner = true;
    this._postService
      .getCommentsGET(id)
      .subscribe((resp) => {
        // //console.log(resp);
        // //console.log('la respuesta al comment', resp);
        if (resp.status == 200 && resp.ok == true) {

          // 0: {…}
          // ​​
          // _id: "5ed3dd6678f6f11e0842d0a3"
          // ​​
          // created_at: "31 de mayo de 2020"
          // ​​
          // idUser: "5ecb9977ef4988108443eebb"
          // ​​
          // index: null
          // ​​
          // reactions: (1) […]
          // ​​​
          // 0: {…}
          // ​​​​
          // _id: "5ed3f386052ac91f7804afb0"
          // ​​​​
          // idUser: "5ecb9977ef4988108443eebb"
          // ​​​​
          // reaction: "like"
          // ​​​​
          // <prototype>: Object { … }
          // ​​​
          // length: 1
          // ​​​
          // <prototype>: Array []
          // ​​
          // text: "aaa"
          // ​​
          // userName: "empresa"
          // ​​
          // <prototype>: {…


          this.comments = resp.data;

          //console.log('LA MIERDA', this.comments);

          this.comments.forEach((element, i) => {
          this.comments[i].like = 0;
          this.comments[i].dislike = 0;

          this.comments[i].reactions.forEach((element, ii) => {


            if (this.comments[i].reactions[ii].reaction === "like") {
              this.comments[i].like++;
            }
            if (this.comments[i].reactions[ii].reaction === "dislike") {
              this.comments[i].dislike++;
            }
            if ( (this._userService.estaLogueado() == true) && this.comments[i].reactions[ii].idUser === this._userService.usuario._id) {
              this.comments[i].myReaction = this.comments[i].reactions[ii].reaction;
            }

          });

          });

          this._globalConfig.spinner = false;
          //console.log('comentarios', this.comments);
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

  sendComment(forma: NgForm) {

    if(forma.value.coment == null || forma.value.coment == ''){
      this._notifyService.Toast.fire({
        title: 'Debes escribir un mensaje para poder comentar',
        // text: '¡Gracias por unirte a Mercado Pyme!',
        icon: "error",
      });
      return;
    }
    if( this._userService.estaLogueado() == false ){
      this._notifyService.Toast.fire({
        title: 'Debes iniciar sesión para poder comentar',
        // text: '¡Gracias por unirte a Mercado Pyme!',
        icon: "error",
      });
      return;
    }

    let userName = '';
  if(this._userService.roleName === 'Empresa' ){
    userName = this._userService.usuario._dataPyme.nameCompany;
  }else{
    userName = `${this._userService.usuario.name} ${this._userService.usuario.surname}`;

  }


  let l = {
    userName: userName,
    text: forma.value.coment
  }



  this._globalConfig.spinner = true;
  this._postService
      .createCommentPOST(this.publication._id, l)
      .subscribe((resp) => {
        // //console.log(resp);

        if (resp.status == 200 && resp.ok == true) {
          // this._notifyService.Toast.fire({
          // //console.log(resp);
            forma.reset();
          this._notifyService.Toast.fire({
            title: resp.message,
            // text: '¡Gracias por unirte a Mercado Pyme!',
            icon: "success",
          });
          // this.setActualRanking();
          this.getComments(this.publication._id);
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

  openContact() {
    // //console.log();

    let ht = `<div class="container containerFull">
    <h4 style="margin-bottom: 15px;" class="titleSpecial4">
      Datos de contacto:
    </h4>
    <hr>
    <div class="row">
      <h6 style="margin-bottom: 15px;" class="col-12 titleSpecial6">
        <i class="fas fa-user"></i>
        Nombre: ${this.publication.user.name} ${this.publication.user.surname}
      </h6>
    </div>`;
    if (this.publication.user.role === "EMPRESA_ROLE") {
      ht += `<div class="row">
      <h6 style="margin-bottom: 15px;" class="col-12 titleSpecial6">
      <i class="fas fa-user"></i>
        Cargo: ${this.publication.user.positionCompany}
        </h6>
        </div>`;
    }
    ht += `<div class="row">
      <h6 style="margin-bottom: 15px;" class="col-12 titleSpecial6">
        <i class="fas fa-envelope    "></i>
        Email: ${this.publication._infoContact.email}
      </h6>
    </div>
    <div class="row">
      <h6 style="margin-bottom: 15px;" class="col-md-12 col-lg-6 titleSpecial6">
        <i class="fa fa-phone" aria-hidden="true"></i>
        Teléfono: ${this.publication._infoContact.phone}
      </h6>
      <h6 style="margin-bottom: 15px;" class="col-md-12 col-lg-6 titleSpecial6">
        <i class="fas fa-mobile-alt"></i>
        Teléfono celular: ${this.publication._infoContact.celPhone}
      </h6>
    </div>
  </div>`;

    this._notifyService.swalNormal.fire({
      // title: '<strong>HTML <u>example</u></strong>',
      icon: "success",
      html: ht,
      showCloseButton: true,
      // showCancelButton: true,
      // focusConfirm: false,
      confirmButtonText: "Aceptar",
    });
  }

  setTypeVisit() {
    // //console.log(this.url.path());

    if (
      this._userService.estaLogueado() == true &&
      this._userService.token != null &&
      this._userService.roleName == "Administrador" &&
      this.url.path().includes("/admin/infoPost")
    ) {
      this.visit.role = this._userService.roleName;
      this.visit.root = this.url.path();
      // //console.log('visita', this.visit);
      //  this.active=0;
    }
  }

  setPublication(idPublic) {
    this._globalConfig.spinner = true;
    this._postService.getSinglePostGET(idPublic).subscribe((resp) => {
      // this._globalConfig.spinner = false;

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // title: resp.message,
        //  text: '¡Gracias por unirte a Mercado Pyme!',
        // icon: 'success'
        // });
        this.publication = resp.data;
        this.publication = this.publication[0];
        this.ciudades = '';
        let p = this.publication._cityTarget;
        p.forEach((element) => {
          // //console.log(element);
          if (p[p.length - 1] === element) {
            this.ciudades += `${element.city}`;
          } else {
            this.ciudades += `${element.city},`;
          }
        });

        let mmp = this.publication._mapUrl;
        if ( (mmp.mapUrl != null) && mmp.mapUrl.includes("https://maps.google.com/maps?")) {
          this.map = mmp.mapUrl;
          this.activateMap = true;
        } else if (mmp.longitude != null && mmp.latitude != null) {
          // this.map = `https://maps.google.com/maps?q=${mmp.latitude},${mmp.longitude}&hl=es;z=14&outpu`;
        }

        this.imgActive = this.publication._files[0].file;

        console.log(this.imgActive);

        this.setActualReactions();
        this.setActualRanking();

        // //console.log('existe', resp.data);
        this._globalConfig.spinner = false;
      } else {
        this._notifyService.Toast.fire({
          title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: "error",
        });

        this._globalConfig.spinner = false;
        this.router.navigate(["/dashboard"]);
      }
      // return true;
    });
  }
}
