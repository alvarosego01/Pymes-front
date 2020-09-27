import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-global-paginator',
  templateUrl: './global-paginator.component.html',
  styleUrls: ['./global-paginator.component.sass']
})
export class GlobalPaginatorComponent implements OnInit {

  // paginator: any = [];


  @Input("paginator") paginator: any = null;

  @Output() newPageResponse  =  new EventEmitter<number>();

  constructor(
    public GlobalConfigService:GlobalConfigService

  ) { }

  ngOnInit(): void {

    ////// console.log('paginator paginate', this.paginator);

  }


  repeat(n: number): any[] {
    return Array(n);
  }



   globalPaginator(type: string){

    let pg = null;

    if( Number(type) && (this.paginator.currentPage ==  Number(type)) ){

      return;
    }else if( Number(type) && (this.paginator.currentPage != Number(type)) ){

      pg = Number(type);
      this.newPageResponse.emit(pg);
    }

    if( type == 'prev' && this.paginator.prev == null ){

      return;

    }else if( type == 'prev' && this.paginator.prev != null ){

      pg = this.paginator.prev;
      this.newPageResponse.emit(pg);
    }

    if(type == 'next' && this.paginator.next == null){

      return;
    }else if( type == 'next' && this.paginator.next != null ){

      pg = this.paginator.next;
      this.newPageResponse.emit(pg);
    }


  }

}
