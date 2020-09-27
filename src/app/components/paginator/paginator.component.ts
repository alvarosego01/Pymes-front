import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/service.index';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {


   urlParams: any = null;

  // itemCount: 6,
  // perPage: 4,
  // pageCount: 2,
  // currentPage: 1,
  // slNo: 1,
  // hasPrevPage: false,
  // hasNextPage: true,
  // prev: null,
  // next: 2


  constructor(
    public _searchService: SearchService,
       public GlobalConfigService:GlobalConfigService
  ) { }

  ngOnInit(): void {
  }


  repeat(n: number): any[] {
    return Array(n);
  }




  async paginate(type: any){

    // ////// console.log('pag', type);

    if(this._searchService.paginator.currentPage ==  Number(type) ){

      return;
    }

    if( type == 'prev' && this._searchService.paginator.prev == null ){

      return;

    }

    if(type == 'next' && this._searchService.paginator.next == null){

      return;
    }


    await this._searchService.getParameters().then(resp => {
      // // ////// console.log('la respuesta de parametros', resp);
      this.urlParams = resp;
    });

    var ppp = {
      params: this.urlParams,
      change: type
    }

    // //// console.log('')

    // //// console.log('params enviados desde paginador', ppp);

    var args = this._searchService.changePaginator(ppp);

    // //// console.log('args que se mandan desde paginador', args);

    this.GlobalConfigService.spinner = true;
    this._searchService.recallPaginatePOST(args).subscribe((resp) => {
      // ////// ////// console.log(resp);

      if (resp.status == 200 && resp.ok == true) {

        if ((resp.data) &&  resp.data.length > 0 ) {


        this._searchService.registros = resp.data;
          this._searchService.paginator = resp.paginator || null;
          this._searchService.setActualReactions();


          // // ////// console.log('paginador que regresa', this._searchService.paginator);
          // ////// console.log('los args cuando se regresa', args);

          // if(args.typeFind == 'all'){
          //   this._searchService.setParameters(
          //     {busqueda: 'todo'},
          //     resp.paginator.currentPage
          //     );

          //     this._searchService.homeTitleResults = 'Destacados';
          //   }


          //  if(args.typeFind == 'category') {

          //   this._searchService.setParameters(
          //     this.urlParams,
          //     resp.paginator.currentPage
          //     );

          //     this._searchService.homeTitleResults = 'Resultados';
          // }

          //  if(args.typeFind == 'buscador') {

          //   this._searchService.setParameters(
          //     this.urlParams,
          //     resp.paginator.currentPage
          //     );

          //     this._searchService.homeTitleResults = 'Resultados';
          // }


          //// ////// console.log('actualiza', this._searchService.registros);
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
