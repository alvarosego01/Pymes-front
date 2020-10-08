// importaciones nativas
import { Component, OnInit } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
// {} from '@angular/forms';

import { Router } from "@angular/router";

// FormsModule

// importaciones de codigo
// servicios
import { UsersService,   NotifyService, FormsResourcesService } from "src/app/services/service.index";

import { _UserModelNatural, _UserModelCompany, _NotifyModel

   } from 'src/app/models/models.index';
   import { SocialFloatComponent } from 'src/app/globals/globals.index';
import { GlobalConfigService } from 'src/app/services/-global-config.service';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.sass"],
})
export class RegisterComponent implements OnInit {
  enviado: boolean = false;


  registerControlSelect: string = 'Seleccionar';


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


  fieldTextType: boolean;
  repeatFieldTextType: boolean;



  constructor(
    public router: Router,
    public _usuarioService: UsersService,
    public _globaConfig: GlobalConfigService,
    public _notifyService: NotifyService,
    public _formService: FormsResourcesService,
    // public formControlName: FormControlName


    // public SocialFloatComponent: SocialFloatComponent
    ) {
    this._usuarioService.setCaptcha();


    // //////// ////// console.log(this._globaConfig.departamentos);
  }

  ngOnInit(): void {
    window.scroll(0,0);
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
    this.nrPhones = new Array(1, 2 ,3);
    this.idType = '';
    this.companyPhonee = [];
    this.coordsMap = {};
    this.altMapUrl = '';
    this.activateMap = false;

    this.enviado = false;

    this.welcomeMessage(this.registerControlSelect);

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
//////// ////// console.log(div);
  }

  activateEconomicActivity(){
    // this.estadosActividad[e] = !this.estadosActividad[e];
    //////// ////// console.log(this.estadosActividad);
  }

  setCiudades(i){
    // //////// ////// console.log('Got the selectedVendor as : ', i);
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

      //////// ////// console.log(r);
      this.coordsMap = r;
      this._globaConfig.spinner = false;
      if(Object.keys(this.coordsMap).length > 0 ){
        this.activateMap = true;
      // //////// ////// console.log('activado mapa', );
      }

      this._notifyService.Toast.fire({
        title: '¡Localización almacenada!',
        // text:'El navegador no soporta la geolocalización',
        icon: 'success'
        });

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
        title:'Validación de contraseña incorrecta',
        icon: 'error'
      });
      return;
    }

    if(this.altMapUrl != null && this.altMapUrl != ''){
      // //// ////// console.log('lo pone');
      this.coordsMap.mapUrl = this.altMapUrl;
    }

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
      economicActivity,
      forma.value.negocioName
      // forma.value.estadosActividad,
      );

      this._globaConfig.spinner = true;
//
          this._usuarioService.registroUsuarioPOST( usuario, null ,'natural' )
          .subscribe( resp => {

            this._globaConfig.spinner = false;

            let n = new _NotifyModel(
              "nAccountCreatedNoVerify",
              null,
              resp.data.user._id
            );
            this._notifyService.sendNotifyEmailPOST(n).subscribe((resp) => {
              //////// console.log('email enviado', resp);
            }, err => {
              //////// console.log('email error');

            });



            this._notifyService.swalNormal.fire({
              title: "¡Cuenta creada con exito!",
              text: "Ahora vamos a suscribir tus publicaciones",
              icon: "success",

              confirmButtonText: 'Aceptar'

            }).then( (result) => {
              this._usuarioService.guardarStorage(resp.data.user._id, resp.data.t, resp.data.user);
              this.router.navigate(['/dashboard/postControl']);
            });

            // forma.reset();
        }, ERR => {

              ////// console.log('los errores', ERR);

                // var err = data.error.message.errors{}.tipo.message
                let e = ERR.error.message.errors || null;
                if(e != null){

                  let errors: any = [];

                for (var [key, value] of Object.entries(e)) {
                  ////// console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
                  errors.push(value);
                }

                errors.forEach((element, idx) => {

                  this._notifyService.Toast.fire({
                    title: element.message ||'Algo ha salido mal, intente más tarde',
                    icon: "error",

                  });

                });

              }else{

                this._notifyService.Toast.fire({
                  title: 'Algo ha salido mal, intente más tarde',
                  icon: "error",

                });

              }

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

  var cphones = [

    {
      phonesCompany: (forma.value.PhoneFijoEmpresa != null && forma.value.PhoneFijoEmpresa != '')? forma.value.PhoneFijoEmpresa: null,
      typePhone: 'fijo'
    },
    {
      phonesCompany: (forma.value.PhoneCelular1 != null && forma.value.PhoneCelular1 != '')? forma.value.PhoneCelular1: null,
      typePhone: 'celular1'
    },
    {
      phonesCompany: (forma.value.PhoneCelular2 != null && forma.value.PhoneCelular2 != '')? forma.value.PhoneCelular2: null,
      typePhone: 'celular2'
    }

  ];





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

  //////// ////// console.log(usuario, 'envio company');
      this._globaConfig.spinner = true;
//
          this._usuarioService.registroUsuarioPOST( null, usuario ,'company' )
          .subscribe( resp => {
            //
            this._globaConfig.spinner = false;
  this._notifyService.swalNormal.fire({
              title: "¡Cuenta creada con exito!",
              text: "Ahora vamos a suscribir tus publicaciones",
              icon: "success",

              confirmButtonText: 'Aceptar'

            }).then( (result) => {
              this._usuarioService.guardarStorage(resp.data.user.id_user, resp.data.t, resp.data.user);
              this.router.navigate(['/dashboard/postControl']);
            });

            forma.reset();
          },
          ERR => {
            // var err = data.error.message.errors{}.tipo.message
            ////// console.log(ERR);
            let errors = ERR.error.message.errors;
            errors.forEach((ele, idx) => {
              ////// console.log('each', ele.message);
              this._notifyService.Toast.fire({
                title: ele.message || 'Algo ha salido mal, intente más tarde',
                icon: "error",
                // text: "Ahora vamos a suscribir tus publicaciones",
              });
            });

            this._globaConfig.spinner = false;

          });

}


  }





  welcomeMessage(type: string){


    switch (type) {
      case 'Persona natural':

        this._notifyService.swalNormal.fire({
          title: '¡Te damos la bienvenida al registro de usuario como Persona Natural de Mercado Pyme!',
          text: 'Llena los datos de nuestro formulario'
        })


        break;

        case 'Empresa':

          this._notifyService.swalNormal.fire({
            title: '¡Te damos la bienvenida al registro de usuario como Empresa de Mercado Pyme!',
            text: 'Llena los datos de nuestro formulario'
          })



        break;

      default:
        break;
    }
  }





  alEnviar(){


    this.enviado = true;

  }




  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

}
