import { Component, OnInit, ViewChild, ElementRef, OnDestroy,  } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import {   SearchService, UsersService, CategoryService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy  {

  banner:string = '';

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";


  params: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService,
    public _searchService: SearchService,
    public _userService: UsersService,
    public _categoryService: CategoryService
  ) {


    this.GlobalConfigService.setTitle('Inicio');


    this.activatedRoute.queryParams.subscribe( params => {

      this.params = params;

    });


   }


  cargarBibliotecaCategorias(){
    //// console.log('se buscan las categorias');

    return  new Promise((resolve, reject) => {
      this._categoryService.getCategoryGET().subscribe( response => {

        // this._categoryService.allCategoryList = response.data;

        resolve(response.data);

        // //// console.log('base de categorias', this._categoryService.allCategoryList);

      }, err => {

        reject(false);
      });
    })

  }

  async ngOnDestroy() {


    // this._searchService.registros

    this._searchService.registros = [];
    this._searchService.paginator = [];
    this._searchService.publications = [];

  }


  async ngOnInit() {


    await this.cargarBibliotecaCategorias().then( r => {

      this._categoryService.allCategoryList = r;
    }, err => {

      // console.error('error', err);
    })


    // this.activatedRoute.queryParams.subscribe( params => {



      // // ////// console.log('los parametros', params);
      // ////// console.log('params url', params);
      //// console.log('los malditos parametros', this.params);
      if(Object.keys(this.params).length == 0){

        //// console.log('no hay parametros');
        this.setFirstLook();
        // this._searchService.setParameters();

      }else

      if(this.params.busqueda == 'todo' ){

        //// console.log('caso todo');
        this.setFirstLook();
      }else
      if((this.params.busqueda == 'categoria' || this.params.busqueda == 'catSub')
      // && (!this._searchService.paginator)
      ){
        this._searchService.catState.base = this.params.categoria;
        this._searchService.catState.child = (this.params.subCategoria != null && this.params.subCategoria != '')? this.params.subCategoria : null;

        this.searchByCategory(this.params.categoria, this.params.subCategoria);

      }else
      if(this.params.busqueda == 'ubicacion'){


          // this._searchService.paginator = [];

    let pars = null;
    await this._searchService.getParameters().then(resp => {
      // // ////// console.log('la respuesta de parametros', resp);
      pars = resp;
    });

    ////// console.log('en este caso ', pars);

    let parms = {};

    if((pars) && pars.categoria != null && pars.categoria != ''){

      let params = {
        busqueda: 'ubicacion',
        city: this.params.city,
        categoria: (pars.categoria != null && pars.categoria != '')? pars.categoria : null,
        subCategoria: (pars.subCategoria != null && pars.subCategoria != '')? pars.subCategoria : null,
        // pagina: (pars.pagina != null && pars.pagina != '')? pars.pagina : null

      }

      parms = params;
      this._searchService.setParameters(parms, 0);

    }else{

      let params = {
        busqueda: 'ubicacion',
        city: this.params.city,

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


  var args = this._searchService.changePaginator(ppp);



this.GlobalConfigService.spinner = true;
this._searchService.searchByTextPOST(args).subscribe((resp) => {
  // ////// ////// console.log(resp);

  if ((resp.data) &&  resp.data.length > 0 ) {



    this._searchService.homeTitleResults = 'Resultados';

this._searchService.registros = resp.data;
    this._searchService.paginator = resp.paginator || null;
    this._searchService.setActualReactions();


    if(this.GlobalConfigService.isMobile() == true){

      this.GlobalConfigService.selectorElement('.productList h5.titleSection').then(r => {

        this.GlobalConfigService.scrollIt(r);


      });

    }


  } else {

    this._searchService.registros = [];
    this._searchService.paginator = [];
  }

  this.GlobalConfigService.spinner = false;
});


      }
      if(this.params.busqueda == 'buscador'){

        // console.log('en buscador', this.params);
        // busqueda: "buscador"
// title: "hogar"

this._searchService.paginator = [];


let params = {
  busqueda: 'buscador',
  title: this.params.title
}

this._searchService.setParameters(params, 0);

var parms = params;

var ccc = {
  params: parms,
  change: 'new',
  title: this.params.title
}


var args = this._searchService.changePaginator(ccc);

  this.GlobalConfigService.spinner = true;
  this._searchService.searchByTextPOST(args).subscribe((resp) => {
    // ////// ////// console.log(resp);
    if (resp.status == 200 && resp.ok == true) {

      if ((resp.data) &&  resp.data.length > 0 ) {

        ////// console.log('la respuesta de la busqueda', resp);

        this._searchService.homeTitleResults = 'Resultados';
        this._searchService.registros = resp.data;
        this._searchService.paginator = resp.paginator || null;
        this._searchService.setActualReactions();

        ////// ////// console.log(this._searchService.registros);
      }else{
        this._searchService.registros = [];
      }


    } else {

    }

    this.GlobalConfigService.spinner = false;
  });



      }
      else
      if(this.params.busqueda == 'flexible'){

      }else{

      }



        // ////// console.log(params);




    // });

  }




 async searchByCategory(argumento: string, child:string = null){

    ////// console.log('category from home');

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

    let pars = null;
    await this._searchService.getParameters().then(resp => {
      // // ////// console.log('la respuesta de parametros', resp);
      pars = resp;
    });




    var ppp = {
      params: pars,
      change: null
    }

    var args = this._searchService.changePaginator(ppp);
    this._searchService.setParameters(
      params,
      (pars.pagina >= 1)? pars.pagina : 0
      );

    this.GlobalConfigService.spinner = true;
    this._searchService.searchByCategoryPOST(args).subscribe((resp) => {
      // ////// ////// console.log(resp);

      if (resp.status == 200 && resp.ok == true) {

        if ((resp.data) &&  resp.data.length > 0 ) {



          this._searchService.homeTitleResults = 'Resultados';

this._searchService.registros = resp.data;
          this._searchService.paginator = resp.paginator || null;
          this._searchService.setActualReactions();


          if(this.GlobalConfigService.isMobile() == true){

            this.GlobalConfigService.selectorElement('.productList h5.titleSection').then(r => {

              this.GlobalConfigService.scrollIt(r);

              ////// console.log('se mueve a', r);

            });

          }




        }else{

          ////// console.log('no recibbi nada');

          this._searchService.registros = [];
          this._searchService.paginator = [];

        }
      } else {

      }

      this.GlobalConfigService.spinner = false;

    });


    }


    isMobile() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if(width <= 1000){
        return true;
      }else{
        return false;
      }
      // return width <= 1000;
    }


    setBanner(){

      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      let img = '../../../assets/resourcesWeb/banners/movil-banner.jpg';

      if(width >= 768 && width <= 1000){
         img = '../../../assets/resourcesWeb/banners/movil-banner.jpg';

         // return true;
        }

        if(width <= 767){
          img = '../../../assets/resourcesWeb/banners/movil-banner.jpg';

      }
      return img;

    }


    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }


  setFirstLook() {

    //// console.log('llama first');
    this.GlobalConfigService.spinner = true;
    this._searchService.setFirstLookPOST().subscribe((resp) => {
      // ////// ////// console.log(resp);
      // ////// console.log('los resultadotes', resp);
      // this._searchService.setParameters({busqueda: 'todo'}, 0, 12);
      if (resp.status == 200 && resp.ok == true) {

        if ((resp.data) &&  resp.data.length > 0 ) {



          this._searchService.homeTitleResults = 'Destacados';

this._searchService.registros = this.shuffle(resp.data);
          this._searchService.paginator = resp.paginator || null;
          this._searchService.setActualReactions();

        } else {
          //
        }
      } else {

      }

      this.GlobalConfigService.spinner = false;
    }, error => {

      this.GlobalConfigService.spinner = false;
    });
  }





}
