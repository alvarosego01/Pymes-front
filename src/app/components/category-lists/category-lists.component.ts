import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import {   SearchService, NotifyService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-category-lists',
  templateUrl: './category-lists.component.html',
  styleUrls: ['./category-lists.component.sass']
})
export class CategoryListsComponent implements OnInit {

  // catState = {
  //   base: null,
  //   child: null
  // }


  // @Output() closePlanes  =  new EventEmitter<boolean>();

  claseHide: string;

  listaCategory: any = {};

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public GlobalConfigService: GlobalConfigService,
    public _searchService: SearchService,
    public _notifyService: NotifyService
  ) {


    this.categoryCounts(true);
   }

  ngOnInit(): void {

    this.claseOcultar();




  }

  categoryCounts(type: boolean = true){

    // this.GlobalConfigService.spinner = true;
    this._postService.categoryCountsGET(type).subscribe((resp) => {
      // ////// //////////////console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({


        this.listaCategory = resp.data;

        // ////////////console.log('categorias utiles', this.listaCategory);

        this.GlobalConfigService.spinner = false;
      } else {
        this._notifyService.Toast.fire({
        title: 'Error al cargar la lista de categorias',
        // text: '¡Gracias por unirte a Mercado Pyme!',
        icon: "error",
        });
        this.GlobalConfigService.spinner = false;
      }

      this.GlobalConfigService.spinner = false;

    }, err => {
      this._notifyService.Toast.fire({
        title: 'Error al cargar la lista de categorias',
        // text: '¡Gracias por unirte a Mercado Pyme!',
        icon: "error",
        });
        this.GlobalConfigService.spinner = false;
    });



  }

  searchByOrder( tipo, orden ){
    // /orderBy/:p/:t

    let l = {
      p: tipo,
      t: orden
    }

    // this.GlobalConfigService.spinner = true;
    this._searchService.searchByOrderPOST(l).subscribe((resp) => {
      // ////// //////////////console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        if( resp.data.length > 0  && resp.data.length > 0){

this._searchService.registros = resp.data;
          this._searchService.setActualReactions();
          ////// //////////////console.log(this._searchService.registros);
        }else{
          this._searchService.registros = [];
        }
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


async sendSearchByUbicacion(forma: NgForm){

   if(
      forma.value.city == ''
      // forma.value.maximo == ''
    ){
      this._notifyService.Toast.fire({
        title: 'Debes escribir una ciudad',
        icon: 'error'
      })
      return;
    }

    // this._searchService.paginator = [];

    let pars = null;
    await this._searchService.getParameters().then(resp => {
      // // //////////////console.log('la respuesta de parametros', resp);
      pars = resp;
    });

    //////////////console.log('en este caso ', pars);

    let parms = {};

    if((pars) && pars.categoria != null && pars.categoria != ''){

      let params = {
        busqueda: 'ubicacion',
        city: forma.value.city,
        categoria: (pars.categoria != null && pars.categoria != '')? pars.categoria : null,
        subCategoria: (pars.subCategoria != null && pars.subCategoria != '')? pars.subCategoria : null,
        // pagina: (pars.pagina != null && pars.pagina != '')? pars.pagina : null

      }

      parms = params;
      this._searchService.setParameters(parms, 0);

    }else{

      let params = {
        busqueda: 'ubicacion',
        city: forma.value.city,

        // categoria: (pars.categoria != null && pars.categoria != '')? pars.categoria : null,
        // subCategoria: (pars.subCategoria != null && pars.subCategoria != '')? pars.subCategoria : null,
        // pagina: 0

      }

      parms = params;

      this._searchService.setParameters(parms, 0);
    }



  var ppp = {
    params: parms,
    change: 'new'
  }
  //////////////console.log('los ppp', ppp);

//   // //////////////console.log('params enviados ppp', ppp);

  var args = this._searchService.changePaginator(ppp);

//   this.GlobalConfigService.spinner = true;

//   // //////////////console.log('los argumentos que se mandan', args);

//////////////console.log('los args', args);
// return;

this.GlobalConfigService.spinner = true;
this._searchService.searchByTextPOST(args).subscribe((resp) => {
  // ////// //////////////console.log(resp);

  if ((resp.data) &&  resp.data.length > 0 ) {



    this._searchService.homeTitleResults = 'Resultados';

this._searchService.registros = resp.data;
    this._searchService.paginator = resp.paginator || null;
    this._searchService.setActualReactions();


    if(this.GlobalConfigService.isMobile() == true){

      this.GlobalConfigService.selectorElement('.productList h5.titleSection').then(r => {

        this.GlobalConfigService.scrollIt(r);

        //////////////console.log('se mueve a', r);

      });

    }


  } else {
    //////////////console.log('no recibbi nada');

    this._searchService.registros = [];
    this._searchService.paginator = [];
  }

  this.GlobalConfigService.spinner = false;
});

  }


  searchByPrice(forma: NgForm){

    if(
      (forma.value.minimo === '' &&
      forma.value.maximo === '') ||
      (forma.value.minimo === null &&
      forma.value.maximo === null)
    ){
      this._notifyService.Toast.fire({
        title: 'Debes establecer por lo menos un minimo o un máximo',
        icon: 'error'
      })
      return;
    }
  let l = {
    min: (forma.value.minimo != '' && forma.value.minimo >= 0)? forma.value.minimo: null,
    max: (forma.value.maximo != '' && forma.value.maximo >= 0)? forma.value.maximo: null,
    typeFind: 'price'
  }

  this.GlobalConfigService.spinner = true;
  this._searchService.searchByCategoryPOST(l).subscribe((resp) => {
    // ////// //////////////console.log(resp);


    if (resp.status == 200 && resp.ok == true) {
      // this._notifyService.Toast.fire({
      // ////// //////////////console.log(resp);
      // this._notifyService.Toast.fire({
      //   title: resp.message,
      //   // text: '¡Gracias por unirte a Mercado Pyme!',
      //   icon: "success",
      // });

      if( resp.data.length > 0  && resp.data[0].length > 0){

this._searchService.registros = resp.data[0];
        this._searchService.setActualReactions();
        ////// //////////////console.log(this._searchService.registros);
      }else{
        this._searchService.registros = [];
      }
    } else {
      // this._notifyService.Toast.fire({
      // title: resp.message,
      // text: '¡Gracias por unirte a Mercado Pyme!',
      // icon: "error",
      // });
      ////// //////////////console.log(resp,' existe el error');
      this.GlobalConfigService.spinner = false;
    }

    this.GlobalConfigService.spinner = false;
  });


  }

  async searchByCategory(argumento: string, child:string = null, idPadre: string = null, idChild: string = null){


    //////////console.log('veces que se llama', argumento);
    //////////////console.log('category from category');

    ////////////console.log('idPadre', idPadre);
    ////////////console.log('idChild', idChild);

  // return;

    this._searchService.catState.base = argumento;
    this._searchService.catState.child = (child != null && child != '')? child : null;
    this._searchService.paginator = [];
    //////////////console.log(this._searchService.catState);

  let l = {
    categoryp: argumento,
    child: (child != null && child != '')? child : null,
    typeFind: 'category',
    movil: this.GlobalConfigService.isMobile()
  }


  let params = {
    busqueda: (child != null && child != '')? 'catSub' : 'categoria',
    categoria: argumento,
    subCategoria: (child != null && child != '')? child : null,

  }
  var parms = null;
  this._searchService.setParameters(params, 0);
  parms = params;
  // await this._searchService.getParameters().then(resp => {
  //   // // //////////////console.log('la respuesta de parametros', resp);
  //   parms = resp;
  // });

  var ppp = {
    params: parms,
    change: 'new',
    idPadre: (idPadre != null)? idPadre: null,
    idChild: (idChild != null)? idChild: null,
  }

  // //////////////console.log('params enviados ppp', ppp);

  var args = this._searchService.changePaginator(ppp);

  this.GlobalConfigService.spinner = true;

  // //////////////console.log('los argumentos que se mandan', args);

  this._searchService.searchByCategoryPOST(args).subscribe((resp) => {

    // // //////////////console.log('por categorias', resp.data);

    if (resp.status == 200 && resp.ok == true) {

      if ((resp.data) &&  resp.data.length > 0 ) {


        this._searchService.homeTitleResults = 'Resultados';


        this._searchService.registros = resp.data;
        this._searchService.paginator = resp.paginator || null;
        this._searchService.setActualReactions();

        // //////////////console.log('como queda el paginador', this._searchService.paginator);

        if(this.GlobalConfigService.isMobile() == true){

          this.GlobalConfigService.selectorElement('.productList h5.titleSection').then(r => {

            this.GlobalConfigService.scrollIt(r);

            //////////////console.log('se mueve a', r);

          });

        }

        //// //////////////console.log('actualiza', this._searchService.registros);
      } else {
        //
        this._searchService.registros = [];
        this._searchService.paginator = [];
      }
    } else {
      // this._notifyService.Toast.fire({
      // title: resp.message,
      // text: '¡Gracias por unirte a Mercado Pyme!',
      // icon: "error",
      // });
    }

    this.GlobalConfigService.spinner = false;

  });


  }



  getAll() {
    this.GlobalConfigService.spinner = true;
    this._searchService.setFirstLookPOST().subscribe((resp) => {
      // ////// //////////////console.log(resp);

      this._searchService.setParameters({busqueda: 'todo'}, 0);

      if (resp.status == 200 && resp.ok == true) {

        if ((resp.data) &&  resp.data.length > 0 ) {



          this._searchService.homeTitleResults = 'Destacados';


this._searchService.registros = resp.data;
          this._searchService.paginator = resp.paginator || null;
          this._searchService.setActualReactions();

        } else {
          //
          this._searchService.registros = []
        }
      } else {

      }

      this.GlobalConfigService.spinner = false;
    }, error => {

      this.GlobalConfigService.spinner = false;
    });
  }



  claseOcultar(){

    if(this.GlobalConfigService.isMobile() == true){

      this.claseHide = 'none';

    }else{
      this.claseHide = 'block';
    }

  }



  goResults(){

    if(this.GlobalConfigService.isMobile() == true){

      this.GlobalConfigService.selectorElement('.productList h5.titleSection').then(r => {

        this.GlobalConfigService.scrollIt(r);

        //////////////console.log('se mueve a', r);

      });

    }


  }


}
