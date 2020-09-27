import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PostsService } from 'src/app/services/posts.service';
import { PaymentService, NotifyService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-historial-billing-publication',
  templateUrl: './historial-billing-publication.component.html',
  styleUrls: ['./historial-billing-publication.component.sass']
})
export class HistorialBillingPublicationComponent implements OnInit {

  registros: any = null;

  paginator: any = null;

  postId: string = null;

  post: any = null;

  constructor(

    public _userService: UsersService,
    public _postService: PostsService,
    public _paymentService: PaymentService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public route: Router,
    public activatedRoute: ActivatedRoute

  ) {

    this.activatedRoute.params.subscribe( async (params) => {
      let id = params["id"];
      this.postId = id;

       this.getBillingByPost(1, id);

    });


  }

  ngOnInit(): void {
  }

  getBillingByPost(paginate = 1, postid: string){

    this._paymentService.getBillsByPostGET(paginate, postid).subscribe((resp) => {
      var data = resp.data;

      this.registros = data;
      this.paginator = resp.paginator;

      ////// console.log('los registros', resp);

      this.GlobalConfigService.spinner = false;
    },
    (err) => {
      this.GlobalConfigService.spinner = false;
    }
  );
}

  newPageResponse(paginate){

    this.getBillingByPost(paginate, this.postId);

  }



}
