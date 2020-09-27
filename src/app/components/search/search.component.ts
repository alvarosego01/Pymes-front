import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {   SearchService } from 'src/app/services/service.index';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
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
    public _ActivatedRoute: ActivatedRoute

  ) {


  }

  async ngOnInit() {

}
    // console.log('this', this.constructor.name);

    async getRouterComponent() {

      return new Promise( async (resolve,reject) => {

        await this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {

            const firstChild = this._ActivatedRoute.snapshot.firstChild;
            console.log('firstChild', firstChild)
            resolve(firstChild)
          }
        });
      })

    }




async searchByText(forma: NgForm){

    if(forma.value.Busqueda == null || forma.value.Busqueda == '' ){

        return;
    }
    this._searchService.paginator = [];

    // console.log('this.constructor.name', this.constructor.name);
    // if( (this.constructor.name != null)  && (String(this.constructor.name) !== 'HomeComponent')){
    //   console.log('entra',this.constructor.name);
    //   this.router.navigate([`/home?busqueda=buscador&title=${forma.value.Busqueda}`]);

    //   return;
    // }

    let rc = this._ActivatedRoute.snapshot.firstChild.routeConfig.path || null;
    if(  (rc != null) && ( rc != 'home' && rc != '**' ) ){
      this.router.navigate([`/home?busqueda=buscador&title=${forma.value.Busqueda}`]);
      return;
    }



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

}
