import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NotifyService,   PostsService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

import { _UserModelNatural, _UserModelCompany

   } from 'src/app/models/models.index';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {


  statsGeneral: any = [];

  imagenSubir: File;
  imagenTemp: any;

  imageName = 'Seleccionar';

  role: string = '';


  // para los formularios
   ciudades = [];
  idc: number = 0;

  estadosActividad: any = [];
  mapUrl: string = '';
  altMapUrl: string = null;
  mapElement:any;

  nrPhones= new Array(1);

  idType: string = '';

  companyPhonee: any = [];

  ciudadIndice = 0;

  coordsMap:any = {};
  activateMap = false;




// para los  form
email: string;
gender: string;
identification: string;
name: string;
phone: string;
surname: string;
typeId: string;
year: string;
ngPositionCompany: string;
receiveEmail: string;
termsCondition: string;
imgProfile: string;
preference: string;
status: string;
created_at: string;
updated_at: string;
firstTime: string;
verify: string;
celPhone: string;
city: string;
department: string;


ProduccionActivity: string;
ComercializacionActivity: string;
ServiciosActivity: string;
OtroActivity: string;

// ajustes pyme
ngnameCompany: string;
ngNIT: string;
ngReasons: string;
ngdirectionCompany: string;


usuarioInfo: any = [];
roleName: string;


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService
  ) {

    ////// ////////////console.log('entra profile');

    // return;
    activatedRoute.params.subscribe((params) => {
      let id = params["id"];


      ////// ////////////console.log(id);
      // return;
      // this.setPublication(id);
      this.getUserProfile(id);

    });




   }

  ngOnInit(): void {
  }




  setNewVisit(id){


    // this.GlobalConfigService.spinner = true;
    this._usersService
      .setNewVisitPUT(id)
      .subscribe((resp) => {
        // ////// ////////////console.log(resp);

        if (resp.status == 200 && resp.ok == true) {
          // this._notifyService.Toast.fire({
          // ////// ////////////console.log(resp);
          // this._notifyService.Toast.fire({
          //   title: resp.message,
          //   // text: '¡Gracias por unirte a Mercado Pyme!',
          //   icon: "success",
          // });
          // this.setActualRanking();
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
      });

  }

  getStatsGeneral(id){

    this.GlobalConfigService.spinner = true;
    this._postService.getStatsGeneralGET(id).subscribe((resp) => {
      // ////// ////////////console.log(resp);

      // ////////////console.log('llamado informacion stats');
      if (resp.status == 200 && resp.ok == true) {


        // this.statsGeneral = resp.data;
        this.usuarioInfo.statsGeneral  = resp.data
        //// ////////////console.log(resp.data);
        // this.setUserInformation();
        // if(this.usuarioInfo.length > 0){
        // }
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

    });

  }

  setMapUrl(l){


    if(l.mapUrl != null){

      this.coordsMap = this._usersService.usuario._mapUrl;
      this.activateMap = true;

      return;
    }
    if( (l.latitude != null) && (l.longitude != null) ) {
      this.coordsMap = `https://maps.google.com/maps?q=${l.latitude},${l.longitude}&hl=es;z=14"`;
      this.activateMap = true;

      return;
    }

  }


  setUserInformation(){


    ////// ////////////console.log('informacion de usuario', this.usuarioInfo);

    switch (this.usuarioInfo.role) {
      case "CLIENTE_ROLE":
        this.roleName = 'Persona natural';
        break;
        case "EMPRESA_ROLE":
        this.roleName = 'Empresa';
        break;
        case "ADMIN_ROLE":
        this.roleName = 'Administrador';
        break;

      default:
        // code...
        break;
    }


    this.email = this.usuarioInfo.email;
    this.gender = this.usuarioInfo.gender;
    this.identification = this.usuarioInfo.identification;
    this.typeId = this.usuarioInfo.typeId;
    this.name = this.usuarioInfo.name;
    this.surname = this.usuarioInfo.surname;
    this.phone = this.usuarioInfo.phone;
    this.year = this.usuarioInfo.year;
    this.ngPositionCompany = this.usuarioInfo.positionCompany;
    this.created_at = this.usuarioInfo.created_at;
    this.updated_at = this.usuarioInfo.updated_at;
    this.firstTime = this.usuarioInfo.firstTime;
    this.verify = this.usuarioInfo.verify;
    this.celPhone = this.usuarioInfo.celPhone;
    this.city = this.usuarioInfo.city;
    this.department = this.usuarioInfo.department;
    this.receiveEmail = this.usuarioInfo.receiveEmail;


    if(this.usuarioInfo.role == 'EMPRESA_ROLE' ){
      // ajustes pyme
      this.ngnameCompany = this.usuarioInfo._dataPyme.nameCompany;
      this.ngNIT = this.usuarioInfo._dataPyme.nit;
    this.ngReasons = this.usuarioInfo._dataPyme.socialReason;
    this.ngdirectionCompany = this.usuarioInfo._dataPyme.direction;
    this.companyPhonee = this.usuarioInfo._companyPhones;
    this.nrPhones = this.usuarioInfo._companyPhones.length;

    ////// ////////////console.log(this.companyPhonee);
  }


    ////// ////////////console.log('map',this.usuarioInfo._mapUrl);

    if(this.usuarioInfo._mapUrl != null){
      // ////////// ////////////console.log(this.usuarioInfo._mapUrl.mapUrl);
      var l = this.usuarioInfo._mapUrl;
      this.setMapUrl(l);


    }

    var dpPrev = this.GlobalConfigService.departamentos.find( d => d.departamento === this.department );

    this.ciudades = dpPrev.ciudades;





    for (var i = 0; i < this.usuarioInfo._naturalEconomicActivity.length; ++i) {
      this.estadosActividad.push(this.usuarioInfo._naturalEconomicActivity[i].typeActivity);
      ////////// ////////////console.log(this.usuarioInfo._naturalEconomicActivity[i].details);
      switch (this.usuarioInfo._naturalEconomicActivity[i].typeActivity) {
        case "Producción":
        ////////// ////////////console.log('fue produccion');
        this.ProduccionActivity = this.usuarioInfo._naturalEconomicActivity[i].details;
        break;
        case "Comercialización":
        this.ComercializacionActivity = this.usuarioInfo._naturalEconomicActivity[i].details;
        break;
        case "Servicios":
        this.ServiciosActivity = this.usuarioInfo._naturalEconomicActivity[i].details;
        break;
        case "Otro":
        this.OtroActivity = this.usuarioInfo._naturalEconomicActivity[i].details;
        break;
        default:
          // code...
          break;
      }
    }

    ////// ////////////console.log(this.usuarioInfo);

    this.GlobalConfigService.setTitle(`Perfil de usuario - ${this.usuarioInfo.name} ${this.usuarioInfo.surname}`);

  }


  getUserProfile(idUser: string ){


  this.GlobalConfigService.spinner = true;
  this._usersService.getUserProfileGET(idUser).subscribe((resp) => {
    // ////// ////////////console.log(resp);

    if (resp.status == 200 && resp.ok == true) {


      this.usuarioInfo = resp.data;

      this.setUserInformation();

      this.getStatsGeneral(this.usuarioInfo._id);
      this.setNewVisit(this.usuarioInfo._id);
      // if(this.usuarioInfo.length > 0){
      // }

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

  },(error) => {
    // //// ////////////console.log('recibe error acá', error);
    this._notifyService.Toast.fire({
      title: error.error.message,
      // text: '¡Gracias por unirte a Mercado Pyme!',
      icon: "error",
    });

    this.GlobalConfigService.spinner = false;
    this.router.navigate(["/home"]);
  });

  }


}
