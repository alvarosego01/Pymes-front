import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NotifyService, Filebase64Service, FormsResourcesService, CategoryService} from 'src/app/services/service.index';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GlobalConfigService} from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-post-edition',
  templateUrl: './post-edition.component.html',
  styleUrls: ['./post-edition.component.sass']
})
export class PostEditionComponent implements OnInit {


  @Input("Edit") Edit: boolean = false;
  @Input("publicacion") publicacion: any;


  @Output() closeEdit = new EventEmitter<boolean>();




  canChangeFiles: boolean = false;
  // paramtros para el cambio...

  enviado: boolean = false;

  test = 1;

  imagenSubir: File;
  imagenesSubir = [];
  imagenTemp: any;
  imageName: string = "Seleccionar";

  ngTypeAdjuntos = null;
  nroFotos: number = 10;
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

  // Category1: any;
  // Category2: any;
  // Category3: any;

  subCategory1 = [];
  subCategory2 = [];
  subCategory3 = [];

  Min: number;
  Max: number;

  altMapUrl: string = null;

  ngPhone = this._usersService.usuario.phone;
  ngcelPhone = this._usersService.usuario.celPhone;
  // ngDepartment = this._usersService.usuario.department;
  ngCity = null;
  ngEmail = this._usersService.usuario.email;
  ngDepartment = "";


// para los contadores de caracteres
ngIncludeDesc: string = '';
ngnotIncludeDesc: string = '';

categoryList: any = [];
redes: string = 'url';
// --------------------
categoryError: boolean = null;
citysError: boolean = false;
filesError: boolean = false;



// ---------------------------------------------------------------------

_files: any = [];


redWhatsapp: string = '';
redWeb: string = '';
redInstagram: string = '';
redFacebook: string = '';

Typee: string = '';
IncludeDesc: string = '';
notIncludeDesc: string = '';
// Department
// City
// typeAdjuntos
// files
// files
// Terms

options: any = {};

  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService,
    public _fileBase64: Filebase64Service,
    public _formsResource: FormsResourcesService,
    public _categoryService: CategoryService,
    public router: Router
  ) {

    this.getCategory();
    this.initCitys();


    this.options = {
      // onUpdate: (event: any) => {
        // this.postChangesToServer();
        // //////////// console.log('cambios', this._files);
      // },
      animation: 150
    };

  }

  ngOnInit(): void {


      this.canChangeFiles = (this.publicacion._adminReasons != null && this.publicacion._adminReasons.changeFiles)? this.publicacion._adminReasons.changeFiles : false;
      this._files = this.publicacion._files;

      //////////// console.log('this.publicacion._adminReasons', this.publicacion._adminReasons);

    this.setNroFotos();

      // actualizar atos
      this.ngPhone = this.publicacion._infoContact.phone;
      this.ngcelPhone = this.publicacion._infoContact.celPhone;
      this.ngEmail = this.publicacion._infoContact.email;

      this.redWhatsapp = this.publicacion._socialNet.whatsapp;
      this.redWeb = this.publicacion._socialNet.web;
      this.redInstagram = this.publicacion._socialNet.instagram;
      this.redFacebook = this.publicacion._socialNet.facebook;
      if(this.redInstagram.includes("@") && this.redFacebook.includes("@")){
        this.redes = 'user';
      }

      this.Typee = this.publicacion.type;
      // //////////// console.log('tipo', this.Typee);
      this.ngIncludeDesc = this.publicacion.content;
      this.ngnotIncludeDesc = this.publicacion.notContent;

      var cityTg = this.publicacion._cityTarget;
      cityTg.forEach((ele, idx) => {

        var l = {
          department: ele.department,
          city: ele.city
        };

        this.cityTargets.push(l);
      });



  }


  setNroFotos(){

    if((this._files) && (this._files.length > 0) && (this._files[0].type != 'PDF')){

      var f = this._files.filter( f => {

        return (!f.delete || f.delete != true);

      });

        //////////// console.log('la cuenta de f', f);
      var archivos = (f.length >= 1 && f.length <= 10)? f.length : 10;

      // if( (10 - archivos) >= 0 ){
      this.nroFotos = ( (10 - archivos) >= 0 )? 10 - archivos: 0;

        //////////// console.log('disponibles', this.nroFotos);
      // }

    }


  }


  deleteCity(i) {

    //////////// console.log('delete city');
    this.cityTargets.splice(i, 1);
    return;
  }

  async captrarLocalizacion() {
    let x = this._usersService.getLocation();

    this.GlobalConfigService.spinner = true;
    this.activateMap = false;
    x.then((r) => {
      //////// ////// console.log(r);
      this.coordsMap = r;
      this.GlobalConfigService.spinner = false;
      if (Object.keys(this.coordsMap).length > 0) {
        this.activateMap = true;
        // //////// ////// console.log('activado mapa', );
      }
      this._notifyService.Toast.fire({
        title: '¡Localización almacenada!',
        // text:'El navegador no soporta la geolocalización',
        icon: 'success'
        });


    }, err => {
      this.GlobalConfigService.spinner = false;
      this._notifyService.Toast.fire({
        title: 'Lo sentimos',
        text:'No pudimos encontrar tu localización',
        icon: 'error'
      });

    });


  }

  addCityTarget() {

    if (this.ngDepartment != null && this.ngCity != null) {
      var l = {
        department: JSON.parse(this.ngDepartment).departamento,
        city: this.ngCity,
      };

      this.cityTargets.push(l);
      // this.ngDepartment =
      this.ngDepartment = null;
      this.ngCity = null;
      // this.citysError = false;
    } else {
      this._notifyService.Toast.fire({
        title: "Debes seleccionar una ciudad",
        // text: 'El archivo seleccionado no es una imagen',
        icon: "error",
      });


      // this.citysError = true;
      return;
    }
  }


  setDeleted(i){


    this._files[i].delete = (this._files[i].delete && this._files[i].delete == true)? false: true;

    this.setNroFotos();
    // //////////// console.log(this._files[i]);

  }

  deleteSelected(i = 0, type = null) {

      this.urlFiles.splice(i, 1);
      this.imagenesSubir.splice(i, 1);

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


  // this.closeEdit.emit(false);

  clearFiles(event) {
    this.urlFiles = [];
    this.imagenesSubir = [];


    if (this.ngTypeAdjuntos == "Fotos") {
      this.nroFotos = 10;

      this.setNroFotos();
    }


    if (this.ngTypeAdjuntos == "Catálogo PDF") {
      this.nroFotos = 1;
    }


  }

  initCitys() {
    for (
      let index = 0;
      index < this.GlobalConfigService.departamentos.length;
      index++
    ) {
      var element = this.GlobalConfigService.departamentos[index];
      var cd = this.GlobalConfigService.departamentos[index].ciudades;
      if (element.departamento == this.ngDepartment) {
        // this.citiesTarget = cd;
        this.ciudades = cd;
      }
    }
  }



  cerrarModal(e){

    // this.edit = false;
    if(e.target.id != 'id01'){
      return;
    }
    this.closeEdit.emit(false);
    // this.cerrarModalClick();
  }



  // cerrarModal
cerrarModalClick(){

  // this.edit = false;
  this.closeEdit.emit(false);

}







muestraMap() {
  return;
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
  ////// ////// console.log(this.nroFotos);
  ////////// ////// console.log(event.target.files);
  if(event.target.files){
    //////// ////// console.log('total', event.target.files);
    for (let index = 0; index < event.target.files.length; index++) {

      var reader = new FileReader();
    var promesa = new Promise((resolve, reject) => {


      reader.readAsDataURL(event.target.files[index]);
      var fileup = event.target.files[index];
      //////// ////// console.log('imagen nro ', index, fileup);


     reader.onload =  ((event:any) => {
        var image = new Image();
        image.src = event.target.result;


        var ft = this._fileBase64.getFormatBase64(event.target.result);

        if ( this.GlobalConfigService.imgFormat.indexOf( ft.smallFormat ) < 0 && this.ngTypeAdjuntos != 'Catálogo PDF') {

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
          // //////// ////// console.log('entra en promesa', index);
          image.onload = function() {
            // //////// ////// console.log('datos de imagn',image);
              var k = [image.width, image.height];
              resolve(k);
              //////// ////// console.log('datos promesa', image);
              //////// ////// console.log('Sale de promesa, resuelve', index);
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
            // //////// ////// console.log(fileup.size);
            // //////// ////// console.log(this.urlFiles, 'urlfiles');
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
        ////////// ////// console.log('archivo', reader);
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
            ////////// ////// console.log(this.urlFiles, 'los datos');
            ////////// ////// console.log(event.target.result, 'los datos');

        resolve();
      }

     });

    });

    promesa.then( r => {

    });

     // //////// ////// console.log(this.urlFiles, 'urlfiles');


    }
    //////// ////// console.log(this.imagenesSubir, 'imgsubir finales');
  }
}


getCategory(){

  this.GlobalConfigService.spinner = true;

  this._categoryService.getCategoryGET().subscribe((resp) => {
    this.GlobalConfigService.spinner = false;




      this._categoryService.allCategoryList = resp.data;
      // //// console.log('las categorias', this.categoryList)

  }, (err) => {

    console.error(err);
    this.GlobalConfigService.spinner = false;
  });
}



changeTypeRedes(type: string){

  this.redes = (type != '')? type : 'url';

}

alEnviar(){


  // categoryError: boolean = false;
  // citysError: boolean = false;
  // filesError: boolean = false;
  this.enviado = true;

}


activateDataUser(e) {
  this.autoDataContact = !this.autoDataContact;

  if (this.autoDataContact == true) {
    this.ngPhone = this._usersService.usuario.phone;
    this.ngcelPhone = this._usersService.usuario.celPhone;
    this.ngDepartment = this._usersService.usuario.department;
    this.ngCity = null;
    this.ngEmail = this._usersService.usuario.email;

    this.initCitys();
  }
}


setCiudades(i) {
  let k = JSON.parse(i);
  i = k.id;
  // let c =k.ciudades
  let dp = this.GlobalConfigService.departamentos;
  this.ciudades = dp[i].ciudades;
}

setSubCategory(i, nro) {

  let k = JSON.parse(i);

  // console.log('la mierda esta', k );

  let p = k._category;
  let c = k._child;

  if(nro == 1){


    this.subCategory1 = c;

    if (this.subCategory1.length == 0) {
      this.subCategory1 = ["Sin sub categoría"];
    }
  }
  if(nro == 2){
    this.subCategory2 = c;

    if (this.subCategory2.length == 0) {
      this.subCategory2 = ["Sin sub categoría"];
    }
  }
  if(nro == 3){
    this.subCategory3 = c;

    if (this.subCategory3.length == 0) {
      this.subCategory3 = ["Sin sub categoría"];
    }
  }


}



updatePublication(forma: NgForm){

  // console.log(this._formsResource.checkUrl(forma.value.redInstagram));

    if( (forma.value.redWeb) &&
    forma.value.redWeb != '' &&
    this.redes == 'url' &&
     !this._formsResource.checkUrl(forma.value.redWeb)
     ){

          this._notifyService.Toast.fire({
        title:
          "Url de web invalido",
        icon: "error",
      });

      return;
    }

    if( (forma.value.redInstagram) &&
    forma.value.redInstagram != '' &&
    this.redes == 'url' &&
     !this._formsResource.checkUrl(forma.value.redInstagram)
     ){

          this._notifyService.Toast.fire({
        title:
          "Url de instagram invalido",
        icon: "error",
      });

      return;
    }

    if( (forma.value.redFacebook) &&
    forma.value.redFacebook != ''  &&
    this.redes == 'url' &&
    !this._formsResource.checkUrl(forma.value.redFacebook)
    ){

          this._notifyService.Toast.fire({
        title:
          "Url de facebook invalido",
        icon: "error",
      });

      return;
    }


    // if(this.imagenesSubir.length == 0){
    //       this._notifyService.Toast.fire({
    //     title:
    //       "Debes seleccionar al menos un archivo",
    //     icon: "error",
    //   });
    //   return;
    // }

    if (this.cityTargets.length == 0) {
      this._notifyService.Toast.fire({
        title:
          "Debes seleccionar al menos una ciudad en donde estará tu servicio",
        icon: "error",
      });
      this.citysError = true;
      return;
    }else{
      this.citysError = false;
    }

    if (forma.invalid) {
      this._notifyService.Toast.fire({
        title: "Datos invalidos",
        icon: "error",
      });
      return;
    }



    var contactData = {
      email: this.ngEmail,
      phone: this.ngPhone,
      celPhone: this.ngcelPhone,
    };



    var social = {
      facebook: forma.value.redFacebook,
      whatsapp: forma.value.redWhatsapp,
      instagram: forma.value.redInstagram,
      web: forma.value.redWeb,
    };


    let post = {
      content: this.ngIncludeDesc,
      notContent: this.ngnotIncludeDesc,
      _infoContact: JSON.stringify(contactData),
      _cityTarget: JSON.stringify(this.cityTargets),
      _socialNet: JSON.stringify(social),
      newOrden: (this._files.length > 0)? JSON.stringify(this._files): null,
      postId: this.publicacion._id,
      canChangeFiles: this.canChangeFiles

    };


    // //////////// console.log('los datos', post);
    // return;

    this.GlobalConfigService.spinner = true;
    this._postService.updatePublicationSET(post, this.imagenesSubir)
      .then((resp) => {
        this.GlobalConfigService.spinner = false;


        this._notifyService.Toast.fire({
          title: 'Publicación actualizada',
          icon: 'success'
        });

        this.cerrarModalClick();
      })
      .catch((e) => {

          this.GlobalConfigService.spinner = false;
          this._notifyService.Toast.fire({
            title: "Algo ha salido mal",
            text: "Intente más tarde por favor",
            icon: "error",
          });

      });



}



completeLoading(){

}

  }





