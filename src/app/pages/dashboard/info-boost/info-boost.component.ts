import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NotifyService, Filebase64Service, PaymentService } from 'src/app/services/service.index';
import { PostsService } from 'src/app/services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';
import { BoostServiceService } from 'src/app/services/boost-service.service';

@Component({
  selector: 'app-info-boost',
  templateUrl: './info-boost.component.html',
  styleUrls: ['./info-boost.component.sass']
})
export class InfoBoostComponent implements OnInit {


  boost: any = null;

    constructor(


    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _postService: PostsService,
    public _fileBase64: Filebase64Service,
    public router: Router,
    public _paymentService: PaymentService,
    public _boostService: BoostServiceService,
    public activatedRoute: ActivatedRoute

  ) {

    activatedRoute.params.subscribe((params) => {
      let id = params["id"];


      this.getInfoBoostById(id);

    });


   }

  ngOnInit(): void {
  }



  getInfoBoostById(id: string){

    this.GlobalConfigService.spinner = true;
    this._boostService.getInfoBoostByIdGET(id).subscribe((resp) => {
        var data = resp.data;

        this._notifyService.Toast.fire({
          text: resp.message,
          icon: 'success'
        })

        this.boost = data;

        this.GlobalConfigService.spinner = false;
      }, (err) => {


        this._notifyService.Toast.fire({
          text: 'Algo ha salido mal',
          icon: 'error'
        })

        console.error(err.message);

        this.GlobalConfigService.spinner = false;
      });

  }



  openOPC(){

  }


}
