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

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public GlobalConfigService: GlobalConfigService,
    public _searchService: SearchService,
    public _notifyService: NotifyService
  ) { }

  ngOnInit(): void {
  }


  searchByOrder( tipo, orden ){
    // /orderBy/:p/:t

    let l = {
      p: tipo,
      t: orden
    }

    // this.GlobalConfigService.spinner = true;
    this._searchService.searchByOrderPOST(l).subscribe((resp) => {
      // ////console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // ////console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });

        // ////console.log(resp);
        // this.GlobalConfigService.spinner = false;
        // return;

        if( resp.data.length > 0  && resp.data.length > 0){
          this._searchService.registros = resp.data;
          this._searchService.setActualReactions();
          ////console.log(this._searchService.registros);
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

this.GlobalConfigService.spinner = true;
this._searchService.searchByTextPOST(l).subscribe((resp) => {
  // ////console.log(resp);

  if (resp.status == 200 && resp.ok == true) {
    // this._notifyService.Toast.fire({
    // ////console.log(resp);
    // this._notifyService.Toast.fire({
    //   title: resp.message,
    //   // text: '¡Gracias por unirte a Mercado Pyme!',
    //   icon: "success",
    // });

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
    // ////console.log(resp);


    if (resp.status == 200 && resp.ok == true) {
      // this._notifyService.Toast.fire({
      // ////console.log(resp);
      // this._notifyService.Toast.fire({
      //   title: resp.message,
      //   // text: '¡Gracias por unirte a Mercado Pyme!',
      //   icon: "success",
      // });

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
      ////console.log(resp,' existe el error');
      this.GlobalConfigService.spinner = false;
    }

    this.GlobalConfigService.spinner = false;
  });


  }

  searchByCategory(argumento: string, child:string = null){



    this._searchService.catState.base = argumento;
    this._searchService.catState.child = (child != null && child != '')? child : null;

    // console.log(this.catState);

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



  getAll() {
    this.GlobalConfigService.spinner = true;
    this._searchService.setFirstLookPOST().subscribe((resp) => {
      // ////console.log(resp);



      this._searchService.setParameters({busqueda: 'todo'}, 0, 12);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // ////console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });
        if (resp.data.length > 0 && resp.data[0].length > 0) {
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
