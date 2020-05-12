import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NotifyService, _globalConfig } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

import { _UserModelNatural, _UserModelCompany

   } from 'src/app/models/models.index';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: any;

  imageName = 'Seleccionar';

  role: string = '';


  // para los formularios
   ciudades = [];
  idc: number = 0;

  estadosActividad: any = [];
  mapUrl: string = '';
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
positionCompany: string;
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

    // "_id" : ObjectId("5eb9c2ce6f8b6c204c608d3b"),
    // "positionCompany" : "",
    // "receiveEmail" : true,
    // "termsCondition" : true,
    // "imgProfile" : "5eb9c2ce6f8b6c204c608d3b-808.jpg",
    // "role" : "CLIENTE_ROLE",
    // "preference" : [],
    // "status" : true,
    // "created_at" : "Monday 11th May 2020 03:51:11 pm",
    // "updated_at" : null,
    // "firstTime" : true,
    // "verify" : false,
    // "celPhone" : "+4249134074",
    // "city" : "Sabanalarga",
    // "department" : "Casanare",
    // "email" : "alvarosego01@gmail.com",
    // "gender" : "Masculino",
    // "identification" : "24033025",
    // "name" : "Alvaro",
    // "pass" : "$2a$10$uTsp6lA1Pe43MvybYaaDle4p2Ool6trs/UXlcZz2Fada7GU6jA1.q",
    // "phone" : "+4249134074",
    // "surname" : "Segovia",
    // "typeId" : "Cédula de ciudadania",
    // "year" : 27,
    // "_mapUrl" : {
        // "longitude" : "-62.7186",
        // "latitude" : "8.2981",
        // "mapUrl" : "https://maps.google.com/maps?q=8.2981,-62.7186&hl=es;z=14&output=embed",
        // "_id" : ObjectId("5eb9c2ce6f8b6c204c608d3c")
    // },
    // "_naturalEconomicActivity" : [
        // {
            // "typeActivity" : "Producción",
            // "details" : "dsfdsf",
            // "_id" : ObjectId("5eb9c2ce6f8b6c204c608d3d")
        // }
    // ],
    // "_companyPhones" : [],
    // "__v" : 0



  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public _globalConfig: _globalConfig
  ) {



    this.email = this._usersService.usuario.email;
    this.gender = this._usersService.usuario.gender;
    this.identification = this._usersService.usuario.identification;
    this.typeId = this._usersService.usuario.typeId;
    this.name = this._usersService.usuario.name;
    this.surname = this._usersService.usuario.surname;
    this.phone = this._usersService.usuario.phone;
    this.year = this._usersService.usuario.year;
    this.positionCompany = this._usersService.usuario.positionCompany;
    this.created_at = this._usersService.usuario.created_at;
    this.updated_at = this._usersService.usuario.updated_at;
    this.firstTime = this._usersService.usuario.firstTime;
    this.verify = this._usersService.usuario.verify;
    this.celPhone = this._usersService.usuario.celPhone;
    this.city = this._usersService.usuario.city;
    this.department = this._usersService.usuario.department;
    this.receiveEmail = this._usersService.usuario.receiveEmail;

    // console.log(this.name);

    // console.log(this._globalConfig.departamentos);

    if(this._usersService.usuario._mapUrl != null){
      // console.log(this._usersService.usuario._mapUrl.mapUrl);
      this.coordsMap = this._usersService.usuario._mapUrl;
      this.activateMap = true;

      // console.log(this._usersService.usuario._mapUrl);
    }

    var dpPrev = this._globalConfig.departamentos.find( d => d.departamento === this.department );

    this.ciudades = dpPrev.ciudades;





    for (var i = 0; i < this._usersService.usuario._naturalEconomicActivity.length; ++i) {
      this.estadosActividad.push(this._usersService.usuario._naturalEconomicActivity[i].typeActivity);
      console.log(this._usersService.usuario._naturalEconomicActivity[i].details);
      switch (this._usersService.usuario._naturalEconomicActivity[i].typeActivity) {
        case "Producción":
        console.log('fue produccion');
        this.ProduccionActivity = this._usersService.usuario._naturalEconomicActivity[i].details;
        break;
        case "Comercialización":
        this.ComercializacionActivity = this._usersService.usuario._naturalEconomicActivity[i].details;
        break;
        case "Servicios":
        this.ServiciosActivity = this._usersService.usuario._naturalEconomicActivity[i].details;
        break;
        case "Otro":
        this.OtroActivity = this._usersService.usuario._naturalEconomicActivity[i].details;
        break;
        default:
          // code...
          break;
      }
    }

    console.log(this.estadosActividad);

  }

  ngOnInit(): void {

  }



  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {

      this.imagenSubir = null;
      this._notifyService.Toast.fire({
        title: 'Sólo imágenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

    this._notifyService.Toast.fire({
      title: 'Archivo valido',
      // text: '',
      icon: 'success'
    });

    this.imageName = archivo.name;

  }

  subirImagen(type = null) {


    if(this.imagenSubir == null){
      this._notifyService.Toast.fire({
        title: 'Debes seleccionar una imagen',
        // text: '',
        icon: 'warning'
      });
      return;
    }
    this._globalConfig.spinner = true;

    this._usersService.changeFileUser( this.imagenSubir, type, this._usersService.usuario._id )
          .then( (resp) => {


            this._globalConfig.spinner = false;
            this._notifyService.Toast.fire({
              title: 'La imagen ha sido cambiada',
              // text: 'El archivo no se pudo enviar',
              icon: 'success'
            });

            // console.log(resp['User']);
            // let r_id = resp._id;
            // let rUser = resp.User;
            this._usersService.guardarStorage( this._usersService.usuario._id , this._usersService.token, resp['User']);
            // this._usersService.usuario = resp.User;
          })
          .catch( err => {

            //console.log(err);

            this._globalConfig.spinner = false;
            this._notifyService.Toast.fire({
              title: 'Algo salió mal',
              text: 'El archivo no se pudo enviar',
              icon: 'error'
            });
          });

  }


  actualizarPerfil(forma: NgForm){

  }




  userRegister(forma: NgForm, type) {

}



  activateEconomicActivity(){
    // this.estadosActividad[e] = !this.estadosActividad[e];
    console.log(this.estadosActividad);
  }

  setCiudades(i){
    // console.log('Got the selectedVendor as : ', i);
    // return;
    let k = JSON.parse(i);
    k = k.id;
    i = k;
    let dp = this._globalConfig.departamentos;
    this.ciudades = dp[i].ciudades;
    this.department = dp[i].departamento;
  }


  async captrarLocalizacion(){
   let x = this._usersService.getLocation();

   this._globalConfig.spinner = true;
   this.activateMap = false
    await x.then(r => {

      console.log(r);
      this.coordsMap = r;
      this._globalConfig.spinner = false;
      if(Object.keys(this.coordsMap).length > 0 ){
        this.activateMap = true;
      // console.log('activado mapa', );
      }
    });


  }


  permitId(type: string){

    this.idType = type;

  }



userModifyAccount(forma: NgForm, type){

    if(type == 'natural'){


     let  economicActivity:any[] = [];

      for (let index = 0; index < this.estadosActividad.length; index++) {
        let element = this.estadosActividad[index];

        switch (element) {

        case 'Producción':
          var i = this.ProduccionActivity;
          var l = {
            typeActivity: element,
          details: i

          }
          economicActivity.push(l);
          // upp = ProducciónActivity;
        break;
        case 'Comercialización':
          var i = this.ComercializacionActivity;

          var l = {
          typeActivity: element,
          details: i
        }
          economicActivity.push(l);
          // upp = ComercializaciónActivity;
        break;
        case 'Servicios':
          var i = this.ServiciosActivity;

          var l = {
          typeActivity: element,
          details: i
        }
          economicActivity.push(l);
          // upp = ServiciosActivity;
        break;
        case 'Otro':
          var i = this.OtroActivity;

          var l = {
          typeActivity: element,
          details: i
        }
          economicActivity.push(l);
          // upp = OtroActivity;
        break;
        }

      }


       let usuario = new _UserModelNatural(

       this.email,
       this.name,
       this.surname,
       this.year,
       '',
       this.gender,
       this.typeId,
       this.identification,
       this.phone,
       this.celPhone,
       this.department,
       this.city,
       '',
       this.coordsMap,
      '',
      '',
      this._usersService.usuario.role,
      economicActivity
      // forma.value.estadosActividad,
      );


       console.log(usuario,'conformado');

          this._globalConfig.spinner = true;
//
          this._usersService.updateUserPUT( usuario, null ,'natural' )
          .subscribe( resp => {
//
            this._globalConfig.spinner = false;

            // console.log(resp);
            // return;
            // forma.reset();
             // this._usersService.guardarStorage( this._usersService.usuario._id , this._usersService.token, resp['User']);
        }, ERR => {
          console.log(ERR);
          this._globalConfig.spinner = false;
        });



}


}


}