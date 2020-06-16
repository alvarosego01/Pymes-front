import { Component, OnInit, ViewChild, ElementRef,  } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { GlobalConfigService, SearchService, UsersService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  banner:string = '';

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";




  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService,
    public _searchService: SearchService,
    public _userService: UsersService
  ) {


    this.GlobalConfigService.setTitle('Inicio');

    console.log('se vuelve a llamar home');
   }

  ngOnInit(): void {



    this.activatedRoute.queryParams.subscribe(params => {

      // // console.log('los parametros', params);
      // console.log('params url', params);

      if(Object.keys(params).length == 0){

        // // console.log('no hay parametros');
        this.setFirstLook();
        // this._searchService.setParameters();

      }else

      if(params.busqueda == 'todo' ){

        this.setFirstLook();
      }else
      if((params.busqueda == 'categoria' || params.busqueda == 'catSub')
      // && (!this._searchService.paginator)
      ){
        this._searchService.catState.base = params.categoria;
        this._searchService.catState.child = (params.subCategoria != null && params.subCategoria != '')? params.subCategoria : null;

        this.searchByCategory(params.categoria, params.subCategoria);

      }else
      if(params.busqueda == 'buscador'){

      }
      else
      if(params.busqueda == 'flexible'){

      }else{

      }



        // console.log(params);




    });

  }




 async searchByCategory(argumento: string, child:string = null){

    console.log('category from home');

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
      // // console.log('la respuesta de parametros', resp);
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
      // ////// console.log(resp);

      if (resp.status == 200 && resp.ok == true) {

        if ((resp.data) &&  resp.data.length > 0 ) {



          this._searchService.homeTitleResults = 'Resultados';

this._searchService.registros = resp.data;
          this._searchService.paginator = resp.paginator || null;
          this._searchService.setActualReactions();


          if(this.GlobalConfigService.isMobile() == true){

            this.GlobalConfigService.selectorElement('#listado').then(r => {

              this.GlobalConfigService.scrollIt(r);

              console.log('se mueve a', r);

            });

          }


        }else{

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

      let img = '../../../assets/resourcesWeb/Banner.jpg';

      if(width >= 768 && width <= 1000){
         img = '../../../assets/resourcesWeb/Tablet.jpg';

         // return true;
        }

        if(width <= 767){
          img = '../../../assets/resourcesWeb/movilBanner.jpg';

      }
      return img;

    }


  setFirstLook() {
    this.GlobalConfigService.spinner = true;
    this._searchService.setFirstLookPOST().subscribe((resp) => {
      // ////// console.log(resp);
      // console.log('los resultadotes', resp);
      // this._searchService.setParameters({busqueda: 'todo'}, 0, 12);
      if (resp.status == 200 && resp.ok == true) {

        if ((resp.data) &&  resp.data.length > 0 ) {



          this._searchService.homeTitleResults = 'Destacados';


this._searchService.registros = resp.data;
          this._searchService.paginator = resp.paginator || null;
          this._searchService.setActualReactions();



  //         if(this.GlobalConfigService.isMobile() == true){


  //   setTimeout(() =>{
  //     var l  = document.querySelector('#listado');
  //     this.GlobalConfigService.scrollIt(l);
  //  });


  //         }

          //// console.log('actualiza', this._searchService.registros);
        } else {
          //
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



  ScrollLista(e){

  }




}
