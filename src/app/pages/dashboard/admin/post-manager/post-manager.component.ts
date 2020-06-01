

import { Component, OnInit, Input } from '@angular/core';

import { NotifyService, _globalConfig, PostsService, VerifyService  } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-manager',
  templateUrl: './post-manager.component.html',
  styleUrls: ['./post-manager.component.sass']
})
export class PostManagerComponent implements OnInit {


  allPublications: any = [];

  constructor(
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
    public _notifyService: NotifyService,
    public _verifyService: VerifyService
  ) {


    this.getAllPublications();

  }

  ngOnInit(): void {
  }


  async verifyPublic(idPublic, user){


let s = this._notifyService.swalNormal;
const { value: verify } = await s.fire({
  title: 'Verificación de publicación',
  input: 'radio',
  inputOptions: {
    'Aprobado': 'Aprobado',
    'No aprobado': 'No aprobado',
  },
  inputValidator: (value) => {
    if (!value) {
      return 'Debes seleccionar una opción'
    }
  }
})

if (verify) {
  // Swal.fire({ html: `You selected: ${verify}` })

  this._globalConfig.spinner = true;
  this._verifyService.verifyPublicationPOST(idPublic, user, verify).subscribe((resp) => {
      // this._globalConfig.spinner = false;


      if(resp.status == 200 && resp.ok == true){

        this._notifyService.Toast.fire({
          title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        icon: 'success'
        });
        this.getAllPublications(false);
      }else{
        this._notifyService.Toast.fire({
          title: resp.message,
        // text: '¡Gracias por unirte a Mercado Pyme!',
        icon: 'error'
        });

      }
      // return true;

      this._globalConfig.spinner = false;

    });


  }
}

  deletePublic(idPublic){

    this._notifyService.swalNormal.fire({

      title: "Eliminar publicación",
      text: "Esta acción será irreversible",
      icon: "warning",
      confirmButtonText: 'Eliminar'

    }).then( borrar => {

      if (borrar) {
        this._globalConfig.spinner = true;
        this._postService.deletePublicDELETE( idPublic )
                  .subscribe( borrado => {



                    if(borrado.status == 200 && borrado.ok == true){

                      this._notifyService.Toast.fire({
                        title: borrado.message,
                      // text: '¡Gracias por unirte a Mercado Pyme!',
                      icon: 'success'
                      });
                      this.getAllPublications(false);
                    }else{
                      this._notifyService.Toast.fire({
                        title: borrado.message,
                      // text: '¡Gracias por unirte a Mercado Pyme!',
                      icon: 'error'
                      });

                    }
                    // return true;

                    this._globalConfig.spinner = false;

                  });
      }
    });




  }

  getAllPublications(notif: boolean = true){

    this._globalConfig.spinner = true;

    this._postService.getAllPublicationsGET().subscribe( resp => {
      this._globalConfig.spinner = false;
      this.allPublications = resp.data;


      if(notif == true){

        this._notifyService.Toast.fire({
          title: resp.message,
          // text:'El navegador no soporta la geolocalización',
          icon: 'success'
        });
      }


      //console.log(this.allPublications);


   });
  }



}
