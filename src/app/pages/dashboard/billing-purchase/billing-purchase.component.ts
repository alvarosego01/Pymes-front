import { Component, OnInit } from '@angular/core';
import { NotifyService,   UsersService, PaymentService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-billing-purchase',
  templateUrl: './billing-purchase.component.html',
  styleUrls: ['./billing-purchase.component.sass']
})
export class BillingPurchaseComponent implements OnInit {



  registros: any = null;

  paginator: any = null;

  constructor(
    public _userService: UsersService,
    public _paymentService: PaymentService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public route: Router
  ) {

    this.GlobalConfigService.setTitle('Facturación y compras');

     this.getBillsByUser();



  }

  ngOnInit(): void {
  }






  getBillsByUser(paginate: number = 1){

    this.GlobalConfigService.spinner = true;
    this._paymentService.getBillsByUserGET(paginate).subscribe((resp) => {


      var data = resp.data;
      this.registros = data;
      this.paginator = resp.paginator;

      //console.log('facturas', this.registros);
      this.GlobalConfigService.spinner = false;
    }, (err) => {

      this._notifyService.Toast.fire({
        title: 'Algo ha salido mal, intente más tarde',
        icon: 'error'
      });

      console.error(err.message);

      this.GlobalConfigService.spinner = false;
    });

  }

  newPageResponse(paginate){

    this.getBillsByUser(paginate);

  }

}
