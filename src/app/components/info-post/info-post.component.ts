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
  selector: "app-info-post",
  templateUrl: "./info-post.component.html",
  styleUrls: ["./info-post.component.sass"],
})
export class InfoPostComponent implements OnInit {
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

  imgPaginate: number = 0;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
    public _notifyService: NotifyService,
    private url: LocationStrategy,
    public _userService: UsersService
  ) {
    activatedRoute.params.subscribe((params) => {
      let id = params["id"];

      this.setPublication(id);
    });

    this.setTypeVisit();
  }

  ngOnInit(): void {}


  sliderIMG(n) {

    let total_pages = Math.ceil(this.publication._files.length / 4);
    console.log('total', total_pages);
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

      console.log('pagina', this.imgPaginate);
    }

  setActiveIMG(files) {
    // console.log(files);
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
        // console.log(resp);

        //   "data": [
        //     {
        //         "points": 3,
        //         "idUser": "5ec4020931fe571be453aa32"
        //     }
        // ]

        // settingStars = {
        //   total: 0,
        //   myPoint: 0
        // };

        if (resp.status == 200 && resp.ok == true) {
          this.settingStars.total = 0;
          this.settingStars.myPoint = 0;
          resp.data.forEach((element) => {
            if (element.points > 0) {
              this.settingStars.total += element.points;
            }

            if (element.idUser === this._userService.usuario._id) {
              this.settingStars.myPoint = element.points;
            }
          });


          if(this.settingStars.total > 0){
            this.settingStars.total = this.settingStars.total/resp.data.length
          }

            if(this.settingStars.total > 5){
              this.settingStars.total = 5.0;
              }


          if(this.settingStars.myPoint >= 1){
            if(this.settingStars.myPoint == 1){
              this.activateStars = [ true, false, false, false, false ];
            }
            if(this.settingStars.myPoint <= 2){
              this.activateStars = [ true, true, false, false, false ];
            }
            if(this.settingStars.myPoint <= 3){
              this.activateStars = [ true, true, true, false, false ];
            }
            if(this.settingStars.myPoint <= 4){
              this.activateStars = [ true, true, true, true, false ];
            }
            if(this.settingStars.myPoint <= 5){
              this.activateStars = [ true, true, true, true, true ];
            }
          }
          // console.log(this.settingStars.total);
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

  sendRanking(points) {
    this._globalConfig.spinner = true;
    this._postService
      .sendRankingPOST(this.publication._id, points)
      .subscribe((resp) => {
        // console.log(resp);

        if (resp.status == 200 && resp.ok == true) {
          // this._notifyService.Toast.fire({
          console.log(resp);
          this._notifyService.Toast.fire({
            title: resp.message,
            // text: '¡Gracias por unirte a Mercado Pyme!',
            icon: "success",
          });
          this.setActualRanking();
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

  sendReaction(type: string ) {
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
        // console.log(resp);

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
            if (element.idUser === this._userService.usuario._id) {
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

  sendComment(forma: NgForm) {}

  openContact() {
    // console.log();

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
    // console.log(this.url.path());

    if (
      this._userService.estaLogueado() == true &&
      this._userService.token != null &&
      this._userService.roleName == "Administrador" &&
      this.url.path().includes("/admin/infoPost")
    ) {
      this.visit.role = this._userService.roleName;
      this.visit.root = this.url.path();
      // console.log('visita', this.visit);
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

        let p = this.publication._cityTarget;
        p.forEach((element) => {
          console.log(element);
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
        this.setActualReactions();
        this.setActualRanking();

        // console.log('existe', resp.data);
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
