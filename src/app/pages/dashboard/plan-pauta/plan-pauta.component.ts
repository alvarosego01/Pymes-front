import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

import Litepicker from 'litepicker';
import { NgForm } from '@angular/forms';
import { NotifyService, Filebase64Service, FormsResourcesService } from 'src/app/services/service.index';
import { GlobalConfigService } from 'src/app/services/-global-config.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-plan-pauta',
  templateUrl: './plan-pauta.component.html',
  styleUrls: ['./plan-pauta.component.sass']
})
export class PlanPautaComponent implements OnInit {

  tipo: string = null;
  costo: string = null;
  paso: number = 0;

  enviado: boolean = false;



  @Input("openPlanesPauta") openPlanesPauta: boolean = false;
  @Input("typePurchase") typePurchase: string = null;

  @Output() closePlanes  =  new EventEmitter<boolean>();
  @Output() infoPlanPauta  =  new EventEmitter<any>();


  imagenSubir: File;
  imagenesSubir = [];
  imagenTemp: any;
  imageName: string = "Seleccionar";
  citysError: boolean = false;
  filesError: boolean = false;


  ngTypeAdjuntos = null;
  nroFotos: number = 2;
  urlFiles = [];
  ngDepartment = "";
  ngCity = null;

  ciudades: any = [];

  cityTargets: any = [];

  nroCiudades: number = 0;
  ngfechaPautas: string = '';

  picker: any;
  //
  redesPublico: any = [
    { name: "Facebook", value: "Facebook", checked: false },
    { name: "Instagram", value: "Instagram", checked: false },
  ];

  generoObj: any = [
    { name: "Hombres", value: "Hombres", checked: false },
    { name: "Mujeres", value: "Mujeres", checked: false },
    { name: "Todos", value: "Todos", checked: false },
  ];

  edadesObj: any = [
    { name: "16 a 24", value: "16 a 24", checked: false },
    { name: "25 a 34", value: "25 a 34", checked: false },
    { name: "35 a 44", value: "35 a 44", checked: false },
    { name: "45 a 54", value: "45 a 54", checked: false },
    { name: "Mas de 55", value: "Mas de 55", checked: false },
    { name: "Todos", value: "Todos", checked: false },
  ];
  estadoCivilObj: any = [
    { name: "Solteros", value: "Solteros", checked: false },
    { name: "Casados", value: "Casados", checked: false },
    { name: "En una relación", value: "En una relación", checked: false },
    { name: "Todos", value: "Todos", checked: false },
  ];
  fechas: any = {
    inicio: null,
    finalizacion: null,
  };
  ngCuentaPublico: string = "";
  palabrasBuscador: string = "";
  nroRecursos: number = 2;


  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _fileBase64: Filebase64Service,
    public _formsResource: FormsResourcesService,
    public router: Router,

  ) {


  }

  ngOnInit(): void {




  }



  cerrarModal(){
    this.openPlanesPauta = false;
    this.closePlanes.emit(false);
  }


  Atras(){
    this.tipo = null;
    this.paso = 0;
  }



  ocultarClick(e){
    // this._postService.PDFFILE = null;
    this.openPlanesPauta = false;
    this.closePlanes.emit(false);



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


  setCiudades(i) {
    let k = JSON.parse(i);
    i = k.id;
    // let c =k.ciudades
    let dp = this.GlobalConfigService.departamentos;
    this.ciudades = dp[i].ciudades;
  }


  async selectPauta(tipo, costo){



  this.imagenesSubir = [];
  this.urlFiles = [];
  this.ngDepartment = "";
  this.ngCity = null;

  this.ciudades = [];

  this.cityTargets = [];

  this.nroCiudades = 0;
  this.ngfechaPautas = '';

  this.ngCuentaPublico = '';
  this.palabrasBuscador = '';

    this.GlobalConfigService.spinner = true;
    this.tipo = tipo;
    this.costo = costo;
    this.paso = 1;


    if(this.tipo == 'Micro' || this.tipo == 'Pequeño' || this.tipo == 'Mediano' ){

      await new Promise(resolve => setTimeout(resolve, 1000));

      let copyfecha = this.fechas;
      let d = new Date();

       this.picker = new Litepicker({
        element: document.getElementById("fechaPautas"),
      singleMode: false,
      numberOfColumns: 2,
      numberOfMonths: 2,
      lang: "es",
      maxDays: 3,
      minDays: 3,
      format: "DD/MMMM/YYYY",
      inlineMode: false,
      selectForward: true,
      mobileFriendly: true,
      minDate: d.setDate(d.getDate() + 2),
      tooltipText: {
        one: "día",
        other: "días",
      },
      onSelect: function () {
        let aux = document.querySelectorAll("#fechaPautas")[0]["value"];
        aux = aux.replaceAll("/", " de ");
        document.querySelectorAll("#fechaPautas")[0]["value"] = aux;
        aux = aux.split(" - ");

        copyfecha.inicio = aux[0];
        copyfecha.finalizacion = aux[1];
        this.fechas = copyfecha;
      },
    });

  this.nroCiudades = 1;

}

if(this.tipo == 'Mediano'){

  this.nroCiudades = 2;
    }

if(this.tipo == 'Grande'){

  await new Promise(resolve => setTimeout(resolve, 1000));

      let copyfecha = this.fechas;
      let d = new Date();

       this.picker = new Litepicker({
        element: document.getElementById("fechaPautas"),
      singleMode: false,
      numberOfColumns: 2,
      numberOfMonths: 2,
      lang: "es",
      maxDays: 5,
      minDays: 5,
      format: "DD/MMMM/YYYY",
      inlineMode: false,
      selectForward: true,
      mobileFriendly: true,
      minDate: d.setDate(d.getDate() + 2),
      tooltipText: {
        one: "día",
        other: "días",
      },
      onSelect: function () {
        let aux = document.querySelectorAll("#fechaPautas")[0]["value"];
        aux = aux.replaceAll("/", " de ");
        document.querySelectorAll("#fechaPautas")[0]["value"] = aux;
        aux = aux.split(" - ");

        copyfecha.inicio = aux[0];
        copyfecha.finalizacion = aux[1];
        this.fechas = copyfecha;
      },
    });

  this.nroCiudades = 3;
    }


    this.GlobalConfigService.spinner = false;

  }



  savePlanPauta(forma: NgForm) {


    if (this.imagenesSubir.length == 0) {
      this._notifyService.Toast.fire({
        title: "Debes seleccionar al menos un archivo",
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

    var x = {
      nombre: this.tipo,
      costo: this.costo,

    }

    var l = {
      plan: {
        planPauta: x,//JSON.stringify(x),
        redesPublico: (forma.value.redesPublico != null && forma.value.redesPublico != '')? forma.value.redesPublico: 'No aplica',
        generoObj: this.generoObj, //JSON.stringify(this.generoObj),
        edadesObj: this.edadesObj, //JSON.stringify(this.edadesObj),
        estadoCivilObj: this.estadoCivilObj, //JSON.stringify(this.estadoCivilObj),
        cuentaPublico: this.ngCuentaPublico,
        palabrasBuscador: (this.palabrasBuscador != null && this.palabrasBuscador != '')? this.palabrasBuscador: 'No aplica',
        fechas: this.fechas, //JSON.stringify(this.fechas),
        cityTargets: this.cityTargets, //JSON.stringify(this.cityTargets),
      },
      files: this.imagenesSubir
    }

    // se retornan los elementos al componente padre...
    this.infoPlanPauta.emit(l);
    this.openPlanesPauta = false;
    this.closePlanes.emit(false);



    // ////// console.log('redesPublico', this.redesPublico);
    // ////// console.log("generoObj", this.generoObj);
    // ////// console.log("edadesObj", this.edadesObj);
    // ////// console.log("estadoCivilObj", this.estadoCivilObj);
    // ////// console.log("ngCuentaPublico", this.ngCuentaPublico);
    // ////// console.log("fechas", this.fechas);
    // ////// console.log("cityTargets", this.cityTargets);
  }


  alEnviar() {
    this.enviado = true;
  }




  async selectFiles(event) {

    if (event.target.files) {
      //////// ////// console.log('total', event.target.files);
      for (let index = 0; index < event.target.files.length; index++) {
        var reader = new FileReader();
        var promesa = new Promise((resolve, reject) => {
          reader.readAsDataURL(event.target.files[index]);
          var fileup = event.target.files[index];
          //////// ////// console.log('imagen nro ', index, fileup);

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
                // //////// ////// console.log('entra en promesa', index);
                image.onload = function () {
                  // //////// ////// console.log('datos de imagn',image);
                  var k = [image.width, image.height];
                  resolve(k);
                  //////// ////// console.log('datos promesa', image);
                  //////// ////// console.log('Sale de promesa, resuelve', index);
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
                    // //////// ////// console.log(fileup.size);
                    // //////// ////// console.log(this.urlFiles, 'urlfiles');
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


          };
        });

        promesa.then((r) => {});
      }
    }
  }


}
