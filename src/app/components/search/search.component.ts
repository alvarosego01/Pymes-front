import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalConfigService, SearchService } from 'src/app/services/service.index';

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
    public _searchService: SearchService

  ) { }

  ngOnInit(): void {
  }





  searchByText(forma: NgForm){

    if(forma.value.Busqueda == null || forma.value.Busqueda == '' ){

        return;
    }

    let l = {
      title: forma.value.Busqueda.toLowerCase(),
      typeFind: 'buscador'
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


        if( resp.data.length > 0  && resp.data[0].length > 0 ){

          this._searchService.registros = resp.data[0];

          ////console.log(this._searchService.registros);
        }else{
          this._searchService.registros = [];
        }

        // if(!this.url.path().includes("/home") || (this.url.path().length == 1) ){
        //   this.router.navigate(["/home"]);
        // }


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

}
