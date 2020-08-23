import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
// import { _PostModel } from "src/app/models/postModel"
// _PostModel
import { PostsService } from "../../../services/posts.service";
import {
  NotifyService,
  FormsResourcesService,
  CategoryService,
  PaymentService,
  //  PostsService
} from "src/app/services/service.index";
import { Filebase64Service } from "src/app/services/filebase64.service";
import { NumberFormatPipe } from "src/app/pipes/number-format.pipe";
import { ProfileViewComponent } from "../../profile-view/profile-view.component";
import { _PostModel } from "src/app/models/postModel";
import { GlobalConfigService } from "src/app/services/-global-config.service";


import { FormResourcePipe } from 'src/app/pipes/form-resource.pipe';

@Component({
  selector: "app-post-control",
  templateUrl: "./post-control.component.html",
  styleUrls: ["./post-control.component.sass"],
})
export class PostControlComponent implements OnInit {
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
  ciudades: any = [];
  idc: number = 0;
  autoDataContact = true;
  publications = [];

  cityTargets: any = [];

  ngNewCategory: string = null;

  // Category1: any;
  // Category2: any;
  // Category3: any;

  subCategory1 = [];
  subCategory2 = [];
  subCategory3 = [];

  Min: number;
  Max: number;

  ngPhone = this._usersService.usuario.phone;
  ngcelPhone = this._usersService.usuario.celPhone;
  // ngDepartment = this._usersService.usuario.department;
  ngDepartment = "";
  ngCity = null;
  ngEmail = this._usersService.usuario.email;

  // para los contadores de caracteres
  ngIncludeDesc: string = "";
  ngnotIncludeDesc: string = "";

  categoryList: any = [];

  redes: string = "url";

  // --------------------
  categoryError: boolean = null;
  citysError: boolean = false;
  filesError: boolean = false;

  // data post
  post: any = null;

  // para el preview
  previewPublication: boolean = false;
  previewData: any = null;

  // -----------  para los planes de pauta
  openPlanesPauta: boolean = false;
  infoPlanPauta: any = null;



  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService,
    public _fileBase64: Filebase64Service,
    public _formsResource: FormsResourcesService,
    public _categoryService: CategoryService,
    public router: Router,
    public _paymentService: PaymentService
  ) {
    this.getCategory();
    this.initCitys();
  }

  ngOnInit(): void {

  }



  deleteCityTarget(i) {
    this.cityTargets.splice(i, 1);
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

  deleteSelected(i = 0, type = null) {
    this.urlFiles.splice(i, 1);
    this.imagenesSubir.splice(i, 1);

    this._notifyService.Toast.fire({
      title: "Elemento retirado",
      // text: 'El archivo seleccionado no es una imagen',
      icon: "success",
    });

    if (i == 0 && type == "pdf") {
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

    if (this.ngTypeAdjuntos == "Fotos") {
      this.nroFotos = 10;
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

  activateEconomicActivity() {
    // this.estadosActividad[e] = !this.estadosActividad[e];
    ////////// ////////////console.log(this.estadosActividad);
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

    ////////console.log('la mierda esta', k );

    let p = k._category;
    let c = k._child;

    if (nro == 1) {
      this.subCategory1 = c;

      if (this.subCategory1.length == 0) {
        this.subCategory1 = ["Sin sub categoría"];
      }
    }
    if (nro == 2) {
      this.subCategory2 = c;

      if (this.subCategory2.length == 0) {
        this.subCategory2 = ["Sin sub categoría"];
      }
    }
    if (nro == 3) {
      this.subCategory3 = c;

      if (this.subCategory3.length == 0) {
        this.subCategory3 = ["Sin sub categoría"];
      }
    }
  }

  getMyPublications() {
    this.GlobalConfigService.spinner = true;

    this._postService.getMyPublications().subscribe((resp) => {
      this.publications = resp.data;

      this.GlobalConfigService.spinner = false;
    });
  }

  setSubCategoryOther(e) {
    this.ngNewCategory = e == "Otra" ? e : null;
  }

  sendPreview(forma: NgForm) {
    if (
      forma.value.redWeb &&
      forma.value.redWeb != "" &&
      this.redes == "url" &&
      !this._formsResource.checkUrl(forma.value.redWeb)
    ) {
      this._notifyService.Toast.fire({
        title: "Url de web invalido",
        icon: "error",
      });

      return;
    }

    if (
      forma.value.redInstagram &&
      forma.value.redInstagram != "" &&
      this.redes == "url" &&
      !this._formsResource.checkUrl(forma.value.redInstagram)
    ) {
      this._notifyService.Toast.fire({
        title: "Url de instagram invalido",
        icon: "error",
      });

      return;
    }

    if (
      forma.value.redFacebook &&
      forma.value.redFacebook != "" &&
      this.redes == "url" &&
      !this._formsResource.checkUrl(forma.value.redFacebook)
    ) {
      this._notifyService.Toast.fire({
        title: "Url de facebook invalido",
        icon: "error",
      });

      return;
    }

    if (this.imagenesSubir.length == 0) {
      this._notifyService.Toast.fire({
        title: "Debes seleccionar al menos un archivo",
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
      this.citysError = true;
      return;
    } else {
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

    ////////console.log('forma.value.Category1', forma.value.Category1);
    ////////console.log('forma.value.subCategory1Form', forma.value.subCategory1Form);

    var catGroup = [
      {
        _principal:
          forma.value.Category1 && JSON.parse(forma.value.Category1)._id != ""
            ? JSON.parse(forma.value.Category1)._id
            : null,
        _child:
          forma.value.subCategory1Form &&
          JSON.parse(forma.value.subCategory1Form)._id != ""
            ? JSON.parse(forma.value.subCategory1Form)._id
            : null,
        child:
          forma.value.subCategory1Form &&
          JSON.parse(forma.value.subCategory1Form).name != ""
            ? JSON.parse(forma.value.subCategory1Form).name
            : null,
      },
      {
        _principal:
          forma.value.Category2 && JSON.parse(forma.value.Category2)._id != ""
            ? JSON.parse(forma.value.Category2)._id
            : null,
        _child:
          forma.value.subCategory2Form &&
          JSON.parse(forma.value.subCategory2Form)._id != ""
            ? JSON.parse(forma.value.subCategory2Form)._id
            : null,
        child:
          forma.value.subCategory2Form &&
          JSON.parse(forma.value.subCategory2Form).name != ""
            ? JSON.parse(forma.value.subCategory2Form).name
            : null,
      },
      {
        _principal:
          forma.value.Category3 && JSON.parse(forma.value.Category3)._id != ""
            ? JSON.parse(forma.value.Category3)._id
            : null,
        _child:
          forma.value.subCategory3Form &&
          JSON.parse(forma.value.subCategory3Form)._id != ""
            ? JSON.parse(forma.value.subCategory3Form)._id
            : null,
        child:
          forma.value.subCategory3Form &&
          JSON.parse(forma.value.subCategory3Form).name != ""
            ? JSON.parse(forma.value.subCategory3Form).name
            : null,
      },
      // //////////console.log(cat);
    ];

    ////////console.log('group cat', catGroup);

    this.categoryError = true;

    catGroup.forEach((el, idx) => {
      if (el._principal != null) {
        if (el._child != null) {
          this.categoryError = false;
        } else {
          this.categoryError = true;
        }
      }
    });

    if (this.categoryError == true) {
      this._notifyService.Toast.fire({
        title: "Debes seleccionar al menos un conjunto de categorias",
        icon: "error",
      });
      return;
    }
    //
    var social = {
      facebook: forma.value.redFacebook,
      whatsapp: forma.value.redWhatsapp,
      instagram: forma.value.redInstagram,
      web: forma.value.redWeb,
    };

    this.post = {
      title: forma.value.Title,
      // target: forma.value.targetPublication,
      content: this.ngIncludeDesc,
      notContent: this.ngnotIncludeDesc,
      type: forma.value.Type,
      _infoContact: contactData,
      _category: catGroup,
      _cityTarget: this.cityTargets,
      _socialNet: social,
      // _rangoPrize: precio,
      // _target: this.);
      // _files:
    };

    let copyPost = this.post;

    copyPost.typePost = "preview";
    copyPost._files = this.urlFiles;
    copyPost.typeFiles = this.ngTypeAdjuntos;
    copyPost._mapUrl = this._usersService.usuario._mapUrl;
    copyPost.user = this._usersService.usuario;

    this.openPreview(copyPost);

    this.post = {
      title: forma.value.Title,
      content: this.ngIncludeDesc,
      notContent: this.ngnotIncludeDesc,
      type: forma.value.Type,
      _infoContact: contactData,//JSON.stringify(contactData),
      _category: catGroup,//JSON.stringify(catGroup),
      _cityTarget: this.cityTargets,//JSON.stringify(this.cityTargets),
      _socialNet: social,//JSON.stringify(social),
      costoPlan: forma.value.costoPlan,
      typePost: "Publicación"
    };
  }

  createPublication(post: any) {
    this.GlobalConfigService.spinner = true;
    this._postService
      .createPublication(post, this.imagenesSubir)
      .then((resp: any) => {
        this.GlobalConfigService.spinner = false;

        if (resp.data.typePost == "borrador") {
          this._notifyService.Toast.fire({
            title: "¡Publicación guardada como borrador!",
            icon: "success",
          });

          // this.router.navigate(['/us']);

          return;
        }

        // this._notifyService.swalNormal
        //   .fire({
        //     title: "¡Publicación procesada con exito!",
        //     text:
        //       "¡Gracias por participar y pautar con nosotros, con tan solo un click estarás a la vista de todos!",
        //     icon: "success",
        //     confirmButtonText: "Aceptar",
        //   })
        //   .then((result) => {
        //     this.router.navigate(["/us"]);
        //   });
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

    if (event.target.files) {

      //////// ////////////console.log('total', event.target.files);
      for (let index = 0; index < event.target.files.length; index++) {
        var reader = new FileReader();
        var promesa = new Promise((resolve, reject) => {
          reader.readAsDataURL(event.target.files[index]);
          var fileup = event.target.files[index];
          //////// ////////////console.log('imagen nro ', index, fileup);

          reader.onload = (event: any) => {
            var image = new Image();
            image.src = event.target.result;

            var ft = this._fileBase64.getFormatBase64(event.target.result);

            if (
              this.GlobalConfigService.imgFormat.indexOf(ft.smallFormat) < 0 &&
              this.ngTypeAdjuntos != "Catálogo PDF"
            ) {
              // this.imagenSubir = null;
              this._notifyService.Toast.fire({
                title: "Solo se permiten imagenes",
                text: "Con formato PNG, JPG y JPEG",
                icon: "error",
              });
              return;
            }

            if (this.ngTypeAdjuntos != "Catálogo PDF") {
              // return;
              var x = new Promise((resolve, reject) => {
                // //////// ////////////console.log('entra en promesa', index);
                image.onload = function () {
                  // //////// ////////////console.log('datos de imagn',image);
                  var k = [image.width, image.height];
                  resolve(k);
                  //////// ////////////console.log('datos promesa', image);
                  //////// ////////////console.log('Sale de promesa, resuelve', index);
                };
              });

              x.then(
                (r) => {
                  if (this.urlFiles.length + 1 > this.nroFotos) {
                    this._notifyService.Toast.fire({
                      title: "Limite de imágenes",
                      text: `Solo puedes seleccionar ${this.nroFotos} imágenes`,
                      icon: "error",
                    });
                    return;
                  }

                  if (fileup.size / 1024 >= 20000) {
                    this._notifyService.Toast.fire({
                      title: "Imagen con exceso de tamaño",
                      text: "No se permiten imagenes con más de 20MB de peso",
                      icon: "error",
                    });
                    return;
                  }
                  if (r[0] >= 200 && r[1] >= 200) {
                    this.urlFiles.push(event.target.result);
                    this.imagenesSubir.push(fileup);
                    // //////// ////////////console.log(fileup.size);
                    // //////// ////////////console.log(this.urlFiles, 'urlfiles');
                  } else {
                    this._notifyService.Toast.fire({
                      title: "Dimensiones no permitidas",
                      text:
                        "Solo se permiten imagenes con más de  200 de ancho y alto",
                      icon: "error",
                    });
                  }
                },
                (re) => {}
              );

              resolve(true);
            }

            if (this.ngTypeAdjuntos == "Catálogo PDF") {
              ////////// ////////////console.log('archivo', reader);
              // return;

              if (
                event.target.result.indexOf("PDF") < 0 &&
                this.ngTypeAdjuntos == "Catálogo PDF"
              ) {
                // this.imagenSubir = null;
                this._notifyService.Toast.fire({
                  title: "Solo PDF",
                  text: "El archivo seleccionado no es una archivo PDF",
                  icon: "error",
                });
                return;
              }

              if (fileup.size / 1024 >= 150000) {
                this._notifyService.Toast.fire({
                  title: "Archivo con exceso de tamaño",
                  text: "No se permiten archivos con más de 150MB de peso",
                  icon: "error",
                });
                return;
              }

              if (this.urlFiles.length + 1 > this.nroFotos) {
                this._notifyService.Toast.fire({
                  title: "Limite de archivo",
                  text: `Solo puedes seleccionar ${this.nroFotos} PDF`,
                  icon: "error",
                });
                return;
              }
              this.urlFiles.push(event.target.result);
              this.imagenesSubir.push(fileup);

              resolve();
            }
          };
        });

        promesa.then((r) => {});
      }
    }
  }

  getCategory() {
    this.GlobalConfigService.spinner = true;

    this._categoryService.getCategoryGET().subscribe(
      (resp) => {
        this.GlobalConfigService.spinner = false;

        this._categoryService.allCategoryList = resp.data;

        console.log("las categorias", resp.data);
      },
      (err) => {
        console.error(err);
        this.GlobalConfigService.spinner = false;
      }
    );
  }

  changeTypeRedes(type: string) {
    this.redes = type != "" ? type : "url";
  }

  alEnviar() {
    this.enviado = true;
  }

  openPreview(post: any) {
    this.previewPublication = true;
    this.previewData = post;
  }

  closePreview() {
    this.previewPublication = false;
    this.previewData = null;
  }

  accion(e) {
    console.log("la accion", e);


    if (e == "borrador") {
      let copyPost = this.post;
      copyPost.typePost = e;
      copyPost._infoContact = JSON.stringify(copyPost._infoContact);
      copyPost._category = JSON.stringify(copyPost._category);
      copyPost._cityTarget = JSON.stringify(copyPost._cityTarget);
      copyPost._socialNet = JSON.stringify(copyPost._socialNet);

      this.createPublication(copyPost);
    }

    if(e == 'goPay'){

      let p = null;

      if(this.infoPlanPauta != null){

         p = {
          plan: this.infoPlanPauta.plan,
          files: this.infoPlanPauta.files
        }

      }else{
         p = 'No aplica'
      }

      let l = {
        typeRequest: 'payProcess',
        post: {
          infoPost: this.post,
          files: this.imagenesSubir
        },
        planPauta: p
      }


      this.goPayProcess(l);
      return


    }
  }

  goPayProcess(data: any){

    // this.router.navigate(["/dashboard/paymentProcess"]);

    this.GlobalConfigService.spinner = true;
    this._postService.goPayProcessPOST(data).then((resp: any) => {
      this.GlobalConfigService.spinner = false;

        this._notifyService.Toast.fire({
          title: resp.message,
          icon: "success",
        });

        this.router.navigate(['/dashboard/paymentProcess', resp.data._id]);


      // this._notifyService.swalNormal
      //   .fire({
      //     title: "¡Publicación procesada con exito!",
      //     text:
      //       "¡Gracias por participar y pautar con nosotros, con tan solo un click estarás a la vista de todos!",
      //     icon: "success",
      //     confirmButtonText: "Aceptar",
      //   })
      //   .then((result) => {
      //     this.router.navigate(["/us"]);
      //   });
    })
    .catch((e) => {
      this.GlobalConfigService.spinner = false;
      this._notifyService.Toast.fire({
        title: e.message,
        text: "Intente más tarde por favor",
        icon: "error",
      });
    });

  }

  cerrarModal() {
    this.openPlanesPauta = false;
  }

  openPlanes() {
    this.openPlanesPauta = true;
  }

  addPlanPauta(plan: any) {

    this.infoPlanPauta = plan;

    console.log('el plan se recibe', plan);
    window.scroll(0,0);

    // console.log('prueba de stringi',
    //   JSON.stringify(plan.plan)
    // )

    this._notifyService.Toast.fire({
      title: `Plan ${plan.plan.planPauta.nombre} seleccionado`,
      icon: 'success'
    })


  }

  removePlanPauta(){


    this.infoPlanPauta = null;

    this._notifyService.Toast.fire({
      title: 'Plan de pauta retirado',
      icon: 'success'
    })

  }


  pruebaRapida(){


    this.router.navigate(["/dashboard/paymentProcess"]);

  }


}


