import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'User'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/User/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'User':
        url += '/User/' + img;
      break;

      case 'Post':
        url += '/Post/' + img;
      break;

      // case 'hospital':
      //    url += '/hospitales/' + img;
      // break;

      default:
        //console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }

    return url;
  }

}
