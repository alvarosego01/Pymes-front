import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { _globalConfig, SearchService, NotifyService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-lists',
  templateUrl: './category-lists.component.html',
  styleUrls: ['./category-lists.component.sass']
})
export class CategoryListsComponent implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
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

    // this._globalConfig.spinner = true;
    this._searchService.searchByOrderPOST(l).subscribe((resp) => {
      // //console.log(resp);

      if (resp.status == 200 && resp.ok == true) {
        // this._notifyService.Toast.fire({
        // //console.log(resp);
        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   // text: '¡Gracias por unirte a Mercado Pyme!',
        //   icon: "success",
        // });

        // //console.log(resp);
        // this._globalConfig.spinner = false;
        // return;

        if( resp.data.length > 0  && resp.data.length > 0){
          this._searchService.registros = resp.data;
          this._searchService.setActualReactions();
          //console.log(this._searchService.registros);
        }else{
          this._searchService.registros = [];
        }
        this._globalConfig.spinner = false;
      } else {
        // this._notifyService.Toast.fire({
        // title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        // icon: "error",
        // });
        this._globalConfig.spinner = false;
      }

      this._globalConfig.spinner = false;

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

this._globalConfig.spinner = true;
this._searchService.searchByTextPOST(l).subscribe((resp) => {
  // //console.log(resp);

  if (resp.status == 200 && resp.ok == true) {
    // this._notifyService.Toast.fire({
    // //console.log(resp);
    // this._notifyService.Toast.fire({
    //   title: resp.message,
    //   // text: '¡Gracias por unirte a Mercado Pyme!',
    //   icon: "success",
    // });

    if( resp.data.length > 0  && resp.data[0].length > 0){
      this._searchService.registros = resp.data[0];
      this._searchService.setActualReactions();
      //console.log(this._searchService.registros);
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

  this._globalConfig.spinner = false;
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

  this._globalConfig.spinner = true;
  this._searchService.searchByCategoryPOST(l).subscribe((resp) => {
    // //console.log(resp);


    if (resp.status == 200 && resp.ok == true) {
      // this._notifyService.Toast.fire({
      // //console.log(resp);
      // this._notifyService.Toast.fire({
      //   title: resp.message,
      //   // text: '¡Gracias por unirte a Mercado Pyme!',
      //   icon: "success",
      // });

      if( resp.data.length > 0  && resp.data[0].length > 0){
        this._searchService.registros = resp.data[0];
        this._searchService.setActualReactions();
        //console.log(this._searchService.registros);
      }else{
        this._searchService.registros = [];
      }
    } else {
      // this._notifyService.Toast.fire({
      // title: resp.message,
      // text: '¡Gracias por unirte a Mercado Pyme!',
      // icon: "error",
      // });
      //console.log(resp,' existe el error');
      this._globalConfig.spinner = false;
    }

    this._globalConfig.spinner = false;
  });


  }

  searchByCategory(argumento: string){



  let l = {
    categoryp: argumento,
    typeFind: 'category'
  }

  this._globalConfig.spinner = true;
  this._searchService.searchByCategoryPOST(l).subscribe((resp) => {
    // //console.log(resp);

    if (resp.status == 200 && resp.ok == true) {
      // this._notifyService.Toast.fire({
      // //console.log(resp);
      // this._notifyService.Toast.fire({
      //   title: resp.message,
      //   // text: '¡Gracias por unirte a Mercado Pyme!',
      //   icon: "success",
      // });

      if( resp.data.length > 0  && resp.data[0].length > 0){
        this._searchService.registros = resp.data[0];
        this._searchService.setActualReactions();
        //console.log(this._searchService.registros);
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

    this._globalConfig.spinner = false;

  });


  }

}
