import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PaymentService, NotifyService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';
import { BoostServiceService } from 'src/app/services/boost-service.service';

@Component({
  selector: 'app-purchase-stats',
  templateUrl: './purchase-stats.component.html',
  styleUrls: ['./purchase-stats.component.sass']
})
export class PurchaseStatsComponent implements OnInit {


  registros: any = null;
  boosts: any = null;

  registrosPaginator: any = null;
  boostsPaginator: any = null;

  constructor(

    public _userService: UsersService,
    public _paymentService: PaymentService,
    public _notifyService: NotifyService,
    public _boostService: BoostServiceService,
    public GlobalConfigService: GlobalConfigService,
    public route: Router

  ) {
    this.GlobalConfigService.setTitle('Ordenes y ventas');
    this.getAllInfo();

  }

  ngOnInit(): void {
  }


   getAllInfo(){

    this.GlobalConfigService.spinner = true;
   Promise.all([
      this.getAllBills(),
      this.getAllBoost()
    ]).then( r => {

      this.GlobalConfigService.spinner = false;
    }, err => {

      this.GlobalConfigService.spinner = false;
    })

  }


  getAllBills(paginate: number = 1){
    return new Promise((resolve, reject) => {

      this._paymentService.getAllBills(paginate).subscribe((resp) => {



      var data = resp.data;
      this.registros = data;

      this.registrosPaginator = resp.paginator;

      ////// console.log('facturas', this.registros);
      resolve();
    }, (err) => {



      console.error(err.message);
      reject();
    });
  })

  }



    getAllBoost(paginate: number = 1){

      return new Promise((resolve, reject) => {

        this._boostService.getAllBoostGET(paginate).subscribe((resp) => {



        var data = resp.data;
        this.boosts = data;

        this.boostsPaginator = resp.paginator;

        ////// console.log('boosts', this.boosts);
        resolve();
      }, (err) => {



        console.error(err.message);
        reject();
      });
    })

    }




    newPageResponseRegistros(paginate){

      this.GlobalConfigService.spinner = true;
      this.getAllBills(paginate).then(r => {

        this.GlobalConfigService.spinner = false;
      }, err => {

        this.GlobalConfigService.spinner = false;
    });

  }

  newPageResponseBoost(paginate){

      this.GlobalConfigService.spinner = true;
      this.getAllBoost(paginate).then(r => {

        this.GlobalConfigService.spinner = false;
      }, err => {

        this.GlobalConfigService.spinner = false;
    });

  }



}




