// importaciones nativas
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";




// importaciones de codigo
// servicios
import { UsersService, _globalConfig, NotifyService } from "src/app/services/service.index";

import { _UserModelNatural, _UserModelCompany

   } from 'src/app/models/models.index';
import { SocialFloatComponent } from 'src/app/globals/globals.index';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.sass"],
})
export class RegisterComponent implements OnInit {


  registerControlSelect: string = null;


  ciudades = [];
  idc: number = 0;

  estadosActividadModel: any = [];
  mapUrl: string = '';
  mapElement:any;

  nrPhones= new Array(1);

  idType: string = '';

  companyPhonee: any = [];

  ciudadIndice = 0;

  coordsMap:any = {};
  activateMap = false;
  altMapUrl: string = null;
  // estadosActividad = {
  //   Produccion: false,
  //   Comercialización: false,
  //   Servicios: false,
  //   Otro: false,
  // }
  constructor(
    public router: Router,
    public _usuarioService: UsersService,
    public _globaConfig: _globalConfig,
    public _notifyService: NotifyService,
    // public SocialFloatComponent: SocialFloatComponent
    ) {
    this._usuarioService.setCaptcha();



    // //////console.log(this._globaConfig.departamentos);
  }

  ngOnInit(): void {

    if(this._usuarioService.estaLogueado()){
      this.router.navigate(['/us']);
    }else{

    }

  }

  changeForm(){
    // this.formNatural.reset();
    // this.formCompany.reset();

    this.ciudades = [];
    this.estadosActividadModel = [];
    this.mapUrl = ''
    this.mapElement = ''
    this.nrPhones = new Array(1);
    this.idType = '';
    this.companyPhonee = [];
    this.coordsMap = {};
    this.altMapUrl = '';
    this.activateMap = false;

  }

  permitId(type: string){

    this.idType = type;

  }

  addPhone(type = null){
    if(type == null){
      this.nrPhones.push(1);
    }
    if(type == 'delete' && this.nrPhones.length > 1){

      this.nrPhones.pop();
    }
  }

  muestraMap(){
    var wrapper= document.createElement('div');
wrapper.innerHTML= this.mapUrl;
var div= wrapper.firstChild;
this.mapElement = div;
//////console.log(div);
  }

  activateEconomicActivity(){
    // this.estadosActividad[e] = !this.estadosActividad[e];
    //////console.log(this.estadosActividad);
  }

  setCiudades(i){
    // //////console.log('Got the selectedVendor as : ', i);
    // return;
    let k = JSON.parse(i);
    k = k.id;
    i = k;
    let dp = this._globaConfig.departamentos;
    this.ciudades = dp[i].ciudades;

  }


  async captrarLocalizacion(){

   let x = this._usuarioService.getLocation();

   this._globaConfig.spinner = true;
   this.activateMap = false
  //  this._usuarioService.promiseTimeout(5000, x);
    x.then(r => {

      //////console.log(r);
      this.coordsMap = r;
      this._globaConfig.spinner = false;
      if(Object.keys(this.coordsMap).length > 0 ){
        this.activateMap = true;
      // //////console.log('activado mapa', );
      }
    }, err => {
      this._globaConfig.spinner = false;
      this._notifyService.Toast.fire({
        title: 'Lo sentimos',
        text:'No pudimos encontrar tu localización',
        icon: 'error'
      });

    });


  }


  userRegister(forma: NgForm, type) {



    if (forma.invalid ){
      this._notifyService.Toast.fire({
        title:'Datos invalidos',
        icon: 'error'
      });
      return;
    }
    if (forma.value.Age < 18 ){
      this._notifyService.Toast.fire({
        title:'Solo puedes registrarte si eres mayor de edad',
        icon: 'error'
      });
      return;
    }
    // if(forma.value.captcha != this._usuarioService.captcha[2]) {
    //   this._notifyService.Toast.fire({
    //     title:'Captcha incorrecto',
    //     icon: 'error'
    //   });
    //   return;
    // }
    if(forma.value.Pass != forma.value.CPass){
      this._notifyService.Toast.fire({
        title:'Confirmación de cuenta invalida',
        icon: 'error'
      });
      return;
    }

    if(this.altMapUrl != null && this.altMapUrl != ''){
      // //console.log('lo pone');
      this.coordsMap.mapUrl = this.altMapUrl;
    }

    // //console.log(this.coordsMap);
    // return;

    if(type == 'natural'){


     let  economicActivity:any[] = [];

      for (let index = 0; index < forma.value.estadosActividad.length; index++) {
        let element = forma.value.estadosActividad[index];

        switch (element) {

        case 'Producción':
          var i = forma.value.ProducciónActivity
          var l = {
            typeActivity: element,
          details: i

          }
          economicActivity.push(l);
          // upp = ProducciónActivity;
        break;
        case 'Comercialización':
          var i = forma.value.ComercializaciónActivity

          var l = {
          typeActivity: element,
          details: i
        }
          economicActivity.push(l);
          // upp = ComercializaciónActivity;
        break;
        case 'Servicios':
          var i = forma.value.ServiciosActivity

          var l = {
          typeActivity: element,
          details: i
        }
          economicActivity.push(l);
          // upp = ServiciosActivity;
        break;
        case 'Otro':
          var i = forma.value.OtroActivity

          var l = {
          typeActivity: element,
          details: i
        }
          economicActivity.push(l);
          // upp = OtroActivity;
        break;
        }

      }

      let dpdp = JSON.parse(forma.value.Department);



    let usuario = new _UserModelNatural(

       forma.value.Email,
       forma.value.Name,
       forma.value.Surname,
       forma.value.Age,
       forma.value.Pass,
       forma.value.Gender,
       forma.value.TypeId,
       forma.value.Identification,
       forma.value.Phone,
       forma.value.celPhone,
       dpdp.departamento,
       forma.value.City,
       '',
       this.coordsMap,
      '',
      forma.value.Terms,
      'CLIENTE_ROLE',
      economicActivity
      // forma.value.estadosActividad,
      );
        //  this.spinner = true;
      //  ////console.log(usuario);
      //  return;
      this._globaConfig.spinner = true;
//
          this._usuarioService.registroUsuarioPOST( usuario, null ,'natural' )
          .subscribe( resp => {
//
            this._globaConfig.spinner = false;

            forma.reset();
        }, ERR => {
          //////console.log(ERR);
          this._globaConfig.spinner = false;
        });


}
if(type == 'company'){


  let  economicActivity:any[] = [];

  for (let index = 0; index < forma.value.estadosActividad.length; index++) {
    let element = forma.value.estadosActividad[index];

    switch (element) {

    case 'Producción':
      var i = forma.value.ProducciónActivity
      var l = {
        typeActivity: element,
      details: i

      }
      economicActivity.push(l);
      // upp = ProducciónActivity;
    break;
    case 'Comercialización':
      var i = forma.value.ComercializaciónActivity

      var l = {
      typeActivity: element,
      details: i
    }
      economicActivity.push(l);
      // upp = ComercializaciónActivity;
    break;
    case 'Servicios':
      var i = forma.value.ServiciosActivity

      var l = {
      typeActivity: element,
      details: i
    }
      economicActivity.push(l);
      // upp = ServiciosActivity;
    break;
    case 'Otro':
      var i = forma.value.OtroActivity

      var l = {
      typeActivity: element,
      details: i
    }
      economicActivity.push(l);
      // upp = OtroActivity;
    break;
    }

  }

  var cphones = [];
  for (let index = 0; index < this.companyPhonee.length; index++) {
    // var element = this.companyPhonee[index];
    var ccc = {
      phonesCompany: this.companyPhonee[index]
    }
    cphones.push(ccc);

  }


  var datapyme = {
    nameCompany: forma.value.nameCompany,
    nit: forma.value.NIT,
    socialReason: forma.value.Reasons,
    direction: forma.value.directionCompany,
    logo: '',
    // companyPhones: cphones,
    // economicActivity: economicActivity,

  }

  let dpdp = JSON.parse(forma.value.Department);

  let usuario = new _UserModelCompany(
        forma.value.Email,
       forma.value.Name,
       forma.value.Surname,
       forma.value.Age,
       forma.value.Pass,
       forma.value.Gender,
       forma.value.TypeId,
       forma.value.Identification,
       forma.value.Phone,
       forma.value.celPhone,
         dpdp.departamento,
       forma.value.City,
        forma.value.positionCompany,
      this.coordsMap,
      forma.value.Terms,
      'EMPRESA_ROLE',
      datapyme,
      cphones,
      economicActivity

  );

  //////console.log(usuario, 'envio company');
      this._globaConfig.spinner = true;
//
          this._usuarioService.registroUsuarioPOST( null, usuario ,'company' )
          .subscribe( resp => {
//
            this._globaConfig.spinner = false;
            forma.reset();

          },
          ERR => {
            //////console.log(ERR);
            this._globaConfig.spinner = false;
          });

}


  }





}
