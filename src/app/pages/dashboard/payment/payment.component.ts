import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
// import { _PostModel } from "src/app/models/postModel"
// _PostModel
import { PostsService } from "../../../services/posts.service";
import {
  NotifyService,
  FormsResourcesService,
  CategoryService,
  PaymentService,
  //  PostsService
} from "src/app/services/service.index";
import { Filebase64Service } from "src/app/services/filebase64.service";
import { NumberFormatPipe } from "src/app/pipes/number-format.pipe";
import { ProfileViewComponent } from "../../profile-view/profile-view.component";
import { _PostModel } from "src/app/models/postModel";
import { GlobalConfigService } from "src/app/services/-global-config.service";


import { FormResourcePipe } from 'src/app/pipes/form-resource.pipe';


import * as moment from 'moment';
import { _SITEURL, _SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {


  factura: any = null;

  telf: string = null;




  constructor(

    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService,
    public _fileBase64: Filebase64Service,
    public _formsResource: FormsResourcesService,
    public router: Router,
    public _paymentService: PaymentService,
    public activatedRoute: ActivatedRoute

  ) {

    const dateMoment = moment().locale('es');

    activatedRoute.params.subscribe((params) => {
      let id = params["id"];


      this.getFacturaById(id);

    });



  }

  ngOnInit(): void {


  }

  getFacturaById(id){

    this.GlobalConfigService.spinner = true;

    this._paymentService.getFacturaByIdGET(id).subscribe((resp: any) => {

      this.factura = resp.data;

      this.GlobalConfigService.setTitle('Factura de cobro por servicios');


      //console.log('this factura', this.factura);

      this.GlobalConfigService.spinner = false;
    }, (err) => {


this.GlobalConfigService.spinner = false;

      this.router.navigate(["/dashboard"]);
});

  }


  processPay(){

    if(

      (this.factura.status == false) &&
      (
        (this._paymentService.getStatusEpayco( this.factura.process.status ) == 2 ) ||
        (this._paymentService.getStatusEpayco( this.factura.process.status ) == 3 )
      )

    ){

      this._notifyService.swalNormal.fire({
      title: "¿Deseas reintentar la transacción?",
      icon: "warning",

      confirmButtonText: 'Aceptar'

    }).then( (result) => {
      this.pagar();
    });

  }else{
    this.pagar();
  }


  }


  pagar() {

    if(this.factura.status == false){

      let type_doc_billing = '';

      if(this.factura.user.typeId == 'Cédula de ciudadania'){
        type_doc_billing = 'CC';
      }
      if(this.factura.user.typeId == 'Cédula de Extranjería'){
        type_doc_billing = 'CE';
      }
      if(this.factura.user.typeId == 'Pasaporte'){
        type_doc_billing = 'PPN';
      }

      let name = '';
      this.factura.description.forEach( (element, idx) => {

        if(element.days && element.days != ''){
         name = `Plan ${element.plan} - Publicación: ${ this.factura.post.title }`
        }else{
          name += ` - Plan ${element.plan}`;
        }

      });

    const data = {
      //Payment parameters
      name: name,
      description: name,
      invoice: this.factura.serial,
      currency: "cop",
      amount: this.factura.price,

      country: "co",
      lang: "es",
      //Onpage="false" - Standard="true"
      external: "false",
      //Atributos opcionales
      confirmation: `${_SITEURL}/checkoutResponse/${this.factura._id}/verify`,
      response: `${_SITEURL}/checkoutResponse/${this.factura._id}/verify`,
      // confirmation: `${_SERVICIOS}/paymentConfirmation/${this.factura._id}/`,
      // response: `${_SERVICIOS}/paymentConfirmation/${this.factura._id}/`,

      //Atributos cliente
      name_billing: `${this.factura.user.name} ${this.factura.user.surname}`,
      address_billing: `${this.factura.user.department} - ${this.factura.user.city}`,
      type_doc_billing: type_doc_billing,
      mobilephone_billing: this.factura.user.phone || this.factura.user.celPhone,
      number_doc_billing: this.factura.user.identification,

     //atributo deshabilitación metodo de pago
      methodsDisable: ["PSE","SP","CASH","DP"]


    }



    this._paymentService.open(data);

  }
}


// href="/checkoutResponse/{{ this.factura.post._id }}?ref_payco={{ this.factura.process.referencePay }}"
    // window.open(`/#/publication/infoPost/${id}`, '_blank');

    verFacturaEpayco(){


      // window.open(`/#/checkoutResponse/${this.factura.post._id}?ref_payco=${this.factura.process.referencePay}`);

      window.location.href = `/#/checkoutResponse/${this.factura.post._id}?ref_payco=${this.factura.process.referencePay}`;

    }

}
