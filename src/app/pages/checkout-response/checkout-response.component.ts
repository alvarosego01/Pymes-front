import { Component, OnInit } from '@angular/core';
import { SearchService, PaymentService, NotifyService } from 'src/app/services/service.index';
import { GlobalConfigService } from 'src/app/services/-global-config.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout-response',
  templateUrl: './checkout-response.component.html',
  styleUrls: ['./checkout-response.component.sass']
})
export class CheckoutResponseComponent implements OnInit {


      //Referencia de payco que viene por url
      // var ref_payco = getQueryParam('ref_payco');
      // Url Rest Metodo get, se pasa la llave y la ref_payco como paremetro
      // var urlapp = "https://api.secure.payco.co/validation/v1/erence/" + ref_payco;


      refEpayco: string = null;

      idFactura: string = null;
      factura: any = null;

      consultEpayco: any = null;




      // if (response.success) {

      //   if (response.data.x_cod_response == 1) {
      //     //Codigo personalizado
      //     alert("Transaccion Aprobada");

      //     ////// console.log('transacción aceptada');
      //   }
      //   //Transaccion Rechazada
      //   if (response.data.x_cod_response == 2) {
      //     ////// console.log('transacción rechazada');
      //   }
      //   //Transaccion Pendiente
      //   if (response.data.x_cod_response == 3) {
      //     ////// console.log('transacción pendiente');
      //   }
      //   //Transaccion Fallida
      //   if (response.data.x_cod_response == 4) {
      //     ////// console.log('transacción fallida');
      //   }

      //   $('#fecha').html(response.data.x_transaction_date);
      //   $('#respuesta').html(response.data.x_response);
      //   $('#referencia').text(response.data.x_id_invoice);
      //   $('#motivo').text(response.data.x_response_reason_text);
      //   $('#recibo').text(response.data.x_transaction_id);
      //   $('#banco').text(response.data.x_bank_name);
      //   $('#autorizacion').text(response.data.x_approval_code);
      //   $('#total').text(response.data.x_amount + ' ' + response.data.x_currency_code);


      // } else {
      //   alert("Error consultando la información");
      // }


  constructor(
    public _searchService: SearchService,
    public _paymentService: PaymentService,
    public _notifyService: NotifyService,
    public activatedRoute: ActivatedRoute,
    public GlobalConfigService: GlobalConfigService,
  ) {


  //this.contents = '';

    this.GlobalConfigService.setTitle('Estado de transacción');

    this.getParam();


   }

  ngOnInit(): void {
  }



  async getParam(){

    await this._searchService.getParameters().then( async (r: any) => {

      ////// console.log('params', r);

      await this.activatedRoute.params.subscribe( async (params) => {
        let id = params["id"];
        this.idFactura = id;

        await this.getFacturaById(id).then((r: any) => {
          this.factura = r.data;
          ////// console.log('la factura', this.factura);
        }, err => {

        });

        if(
            params['validate'] != null &&
            params['validate'] == 'verify' &&
            this.factura.status == false
          ){

            this.confirmBillPUT();

          }


      });



    }, err => {

    })

  }


  async confirmBillPUT(){


    await this._searchService.getParameters().then( async (r: any) => {

      ////// console.log('params', r);

      if(r.ref_payco != null){
        this.refEpayco = r.ref_payco;
        await this.paymentVerify(this.refEpayco).then(r => {

          this.consultEpayco = r;

          ////// console.log('la maldita consulta de epayco', this.consultEpayco);

        }, err => {

        });
      }else{

      }

    });


    let l = {
      idFactura: this.idFactura,
      consultEpayco: this.consultEpayco || null,
      refEpayco: this.refEpayco,
      validate: true,
    }
    this.GlobalConfigService.spinner = true;
    this._paymentService.confirmBillPUT(l).subscribe( async (resp: any) => {

      //// console.log('la maldita respuesta', resp);

      let n = {
        type: 'nBillPayed',
        idPost: resp.data.bill.post,
        idUser: resp.data.bill.user,
        // idForeign: ,
        infoData: resp.data.bill,
      }

      //// console.log('manda notif', n);

      await this._notifyService.sendNotifyEmailPOST(n).subscribe((resp: any) => {

      }, err => {

      });




      this._notifyService.Toast.fire({
        title: resp.message,
        text: `Estado ${resp.data.status}`,
        icon: 'success'
      })




      this.GlobalConfigService.spinner = false;

      let url = document.URL;
      url = url.replace('/verify', '');


      window.location.href = url;

      // location.reload();
    }, (err: any) => {

      this._notifyService.Toast.fire({
        title: err.message,
        text: `Estado ${err.data.status}`,
        icon: 'error'
      })
      this.GlobalConfigService.spinner = false;
    });

  }

  paymentVerify(ref: string){
return new Promise((resolve,reject) => {

  this._paymentService.paymentVerifyGET(ref).subscribe((resp: any) => {

    ////// console.log('los parametros de epayco a consulta', resp);

    resolve(resp);

  }, (err) => {

  });

})
  }

  getFacturaById(id){

    return new Promise((resolve, reject) => {


      this.GlobalConfigService.spinner = true;

      this._paymentService.getFacturaByIdGET(id).subscribe((resp: any) => {


        resolve(resp);



      this.GlobalConfigService.spinner = false;
    }, (err) => {

      this.GlobalConfigService.spinner = false;
    });

  })

  }


}
