import { Component, OnInit, Input } from "@angular/core";

import {
  NotifyService,

  PostsService,
  VerifyService,
} from "src/app/services/service.index";
import { NgForm } from "@angular/forms";
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: "app-post-manager",
  templateUrl: "./post-manager.component.html",
  styleUrls: ["./post-manager.component.sass"],
})


export class PostManagerComponent implements OnInit {
  allPublications: any = [];


  paginator: any = null;

  constructor(
    public _postService: PostsService,
    public GlobalConfigService: GlobalConfigService,
    public _notifyService: NotifyService,
    public _verifyService: VerifyService
  ) {
    this.GlobalConfigService.setTitle('Gestión de publicaciones');
    this.getAllPublications();

    window.scroll(0, 0);
  }

  ngOnInit(): void {}

  async verifyPublic(idPublic, user) {
    let s = this._notifyService.swalNormal;
    const { value: verify } = await s.fire({
      title: "Verificación de publicación",
      input: "radio",
      inputOptions: {
        Aprobado: "Aprobado",
        "No aprobado": "No aprobado",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Debes seleccionar una opción";
        }
      },
    });

    if (verify) {
      // Swal.fire({ html: `You selected: ${verify}` })

      if (verify == "No aprobado") {

        let ss = this._notifyService.swalNormal;
        const { value: formValues } = await ss.fire({
          title: 'Motivos',
          html:
            `
            <div class='txt form-group clearfix col-md-12'>
                <textarea name='reasons' class='reasons' cols='30' rows='2'></textarea>
            </div>
            <div class='opc'>
                <div class='form-group form-group clearfix col-md-12'>
                    <div class='form-check'>
                      <input class='form-check-input permit' type='radio' name='permit'  value="si">
                      <label class='form-check-label'>Permitir cambiar archivos</label>
                    </div>
                    <div class='form-check'>
                      <input class='form-check-input permit' type='radio' name='permit'  checked value="no">
                      <label class='form-check-label'>No permitir cambiar archivos</label>
                    </div>
                  </div>
            </div>`,
          focusConfirm: false,

          confirmButtonText: "Aceptar",

        showCancelButton: true,
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value) {
            return "Debes llenar la información";
          }
        },
        preConfirm: () => {
          return [
            document.querySelectorAll('.reasons')[0],
            document.querySelectorAll('.permit:checked')[0]
          ]
        }

        })
        if (formValues) {

          // //////////////console.log(formValues);

          var t = {
            reason: formValues[0].value,
            changeFile: formValues[1].value,
          }
          let v = 'No aprobado';
          this.GlobalConfigService.spinner = true;
        this._verifyService
          .verifyPublicationPOST(idPublic, user, v, t)
          .subscribe((resp) => {
            // this.GlobalConfigService.spinner = false;

            if (resp.status == 200 && resp.ok == true) {
              this._notifyService.Toast.fire({
                title: resp.message,
                // text: '¡Gracias por unirte a Mercado Pyme!',
                icon: "success",
              });
              this.getAllPublications(this.paginator.currentPage);
            } else {
              this._notifyService.Toast.fire({
                title: resp.message,
                // text: '¡Gracias por unirte a Mercado Pyme!',
                icon: "error",
              });

            }
            // return true;

            this.GlobalConfigService.spinner = false;
          }, (err) => {

            this._notifyService.Toast.fire({
              title: err.message,
              // text: '¡Gracias por unirte a Mercado Pyme!',
              icon: "error",
            });
            this.GlobalConfigService.spinner = false;


          });


        }



      }

      if (verify == "Aprobado") {
        this.GlobalConfigService.spinner = true;
        this._verifyService
          .verifyPublicationPOST(idPublic, user, verify)
          .subscribe((resp) => {
            // this.GlobalConfigService.spinner = false;

            if (resp.status == 200 && resp.ok == true) {
              this._notifyService.Toast.fire({
                title: resp.message,
                // text: '¡Gracias por unirte a Mercado Pyme!',
                icon: "success",
              });
              this.getAllPublications(this.paginator.currentPage);
            } else {
              this._notifyService.Toast.fire({
                title: resp.message,
                // text: '¡Gracias por unirte a Mercado Pyme!',
                icon: "error",
              });
            }
            // return true;

            this.GlobalConfigService.spinner = false;
          });
      }
    }
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
          // // //////////////console.log('borrado');
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
                this.getAllPublications(this.paginator.currentPage);
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

  getAllPublications(paginate: number = 1) {
    this.GlobalConfigService.spinner = true;

    this._postService.getAllPublicationsGET(paginate).subscribe((resp) => {
      this.GlobalConfigService.spinner = false;

      this.allPublications = resp.data;




      // //////////////console.log(this.allPublications);
      ////// //////////////console.log(this.allPublications);
    }, (err) => {

      this.GlobalConfigService.spinner = false;
    });
  }


  newPageResponse(paginate){


    this.paginator.currentPage = paginate;

    this.getAllPublications(this.paginator.currentPage);

  }

}
