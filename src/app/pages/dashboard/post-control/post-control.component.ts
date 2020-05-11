import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { _PostModel } from 'src/app/models/postModel';
import { NotifyService, _globalConfig,
  //  PostsService
  } from 'src/app/services/service.index';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-control',
  templateUrl: './post-control.component.html',
  styleUrls: ['./post-control.component.sass']
})
export class PostControlComponent implements OnInit {


  test = 1;


  imagenSubir: File;
  imagenesSubir = [];
  imagenTemp: any;
  imageName: string = 'Seleccionar';


  typeAdjuntos = '3 Fotos';
  nroFotos: number = 3;
  urlFiles = []

  estadosActividad: any = [];
  mapUrl: string = '';
  mapElement:any;
  ciudades:any = [];
  idc: number = 0;
  autoDataContact = true;
  publications = [];


  cityTargets: any = [];




  coordsMap:any = {};
  activateMap = false

  subCategory = [];

Min: number;
Max: number;


ngPhone = this._usersService.usuario.phone;
ngcelPhone = this._usersService.usuario.celPhone;
// ngDepartment = this._usersService.usuario.department;
ngCity = this._usersService.usuario.city;
ngEmail = this._usersService.usuario.email;
ngDepartment = '';

  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public _globalConfig: _globalConfig,
    public _postService: PostsService
  ) {


    this._usersService.setCaptcha();
    // this.datosUsuario = this._usersService.usuario;
    // //console.log(this.datosUsuario);

    // //console.log(this._postService.categoryPrincipal);
    this.initCitys();


  }




  ngOnInit(): void {

  }

  deleteCityTarget(i){
    this.cityTargets.splice(i, 1);
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



  addCityTarget(){

    if(this.ngCity != ''){


    var l = {
     department: JSON.parse(this.ngDepartment).departamento,
     city: this.ngCity,
    }

    this.cityTargets.push(l);
    // this.ngDepartment =
    this.ngCity = '';
  }else{
    this._notifyService.Toast.fire({
      title: 'Debes seleccionar una ciudad',
      // text: 'El archivo seleccionado no es una imagen',
      icon: 'error'
    });
    return;

  }
  }

   deleteSelected(i = 0){

    this.urlFiles.indexOf(i) > -1 ? this.urlFiles.splice(this.urlFiles.indexOf(i), 1) : false
    this._notifyService.Toast.fire({
      title: 'Imagen retirada',
      // text: 'El archivo seleccionado no es una imagen',
      icon: 'success'
    });

    if(i == 0){
      this.urlFiles = [];
      this._notifyService.Toast.fire({
      title: 'Archivo retirado',
      // text: 'El archivo seleccionado no es una imagen',
      icon: 'success'
    });

    }
  }


  muestraMap(){

    return;
  }

  clearFiles(){

    this.urlFiles = [];
    this.imagenesSubir = [];

      if(this.typeAdjuntos == '3 Fotos' ){
        this.nroFotos = 3;

      }

      if(this.typeAdjuntos == '6 Fotos' ){
        this.nroFotos = 6;
     }
        if(this.typeAdjuntos == '12 Fotos'){

          this.nroFotos = 12;

        }

     if(this.typeAdjuntos == 'Catálogo PDF' ){
       this.nroFotos = 1;

    }
  }

 selectFiles(event){

    //console.log(event.target.files);
    if(event.target.files){

      for (let index = 0; index < File.length; index++) {

        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[index]);
        var fileup = event.target.files[index];
        reader.onload = (event:any) => {
          var image = new Image();
          image.src = event.target.result;

          if ( event.target.result.indexOf('image') < 0 && this.typeAdjuntos != 'Catálogo PDF') {

            // this.imagenSubir = null;
            this._notifyService.Toast.fire({
              title: 'Solo imágenes',
              text: 'El archivo seleccionado no es una imagen',
              icon: 'error'
            });
            return;
          }
          if ( event.target.result.indexOf('PDF') < 0 && this.typeAdjuntos == 'Catálogo PDF') {

            // this.imagenSubir = null;
            this._notifyService.Toast.fire({
              title: 'Solo PDF',
              text: 'El archivo seleccionado no es una archivo PDF',
              icon: 'error'
            });
            return;
          }

          if(this.typeAdjuntos != 'Catálogo PDF'){

          // return;
          var x = new Promise((resolve,reject) => {

            image.onload = function() {
              //console.log('datos de imagn',image);
                var k = [image.width, image.height];
                resolve(k);
            };
          })

           x.then(r => {

            if(this.urlFiles.length+1 > this.nroFotos ){
                 this._notifyService.Toast.fire({
              title: 'Limite de imágenes',
              text: `Solo puedes seleccionar ${this.nroFotos} imágenes`,
              icon: 'error'
            });
            return;
            }
            if(r[0] == 500 && r[1] == 500){
              this.urlFiles.push(event.target.result);
              this.imagenesSubir.push(fileup);
              //console.log(this.imagenesSubir, 'imgsubir');
              //console.log(this.urlFiles, 'urlfiles');
            }else{
              this._notifyService.Toast.fire({
                title:'Dimensiones no permitidas',
                text: 'Solo se permiten imagenes de 500x500 de tamaño',
                icon: 'error'
              });
            }
          },
          re => {});

          }

        if(this.typeAdjuntos == 'Catálogo PDF'){
          //console.log('archivo', reader);
           // return;

                if(this.urlFiles.length+1 > this.nroFotos ){
                 this._notifyService.Toast.fire({
                    title: 'Limite de archivo',
                    text: `Solo puedes seleccionar ${this.nroFotos} PDF`,
                    icon: 'error'
                  });
                  return;
              }
              this.urlFiles.push(event.target.result);
              //console.log(this.urlFiles, 'los datos');
              //console.log(event.target.result, 'los datos');

        }

      }


      }
    }
    //console.log(this.urlFiles)
  }


  initCitys(){

    for (let index = 0; index < this._globalConfig.departamentos.length; index++) {

      var element = this._globalConfig.departamentos[index];
      var cd = this._globalConfig.departamentos[index].ciudades;
      if(element.departamento == this.ngDepartment){
        // this.citiesTarget = cd;
        this.ciudades = cd;
      }

    }

  }


  activateDataUser(e){
    this.autoDataContact = !this.autoDataContact;

    if(this.autoDataContact == true){

this.ngPhone = this._usersService.usuario.phone;
this.ngcelPhone = this._usersService.usuario.celPhone;
this.ngDepartment = this._usersService.usuario.department;
this.ngCity = this._usersService.usuario.city;
this.ngEmail = this._usersService.usuario.email;

this.initCitys();

    }
  }


  activateEconomicActivity(){
    // this.estadosActividad[e] = !this.estadosActividad[e];
    //console.log(this.estadosActividad);
  }

  setCiudades(i){

    let k = JSON.parse(i);
    i = k.id;
    // let c =k.ciudades
    let dp = this._globalConfig.departamentos;
    this.ciudades = dp[i].ciudades;

  }


  setSubCategory(i){
    let k = JSON.parse(i);
    let p = k.base;
    let c = k.child;
    // console.log(i);
    // return;
    // //console.log(this._postService.categoryPrincipal[i]);
    this.subCategory = c;

    if(this.subCategory.length == 0){
      this.subCategory = ['Sin sub categoría'];
    }

    // return;
    // let k = JSON.parse(i);
    // k = k.id;
    // i = k;
    // let dp = this._globalConfig.departamentos;
    // this.ciudades = dp[i].ciudades;
//

  }


  getMyPublications(){

    this._globalConfig.spinner = true;

    this._postService.getMyPublications().subscribe( resp => {

      this.publications = resp.data;


      this._globalConfig.spinner = false;
      // ////console.log(this.listasPerros);
    });
  }

  createPublication(forma: NgForm){

if(this.cityTargets.length == 0){
  this._notifyService.Toast.fire({
    title:'Debes seleccionar al menos una ciudad en donde estará tu servicio',
    icon: 'error'
  });
  return;
}

if(forma.value.Min > forma.value.Max){
   this._notifyService.Toast.fire({
    title:'Rango de precio incorrecto',
    icon: 'error'
  });
  return;
}
if (forma.invalid){
  this._notifyService.Toast.fire({
    title:'Datos invalidos',
    icon: 'error'
  });
  return;
}
if(forma.value.captcha != this._usersService.captcha[2]) {
  this._notifyService.Toast.fire({
    title:'Captcha incorrecto',
    icon: 'error'
  });
  return;
}

  var cat = {
    principal: forma.value.Category,
    child: forma.value.subCategory,
  }

  var precio = {
    min: forma.value.Min,
    max: forma.value.Max
  }

  var social = {
    facebook: forma.value.redFacebook,
    whatsapp: forma.value.redWhatsapp,
    instagram: forma.value.redInstagram,
    web: forma.value.redWeb
  }
  let post = {

    title: forma.value.Title,
    target: forma.value.targetPublication,
    content: forma.value.IncludeDesc,
    notContent: forma.value.notIncludeDesc,
    days: '30',
    mapUrl: forma.value.mapUrl,
    // dir: forma.value.directionCompany,
    // department: this.ngDepartment,
    // city: this.ngCity,
    type: forma.value.Type,
    _category: JSON.stringify(cat),
    _rangoPrize: JSON.stringify(precio),
    _cityTarget: JSON.stringify(this.cityTargets),
    _socialNet: JSON.stringify(social),
    _mapUrl: JSON.stringify(this.coordsMap),
    // _files:
  }

  // console.log(post);
  // return;
  this._globalConfig.spinner = true;
  this._postService.createPublication( post ,this.imagenesSubir )
        .then( (resp) => {

          this._globalConfig.spinner = false;
          // this._notifyService.Toast.fire({
          //   title: 'La publicación ha sido creada con exito',
          //   // text: 'El archivo no se pudo enviar',
          //   icon: 'success'
          // });
          this._notifyService.swalNormal.fire(
            'Publicación creada con exito',
            'Gracias por participar y pautar con nosotros, muy pronto estarás a la vista de todos',
            'success'
          );
          // forma.reset();
          this.imageName = 'Seleccionar';
          this.imagenSubir = null;
          this.imagenTemp = null;
          // this._usersService.usuario = resp.User;
          //console.log(resp);
        })
        .catch( err => {
          let e = JSON.parse(err);
          ////console.log(e);
          if(e.status == 201 && e.ok == true){
            this._globalConfig.spinner = false;
            // this._notifyService.Toast.fire({
              // title: 'La publicación ha sido creada con exito',
              // text: 'El archivo no se pudo enviar',
              // icon: 'success'
            // });
            this._notifyService.swalNormal.fire(
              '¡Publicación creada con exito!',
              'Gracias por participar y pautar con nosotros, muy pronto estarás a la vista de todos',
              'success'
            );
            // forma.reset();
            this.imageName = 'Seleccionar';
            this.imagenTemp = null;
            this.imagenSubir = null;
          }else{

            this._globalConfig.spinner = false;
          this._notifyService.Toast.fire({
            title: 'Algo ha salido mal',
            text: 'Intente más tarde por favor',
            icon: 'error'
          });
        }

        });


  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {

      this.imagenSubir = null;
      this._notifyService.Toast.fire({
        title: 'Solo imágenes',
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
    this.imageName = this.imagenSubir.name;
  }

}

