import { Component, OnInit,  } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { GlobalConfigService, SearchService, UsersService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {



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

   }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      // console.log('los parametros', params);

      if(Object.keys(params).length == 0){

        // console.log('no hay parametros');
        this.setFirstLook();
        // this._searchService.setParameters();

      }else

      if(params.busqueda == 'todo' ){

        this.setFirstLook();
      }else
      if(params.busqueda == 'category' || params.busqueda == 'catSub'){


this.searchByCategory(params.categoria, params.subCategoria);

      }else

      if(params.busqueda == 'flexible'){

      }else{

      }



        console.log(params);




    });

  }




  searchByCategory(argumento: string, child:string = null){



    let l = {
      categoryp: argumento,
      child: (child != null && child != '')? child : null,
      typeFind: 'category'
    }


    let params = {
      busqueda: (child != null && child != '')? 'catSub' : 'categoria',
      categoria: argumento,
      subCategoria: (child != null && child != '')? child : null,

    }



    this._searchService.setParameters(params,0,12);

    this.GlobalConfigService.spinner = true;
    this._searchService.searchByCategoryPOST(l).subscribe((resp) => {
      // ////console.log(resp);

      if (resp.status == 200 && resp.ok == true) {

        if( resp.data.length > 0  && resp.data[0].length > 0){
          this._searchService.registros = resp.data[0];
          this._searchService.setActualReactions();
          ////console.log(this._searchService.registros);
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


    isMobile() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if(width <= 1000){
        return true;
      }else{
        return false;
      }
      // return width <= 1000;
    }



  setFirstLook() {
    this.GlobalConfigService.spinner = true;
    this._searchService.setFirstLookPOST().subscribe((resp) => {
      // ////console.log(resp);



      // this._searchService.setParameters({busqueda: 'todo'}, 0, 12);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // ////console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });
        if (resp.data.length > 0 && resp.data[0].length > 0) {

          this._searchService.homeTitleResults = 'Destacado';

          this._searchService.registros = resp.data[0];
          this._searchService.setActualReactions();



          //console.log('actualiza', this._searchService.registros);
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


}
