import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { _PostModel } from "src/app/models/postModel";
import {PostsService} from '../../../services/posts.service';
import {
  NotifyService,
  _globalConfig,
  //  PostsService
} from "src/app/services/service.index";
import { Filebase64Service } from 'src/app/services/filebase64.service';
// import { PostsService } from "src/app/services/posts.service";

@Component({
  selector: "app-post-control",
  templateUrl: "./post-control.component.html",
  styleUrls: ["./post-control.component.sass"],
})
export class PostControlComponent implements OnInit {
  test = 1;

  imagenSubir: File;
  imagenesSubir = [];
  imagenTemp: any;
  imageName: string = "Seleccionar";

  ngTypeAdjuntos = "3 Fotos";
  nroFotos: number = 3;
  urlFiles = [];

  estadosActividad: any = [];
  mapUrl: string = "";
  mapElement: any;
  ciudades: any = [];
  idc: number = 0;
  autoDataContact = true;
  publications = [];

  cityTargets: any = [];

  ngNewCategory: string = null;

  coordsMap: any = {};
  activateMap = false;

  subCategory = [];

  Min: number;
  Max: number;

  altMapUrl: string = null;

  ngPhone = this._usersService.usuario.phone;
  ngcelPhone = this._usersService.usuario.celPhone;
  // ngDepartment = this._usersService.usuario.department;
  ngCity = this._usersService.usuario.city;
  ngEmail = this._usersService.usuario.email;
  ngDepartment = "";

  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public _globalConfig: _globalConfig,
    public _postService: PostsService,
    public _fileBase64: Filebase64Service,
    public router: Router,
  ) {
    // this._usersService.setCaptcha();
    // this.datosUsuario = this._usersService.usuario;
    // //////console.log(this.datosUsuario);

    // //////console.log(this._postService.categoryPrincipal);
    this.initCitys();
  }

  ngOnInit(): void {}

  deleteCityTarget(i) {
    this.cityTargets.splice(i, 1);
  }

  async captrarLocalizacion() {
    let x = this._usersService.getLocation();

    this._globalConfig.spinner = true;
    this.activateMap = false;
    x.then((r) => {
      ////console.log(r);
      this.coordsMap = r;
      this._globalConfig.spinner = false;
      if (Object.keys(this.coordsMap).length > 0) {
        this.activateMap = true;
        // ////console.log('activado mapa', );
      }
    }, err => {
      this._globalConfig.spinner = false;
      this._notifyService.Toast.fire({
        title: 'Lo sentimos',
        text:'No pudimos encontrar tu localización',
        icon: 'error'
      });

    });


  }

  addCityTarget() {
    if (this.ngCity != "") {
      var l = {
        department: JSON.parse(this.ngDepartment).departamento,
        city: this.ngCity,
      };

      this.cityTargets.push(l);
      // this.ngDepartment =
      this.ngCity = "";
    } else {
      this._notifyService.Toast.fire({
        title: "Debes seleccionar una ciudad",
        // text: 'El archivo seleccionado no es una imagen',
        icon: "error",
      });
      return;
    }
  }

  deleteSelected(i = 0, type = null) {
    // this.urlFiles.indexOf(i) > -1
      // ? this.urlFiles.splice(this.urlFiles.indexOf(i), 1)
      // : false;
    // this.imagenesSubir.indexOf(i) > -1
      // ? this.imagenesSubir.splice(this.imagenesSubir.indexOf(i), 1)
      // : false;
      this.urlFiles.splice(i, 1);
      this.imagenesSubir.splice(i, 1);

      // delete this.urlFiles[i];
      // delete this.imagenesSubir[i];

      ////console.log(i);

      ////console.log('al retirar');
      ////console.log(this.urlFiles);
      ////console.log(this.imagenesSubir);


    this._notifyService.Toast.fire({
      title: "Elemento retirado",
      // text: 'El archivo seleccionado no es una imagen',
      icon: "success",
    });

    if (i == 0 && type == 'pdf') {
      this.urlFiles = [];
      this.imagenesSubir = [];
      this._notifyService.Toast.fire({
        title: "Archivo retirado",
        // text: 'El archivo seleccionado no es una imagen',
        icon: "success",
      });


    }
  }

  muestraMap() {
    return;
  }

  clearFiles(event) {
    this.urlFiles = [];
    this.imagenesSubir = [];
    //console.log('clear!');

    if (this.ngTypeAdjuntos == "3 Fotos") {
      this.nroFotos = 3;
    }

    if (this.ngTypeAdjuntos == "6 Fotos") {
      this.nroFotos = 6;
    }
    if (this.ngTypeAdjuntos == "12 Fotos") {
      this.nroFotos = 12;
    }

    if (this.ngTypeAdjuntos == "Catálogo PDF") {
      this.nroFotos = 1;
    }

    //console.log(this.ngTypeAdjuntos);
  }

  initCitys() {
    for (
      let index = 0;
      index < this._globalConfig.departamentos.length;
      index++
    ) {
      var element = this._globalConfig.departamentos[index];
      var cd = this._globalConfig.departamentos[index].ciudades;
      if (element.departamento == this.ngDepartment) {
        // this.citiesTarget = cd;
        this.ciudades = cd;
      }
    }
  }

  activateDataUser(e) {
    this.autoDataContact = !this.autoDataContact;

    if (this.autoDataContact == true) {
      this.ngPhone = this._usersService.usuario.phone;
      this.ngcelPhone = this._usersService.usuario.celPhone;
      this.ngDepartment = this._usersService.usuario.department;
      this.ngCity = this._usersService.usuario.city;
      this.ngEmail = this._usersService.usuario.email;

      this.initCitys();
    }
  }

  activateEconomicActivity() {
    // this.estadosActividad[e] = !this.estadosActividad[e];
    //////console.log(this.estadosActividad);
  }

  setCiudades(i) {
    let k = JSON.parse(i);
    i = k.id;
    // let c =k.ciudades
    let dp = this._globalConfig.departamentos;
    this.ciudades = dp[i].ciudades;
  }

  setSubCategory(i) {
    let k = JSON.parse(i);
    let p = k.base;
    let c = k.child;
    // ////console.log(i);
    // return;
    // //////console.log(this._postService.categoryPrincipal[i]);
    this.subCategory = c;

    if (this.subCategory.length == 0) {
      this.subCategory = ["Sin sub categoría"];
    }

    // return;
    // let k = JSON.parse(i);
    // k = k.id;
    // i = k;
    // let dp = this._globalConfig.departamentos;
    // this.ciudades = dp[i].ciudades;
    //
  }

  getMyPublications() {
    this._globalConfig.spinner = true;

    this._postService.getMyPublications().subscribe((resp) => {
      this.publications = resp.data;

      this._globalConfig.spinner = false;
      // ////////console.log(this.listasPerros);
    });
  }

  setSubCategoryOther(e) {
    ////console.log(e);

    this.ngNewCategory = e == "Otra" ? e : null;
  }

  createPublication(forma: NgForm) {
    ////console.log(forma.value, " el envio de post");

    ////console.log(this.coordsMap);

    if(this.imagenesSubir.length == 0){
          this._notifyService.Toast.fire({
        title:
          "Debes seleccionar al menos un archivo",
        icon: "error",
      });
      return;
    }

    if (this.cityTargets.length == 0) {
      this._notifyService.Toast.fire({
        title:
          "Debes seleccionar al menos una ciudad en donde estará tu servicio",
        icon: "error",
      });
      return;
    }

    if (forma.value.Min > forma.value.Max) {
      this._notifyService.Toast.fire({
        title: "Rango de precio incorrecto",
        icon: "error",
      });
      return;
    }
    if (forma.invalid) {
      this._notifyService.Toast.fire({
        title: "Datos invalidos",
        icon: "error",
      });
      return;
    }
    // if (forma.value.captcha != this._usersService.captcha[2]) {
    //   this._notifyService.Toast.fire({
    //     title: "Captcha incorrecto",
    //     icon: "error",
    //   });
    //   return;
    // }

       if( this.altMapUrl != null && this.altMapUrl != ''){
      this.coordsMap.mapUrl = this.altMapUrl;
    }

    var contactData = {
      email: this.ngEmail,
      phone: this.ngPhone,
      celPhone: this.ngcelPhone,
    };

    var cat = {
      principal: JSON.parse(forma.value.Category).base,
      child:
        forma.value.subCategory == "Otra"
          ? this.ngNewCategory
          : forma.value.subCategory,
    };

    var precio = {
      min: forma.value.Min,
      max: forma.value.Max,
    };

    var social = {
      facebook: forma.value.redFacebook,
      whatsapp: forma.value.redWhatsapp,
      instagram: forma.value.redInstagram,
      web: forma.value.redWeb,
    };
    let post = {
      title: forma.value.Title,
      target: forma.value.targetPublication,
      content: forma.value.IncludeDesc,
      notContent: forma.value.notIncludeDesc,
      days: "30",
      type: forma.value.Type,
      _infoContact: JSON.stringify(contactData),
      _category: JSON.stringify(cat),
      _rangoPrize: JSON.stringify(precio),
      _cityTarget: JSON.stringify(this.cityTargets),
      _socialNet: JSON.stringify(social),
      _mapUrl: JSON.stringify(this.coordsMap),
      // _target: JSON.stringify(this.);
      // _files:
    };

    // ////console.log(post, "conformado");
    // return;
    ////console.log('imagenes en total', this.imagenesSubir);
    this._globalConfig.spinner = true;
    this._postService
      .createPublication(post, this.imagenesSubir)
      .then((resp) => {
        this._globalConfig.spinner = false;
        // this._notifyService.Toast.fire({
        //   title: 'La publicación ha sido creada con exito',
        //   // text: 'El archivo no se pudo enviar',
        //   icon: 'success'
        // });
        this._notifyService.swalNormal.fire({

          title: "¡Publicación creada con exito!",
          text: "¡Gracias por participar y pautar con nosotros, desde el próximo 1 de junio, en nuestro gran lanzamiento, estarás a la vista de todos!",
          icon: "success",
          confirmButtonText: 'Aceptar'

        }).then((result) => {
          this.router.navigate(['/us']);
        });


        // forma.reset();
        this.imageName = "Seleccionar";
        this.imagenSubir = null;
        this.imagenTemp = null;
        this.imagenesSubir = [];
        this.urlFiles = [];
        // this._usersService.usuario = resp.User;
        ////console.log('por true', resp);
        this._postService.notificacion.emit( resp );
      })
      .catch((e) => {
        ////console.log('por error',e);
        ////////console.log(e);
        // var error = JSON.parse(e)
        if (e.status == 201 && e.ok == true) {
          this._globalConfig.spinner = false;
          // this._notifyService.Toast.fire({
          // title: 'La publicación ha sido creada con exito',
          // text: 'El archivo no se pudo enviar',
          // icon: 'success'
          // });
          this._notifyService.swalNormal.fire({

            title: "¡Publicación creada con exito!",
            text: "¡Gracias por participar y pautar con nosotros, desde el próximo 1 de junio, en nuestro gran lanzamiento, estarás a la vista de todos!",
            icon: "success",
            confirmButtonText: 'Aceptar'

          }).then((result) => {
            this.router.navigate(['/us']);
          });

          // forma.reset();
          this.imageName = "Seleccionar";
          this.imagenTemp = null;
          this.imagenSubir = null;
          this.imagenesSubir = [];
        this.urlFiles = [];
        } else {
          this._globalConfig.spinner = false;
          this._notifyService.Toast.fire({
            title: "Algo ha salido mal",
            text: "Intente más tarde por favor",
            icon: "error",
          });
        }
      });
  }

  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      this.imagenSubir = null;
      this._notifyService.Toast.fire({
        title: "Solo imágenes",
        text: "El archivo seleccionado no es una imagen",
        icon: "error",
      });
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemp = reader.result);

    this._notifyService.Toast.fire({
      title: "Archivo valido",
      // text: '',
      icon: "success",
    });
    this.imageName = this.imagenSubir.name;
  }

  async selectFiles(event) {
    //
    //console.log(this.nroFotos);
    //////console.log(event.target.files);
    if(event.target.files){
      ////console.log('total', event.target.files);
      for (let index = 0; index < event.target.files.length; index++) {

        var reader = new FileReader();
      var promesa = new Promise((resolve, reject) => {


        reader.readAsDataURL(event.target.files[index]);
        var fileup = event.target.files[index];
        ////console.log('imagen nro ', index, fileup);


       reader.onload =  ((event:any) => {
          var image = new Image();
          image.src = event.target.result;


          var ft = this._fileBase64.getFormatBase64(event.target.result);

          if ( this._globalConfig.imgFormat.indexOf( ft.smallFormat ) < 0 && this.ngTypeAdjuntos != 'Catálogo PDF') {

            // this.imagenSubir = null;
            this._notifyService.Toast.fire({
              title: 'Solo se permiten imagenes',
              text: 'Con formato PNG, JPG y JPEG' ,
              icon: 'error'
            });
            return;
          }

          if(this.ngTypeAdjuntos != 'Catálogo PDF'){

          // return;
          var x = new Promise((resolve,reject) => {
            // ////console.log('entra en promesa', index);
            image.onload = function() {
              // ////console.log('datos de imagn',image);
                var k = [image.width, image.height];
                resolve(k);
                ////console.log('datos promesa', image);
                ////console.log('Sale de promesa, resuelve', index);
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

            if(fileup.size/1024 >= 20000){
               this._notifyService.Toast.fire({
                title:'Imagen con exceso de tamaño',
                text: 'No se permiten imagenes con más de 20MB de peso',
                icon: 'error'
              });
               return;
            }
            if(r[0] >= 200 && r[1] >= 200 ){
              this.urlFiles.push(event.target.result);
              this.imagenesSubir.push(fileup);
              // ////console.log(fileup.size);
              // ////console.log(this.urlFiles, 'urlfiles');
            }else{
              this._notifyService.Toast.fire({
                title:'Dimensiones no permitidas',
                text: 'Solo se permiten imagenes con más de  200 de ancho y alto',
                icon: 'error'
              });
            }
          },
          re => {});

          resolve(true);
          }

        if(this.ngTypeAdjuntos == 'Catálogo PDF'){
          //////console.log('archivo', reader);
           // return;

         if ( event.target.result.indexOf('PDF') < 0 && this.ngTypeAdjuntos == 'Catálogo PDF') {

            // this.imagenSubir = null;
            this._notifyService.Toast.fire({
              title: 'Solo PDF',
              text: 'El archivo seleccionado no es una archivo PDF',
              icon: 'error'
            });
            return;
          }

          if(fileup.size/1024 >= 150000){
               this._notifyService.Toast.fire({
                title:'Archivo con exceso de tamaño',
                text: 'No se permiten archivos con más de 150MB de peso',
                icon: 'error'
              });
               return;
            }


                if(this.urlFiles.length+1 > this.nroFotos ){
                 this._notifyService.Toast.fire({
                    title: 'Limite de archivo',
                    text: `Solo puedes seleccionar ${this.nroFotos} PDF`,
                    icon: 'error'
                  });
                  return;
              }
              this.urlFiles.push(event.target.result);
              this.imagenesSubir.push(fileup);
              //////console.log(this.urlFiles, 'los datos');
              //////console.log(event.target.result, 'los datos');

          resolve();
        }

       });

      });

      promesa.then( r => {

      });

       // ////console.log(this.urlFiles, 'urlfiles');


      }
      ////console.log(this.imagenesSubir, 'imgsubir finales');
    }
  }


  prueba(){
    console.log(this.altMapUrl);
  }



}
