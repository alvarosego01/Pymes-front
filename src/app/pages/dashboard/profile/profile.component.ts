import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NotifyService, GlobalConfigService, PostsService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

import { _UserModelNatural, _UserModelCompany

   } from 'src/app/models/models.index';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {


  usuarioInfo: any = [];

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

  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService
  ) {

    this.GlobalConfigService.setTitle('Perfil de usuario');

    ////// ////console.log(this.GlobalConfigService.tipoIdentificacion);

    this.email = this._usersService.usuario.email;
    this.gender = this._usersService.usuario.gender;
    this.identification = this._usersService.usuario.identification;
    this.typeId = this._usersService.usuario.typeId;
    this.name = this._usersService.usuario.name;
    this.surname = this._usersService.usuario.surname;
    this.phone = this._usersService.usuario.phone;
    this.year = this._usersService.usuario.year;
    this.ngPositionCompany = this._usersService.usuario.positionCompany;
    this.created_at = this._usersService.usuario.created_at;
    this.updated_at = this._usersService.usuario.updated_at;
    this.firstTime = this._usersService.usuario.firstTime;
    this.verify = this._usersService.usuario.verify;
    this.celPhone = this._usersService.usuario.celPhone;
    this.city = this._usersService.usuario.city;
    this.department = this._usersService.usuario.department;
    this.receiveEmail = this._usersService.usuario.receiveEmail;


    if(this._usersService.usuario.role == 'EMPRESA_ROLE' ){
      // ajustes pyme
      this.ngnameCompany = this._usersService.usuario._dataPyme.nameCompany;
      this.ngNIT = this._usersService.usuario._dataPyme.nit;
    this.ngReasons = this._usersService.usuario._dataPyme.socialReason;
    this.ngdirectionCompany = this._usersService.usuario._dataPyme.direction;
    this.companyPhonee = this._usersService.usuario._companyPhones;
    this.nrPhones = this._usersService.usuario._companyPhones.length;

    ////// ////console.log(this.companyPhonee);
  }


    ////// ////console.log('map',this._usersService.usuario._mapUrl);

    if(this._usersService.usuario._mapUrl != null){
      // ////////// ////console.log(this._usersService.usuario._mapUrl.mapUrl);
      var l = this._usersService.usuario._mapUrl;
      this.setMapUrl(l);


    }

    var dpPrev = this.GlobalConfigService.departamentos.find( d => d.departamento === this.department );

    this.ciudades = dpPrev.ciudades;





    for (var i = 0; i < this._usersService.usuario._naturalEconomicActivity.length; ++i) {
      this.estadosActividad.push(this._usersService.usuario._naturalEconomicActivity[i].typeActivity);
      ////////// ////console.log(this._usersService.usuario._naturalEconomicActivity[i].details);
      switch (this._usersService.usuario._naturalEconomicActivity[i].typeActivity) {
        case "Producción":
        ////////// ////console.log('fue produccion');
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

    ////// ////console.log(this._usersService.usuario);
    //// ////console.log(this._usersService.usuario._id);
    this.getStatsGeneral(this._usersService.usuario._id);

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

  ngOnInit(): void {

    // if((this._usersService.estaLogueado() == true)){



  // }
}


  clearFiles(){
    this.imagenSubir = null;
    this.imageName = 'Seleccionar';
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

  subirImagen(type = null, file = null) {


    if(this.imagenSubir == null){
      this._notifyService.Toast.fire({
        title: 'Debes seleccionar una imagen',
        // text: '',
        icon: 'warning'
      });
      return;
    }
    this.GlobalConfigService.spinner = true;

    this._usersService.changeFileUser( this.imagenSubir, type, file,this._usersService.usuario._id )
          .then( (resp) => {


            this.GlobalConfigService.spinner = false;
            this._notifyService.Toast.fire({
              title: 'La imagen ha sido cambiada',
              // text: 'El archivo no se pudo enviar',
              icon: 'success'
            });

            // ////////// ////console.log(resp['User']);
            // let r_id = resp._id;
            // let rUser = resp.User;
            this._usersService.guardarStorage( this._usersService.usuario._id , this._usersService.token, resp['User']);
            // this._usersService.usuario = resp.User;
          })
          .catch( err => {

            //////////// ////console.log(err);

            this.GlobalConfigService.spinner = false;
            this._notifyService.Toast.fire({
              title: 'Algo salió mal',
              text: 'El archivo no se pudo enviar',
              icon: 'error'
            });
          });

  }






  userRegister(forma: NgForm, type) {

}



  activateEconomicActivity(){
    // this.estadosActividad[e] = !this.estadosActividad[e];
    ////////// ////console.log(this.estadosActividad);
  }

  setCiudades(i){
    // ////////// ////console.log('Got the selectedVendor as : ', i);
    // return;
    let k = JSON.parse(i);
    k = k.id;
    i = k;
    let dp = this.GlobalConfigService.departamentos;
    this.ciudades = dp[i].ciudades;
    this.department = dp[i].departamento;
  }




  getStatsGeneral(id){

    this.GlobalConfigService.spinner = true;
    this._postService.getStatsGeneralGET(id).subscribe((resp) => {
      // ////// ////console.log(resp);

      if (resp.status == 200 && resp.ok == true) {


        // this.statsGeneral = resp.data;
        this.usuarioInfo.statsGeneral  = resp.data
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



  async captrarLocalizacion(){


    let x = this._usersService.getLocation();

    this.GlobalConfigService.spinner = true;
    this.activateMap = false
   //  this._usuarioService.promiseTimeout(5000, x);
     x.then(r => {

       ////////// ////console.log(r);
       this.coordsMap = r;
       this.GlobalConfigService.spinner = false;
       if(Object.keys(this.coordsMap).length > 0 ){
         this.activateMap = true;
       // ////////// ////console.log('activado mapa', );
       }
     }, err => {
       this.GlobalConfigService.spinner = false;
       this._notifyService.Toast.fire({
         title: 'Lo sentimos',
         text:'No pudimos encontrar tu localización',
         icon: 'error'
       });

     });



  }


  permitId(type: string){

    this.idType = type;

  }



userModifyAccount(forma: NgForm, type){

    if(this._usersService.usuario.role == 'ADMIN_ROLE' ){



      let usuario = new _UserModelNatural(

        '',
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
        '',
       '',
       '',
       this._usersService.usuario.role,
       []
       // forma.value.estadosActividad,
       );

              ////////// ////console.log(usuario,'conformado');

              this.GlobalConfigService.spinner = true;
              //
                        this._usersService.updateUserPUT( usuario, null , 'natural' )
                        .subscribe( resp => {
              //
                          this.GlobalConfigService.spinner = false;

                          // ////////// ////console.log(resp);
                          // return;
                          // forma.reset();
                           // this._usersService.guardarStorage( this._usersService.usuario._id , this._usersService.token, resp['User']);
                      }, ERR => {
                        ////////// ////console.log(ERR);
                        this.GlobalConfigService.spinner = false;
                      });




    }


    if(this._usersService.usuario.role == 'CLIENTE_ROLE' ){


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

       '',
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


       ////////// ////console.log(usuario,'conformado');

          this.GlobalConfigService.spinner = true;
//
          this._usersService.updateUserPUT( usuario, null , 'natural' )
          .subscribe( resp => {
//
            this.GlobalConfigService.spinner = false;

            // ////////// ////console.log(resp);
            // return;
            // forma.reset();
             // this._usersService.guardarStorage( this._usersService.usuario._id , this._usersService.token, resp['User']);
        }, ERR => {
          ////////// ////console.log(ERR);
          this.GlobalConfigService.spinner = false;
        });



}
    if(this._usersService.usuario.role == 'EMPRESA_ROLE'){

      // ////// ////console.log('ngPositionCompany', this.ngPositionCompany);


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


       let usuario = new _UserModelCompany(

       '',
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
       this.ngPositionCompany,
       this.coordsMap,
      '',
      this._usersService.usuario.role,
      {},
      [],
      economicActivity
      // forma.value.estadosActividad,
      );


       //////// ////console.log(usuario,'conformado');

          this.GlobalConfigService.spinner = true;
//
          this._usersService.updateUserPUT( null, usuario ,'company' )
          .subscribe( resp => {
//
            this.GlobalConfigService.spinner = false;

            // ////////// ////console.log(resp);
            // return;
            // forma.reset();
             // this._usersService.guardarStorage( this._usersService.usuario._id , this._usersService.token, resp['User']);
        }, ERR => {
          ////// ////console.log(ERR);
          this.GlobalConfigService.spinner = false;
        });



}


}


newEmailRequest(p: NgForm){

  this._notifyService.swalNormal.fire({
    title: "Correo eléctronico cambiado",
    text: "Debes confirmarlo accediendo a la bandeja bandeja de entrada de tu nuevo correo",
    icon: "info",

    confirmButtonText: 'Aceptar'

  }).then((result) => {
    // this.router.navigate(['/us']);

    this._notifyService.Toast.fire({
      title: 'Confirmación enviada',
      icon: 'success'
    });

  });




}


newPassRequest(){

    this._notifyService.swalNormal.fire({
          title: "¿Necesitas cambiar de contraseña?",
          text: "Te enviaremos los pasos a través de correo eléctronico ",
          icon: "info",

          confirmButtonText: 'Enviar'

        }).then((result) => {
          // this.router.navigate(['/us']);

          this._notifyService.Toast.fire({
            title: 'Correo enviado',
            icon: 'success'
          });

        });

}
deleteAccountRequest(){

  this._notifyService.swalNormal.fire({
    title: "¿Necesitas eliminar tu cuenta?",
    text: "Te enviaremos los pasos a través de correo eléctronico ",
    icon: "info",

    confirmButtonText: 'Enviar'

  }).then((result) => {
    // this.router.navigate(['/us']);

    this._notifyService.Toast.fire({
      title: 'Solicitud enviada',
      icon: 'success'
    });

  });



}


userModifyPymeData(forma: NgForm){

    // let e = [];
    var _dataPyme = {
      nameCompany: this.ngnameCompany,
      nit: this.ngNIT,
      socialReason: this.ngReasons,
      direction: this.ngdirectionCompany,
    }

    // e.push['_dataPyme'] = _dataPyme;


    var cphones = [];
    for (let index = 0; index < this.companyPhonee.length; index++) {
      // var element = this.companyPhonee[index];
      var ccc = {
        phonesCompany: this.companyPhonee[index].phonesCompany
      }
      cphones.push(ccc);

    }

    // ////// ////console.log(cphones);
// return;

    let usuario = new _UserModelCompany(

      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
     '',
     this._usersService.usuario.role,
     _dataPyme,
     cphones
     // forma.value.estadosActividad,
     );


      //  ////// ////console.log(usuario,'conformado');

       this.GlobalConfigService.spinner = true;
       //
                 this._usersService.updateCompanyDataPUT( usuario )
                 .subscribe( resp => {
       //
                   this.GlobalConfigService.spinner = false;

                   // ////////// ////console.log(resp);
                   // return;
                   // forma.reset();
                    // this._usersService.guardarStorage( this._usersService.usuario._id , this._usersService.token, resp['User']);
               }, ERR => {
                 ////// ////console.log(ERR);
                 this.GlobalConfigService.spinner = false;
               });



}


addPhone(type = null){
  if(type == null){
    var l = {
      phonesCompany: ''
    }
    this.companyPhonee.push(l);
  }
  if(type == 'delete' && this.companyPhonee.length > 1){

    this.companyPhonee.pop();
  }
}






}