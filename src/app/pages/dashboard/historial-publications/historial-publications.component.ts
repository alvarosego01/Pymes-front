import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import {
  PaymentService,
  NotifyService,
  PostsService,
} from "src/app/services/service.index";
import { Router } from "@angular/router";
import { GlobalConfigService } from "src/app/services/-global-config.service";

@Component({
  selector: "app-historial-publications",
  templateUrl: "./historial-publications.component.html",
  styleUrls: ["./historial-publications.component.sass"],
})
export class HistorialPublicationsComponent implements OnInit {

  registros: any = null;

  paginator: any = null;

  constructor(
    public _userService: UsersService,
    public _postService: PostsService,
    public _paymentService: PaymentService,
    public _notifyService: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public route: Router
  ) {
    this.GlobalConfigService.setTitle('Historial de publicaciones');
    this.getAllPublicationsByOwner();
  }

  ngOnInit(): void {}

  getAllPublicationsByOwner(paginate: number = 1) {
    this.GlobalConfigService.spinner = true;
    this._postService.getAllPublicationsByOwnerGET(paginate).subscribe(
      (resp) => {
        var data = resp.data;

        // this._notifyService.Toast.fire({
        //   title: resp.message,
        //   icon: "success",
        // });

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

    this.getAllPublicationsByOwner(paginate);

  }

  deletePublic(idPublic) {
    this._notifyService.swalNormal
      .fire({
        title: "Eliminar publicación",
        text: "Esta acción será irreversible",
        icon: "warning",
        confirmButtonText: "Eliminar",

        showCancelButton: true,
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((borrar) => {
        if (borrar.value) {
          // if (borrar) {
          // // ////// console.log('borrado');
          // return;
          this.GlobalConfigService.spinner = true;
          this._postService
            .deletePublicDELETE(idPublic)
            .subscribe((borrado) => {
              if (borrado.status == 200 && borrado.ok == true) {
                this._notifyService.Toast.fire({
                  title: borrado.message,
                  // text: '¡Gracias por unirte a Mercado Pyme!',
                  icon: "success",
                });
                this.getAllPublicationsByOwner(this.paginator.currentPage);
              } else {
                this._notifyService.Toast.fire({
                  title: borrado.message,
                  // text: '¡Gracias por unirte a Mercado Pyme!',
                  icon: "error",
                });
              }
              // return true;

              this.GlobalConfigService.spinner = false;
            });
        } else if (
          /* Read more about handling dismissals below */
          borrar.dismiss === this._notifyService.swalNormal.DismissReason.cancel
        ) {
          borrar.dismiss ===
            this._notifyService.swalNormal.DismissReason.cancel;
        }
      });

}

}
