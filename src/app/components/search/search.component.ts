import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {   SearchService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  @Input("title") title: boolean = false;
  @Input("backGreen") backGreen: boolean = false;

  constructor(

    public GlobalConfigService: GlobalConfigService,
    public _searchService: SearchService,
    public router: Router,

  ) { }

  ngOnInit(): void {
  }





async searchByText(forma: NgForm){

    if(forma.value.Busqueda == null || forma.value.Busqueda == '' ){

        return;
    }


    this._searchService.paginator = [];


  let params = {
    busqueda: 'buscador',
    title: forma.value.Busqueda
  }

  this._searchService.setParameters(params, 0);


  var parms = params;

  var ppp = {
    params: parms,
    change: 'new',
    title: forma.value.Busqueda
  }



  var args = this._searchService.changePaginator(ppp);






    this.GlobalConfigService.spinner = true;
    this._searchService.searchByTextPOST(args).subscribe((resp) => {
      // ////// //////////////console.log(resp);
      if (resp.status == 200 && resp.ok == true) {

        if ((resp.data) &&  resp.data.length > 0 ) {

          //////////////console.log('la respuesta de la busqueda', resp);

          this._searchService.homeTitleResults = 'Resultados';
          this._searchService.registros = resp.data;
          this._searchService.paginator = resp.paginator || null;
          this._searchService.setActualReactions();

          ////// //////////////console.log(this._searchService.registros);
        }else{
          this._searchService.registros = [];
        }


      } else {

      }

      this.GlobalConfigService.spinner = false;
    });

  }

}
