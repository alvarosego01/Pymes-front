import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NotifyService, _globalConfig } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _usersService: UsersService,
    public _notifyService: NotifyService,
    public _globalConfig: _globalConfig
  ) { }

  ngOnInit(): void {

    //console.log(this._usersService.usuario);

  }


  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {

      this.imagenSubir = null;
      this._notifyService.Toast.fire({
        title: 'Sólo imágenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

    this._notifyService.Toast.fire({
      title: 'Archivo valido',
      // text: '',
      icon: 'success'
    });

  }

  subirImagen(type = null) {


    if(this.imagenSubir == null){
      this._notifyService.Toast.fire({
        title: 'Debes seleccionar una imagen',
        // text: '',
        icon: 'warning'
      });
      return;
    }
    this._globalConfig.spinner = true;

    this._usersService.changeFileUser( this.imagenSubir, type, this._usersService.usuario._id )
          .then( (resp) => {


            this._globalConfig.spinner = false;
            this._notifyService.Toast.fire({
              title: 'La imagen ha sido cambiada',
              // text: 'El archivo no se pudo enviar',
              icon: 'success'
            });

            //console.log(resp);
            // this._usersService.usuario = resp.User;
          })
          .catch( err => {

            //console.log(err);

            this._globalConfig.spinner = false;
            this._notifyService.Toast.fire({
              title: 'Algo salió mal',
              text: 'El archivo no se pudo enviar',
              icon: 'error'
            });
          });

  }



  actualizarPerfil(forma: NgForm){

  }

}
