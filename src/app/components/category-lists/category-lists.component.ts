import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { GlobalConfigService, SearchService, NotifyService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

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

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public GlobalConfigService: GlobalConfigService,
    public _searchService: SearchService,
    public _notifyService: NotifyService
  ) { }

  ngOnInit(): void {

    this.claseOcultar();

  }


  searchByOrder( tipo, orden ){
    // /orderBy/:p/:t

    let l = {
      p: tipo,
      t: orden
    }

    // this.GlobalConfigService.spinner = true;
    this._searchService.searchByOrderPOST(l).subscribe((resp) => {
      // ////// console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        if( resp.data.length > 0  && resp.data.length > 0){

this._searchService.registros = resp.data;
          this._searchService.setActualReactions();
          ////// console.log(this._searchService.registros);
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


  sendSearchByUbicacion(forma: NgForm){

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


let l = {
  title: forma.value.city,
  typeFind: 'city'
}
this._searchService.paginator = [];
this.GlobalConfigService.spinner = true;
this._searchService.searchByTextPOST(l).subscribe((resp) => {
  // ////// console.log(resp);

  if (resp.status == 200 && resp.ok == true) {
    // this._notifyService.Toast.fire({
    // ////// console.log(resp);
    // this._notifyService.Toast.fire({
    //   title: resp.message,
    //   // text: '¡Gracias por unirte a Mercado Pyme!',
    //   icon: "success",
    // });

    if( resp.data.length > 0  && resp.data[0].length > 0){

this._searchService.registros = resp.data[0];
      this._searchService.setActualReactions();
      ////// console.log(this._searchService.registros);
    }else{
      this._searchService.registros = [];
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
    // ////// console.log(resp);


    if (resp.status == 200 && resp.ok == true) {
      // this._notifyService.Toast.fire({
      // ////// console.log(resp);
      // this._notifyService.Toast.fire({
      //   title: resp.message,
      //   // text: '¡Gracias por unirte a Mercado Pyme!',
      //   icon: "success",
      // });

      if( resp.data.length > 0  && resp.data[0].length > 0){

this._searchService.registros = resp.data[0];
        this._searchService.setActualReactions();
        ////// console.log(this._searchService.registros);
      }else{
        this._searchService.registros = [];
      }
    } else {
      // this._notifyService.Toast.fire({
      // title: resp.message,
      // text: '¡Gracias por unirte a Mercado Pyme!',
      // icon: "error",
      // });
      ////// console.log(resp,' existe el error');
      this.GlobalConfigService.spinner = false;
    }

    this.GlobalConfigService.spinner = false;
  });


  }

  async searchByCategory(argumento: string, child:string = null){

    console.log('category from category');

    this._searchService.catState.base = argumento;
    this._searchService.catState.child = (child != null && child != '')? child : null;
    this._searchService.paginator = [];
    // // console.log(this.catState);

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
  await this._searchService.getParameters().then(resp => {
    // // console.log('la respuesta de parametros', resp);
    parms = resp;
  });

  var ppp = {
    params: parms,
    change: 'new'
  }

  // console.log('params enviados', ppp);

  var args = this._searchService.changePaginator(ppp);


  // console.log('lo que se pide por categoria', l);

  this._searchService.setParameters(params, 0);

  this.GlobalConfigService.spinner = true;
  this._searchService.searchByCategoryPOST(args).subscribe((resp) => {

    // // console.log('por categorias', resp.data);

    if (resp.status == 200 && resp.ok == true) {

      if ((resp.data) &&  resp.data.length > 0 ) {


        this._searchService.homeTitleResults = 'Resultados';


        this._searchService.registros = resp.data;
        this._searchService.paginator = resp.paginator || null;
        this._searchService.setActualReactions();

        // console.log('como queda el paginador', this._searchService.paginator);

        if(this.GlobalConfigService.isMobile() == true){

          this.GlobalConfigService.selectorElement('#listado').then(r => {

            this.GlobalConfigService.scrollIt(r);

            console.log('se mueve a', r);

          });

        }

        //// console.log('actualiza', this._searchService.registros);
      } else {
        //
        this._searchService.registros = [];
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
      // ////// console.log(resp);



      this._searchService.setParameters({busqueda: 'todo'}, 0);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // ////// console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });
        if (resp.data.length > 0 && resp.data[0].length > 0) {

this._searchService.registros = resp.data[0];
          this._searchService.setActualReactions();



          //// console.log('actualiza', this._searchService.registros);
        } else {
          //
          this._searchService.registros = []
        }
      } else {
        // this._notifyService.Toast.fire({
        // title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        // icon: "error",
        // });
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

      this.GlobalConfigService.selectorElement('#listado').then(r => {

        this.GlobalConfigService.scrollIt(r);

        console.log('se mueve a', r);

      });

    }


  }


}
