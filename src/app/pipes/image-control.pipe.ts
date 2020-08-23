import { Pipe, PipeTransform } from '@angular/core';
import { _SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'User', folder: string = '', thumb: boolean = false): any {

    img = (img == null)? `${folder}-thumbnail.jpeg`: img;
    // ////// ////////////console.log('folder', folder);
    let url = _SERVICIOS + '/img';
    url = (thumb == true)? `${url}/thumbs`: url;

    if ( !img ) {
      return url + '/User/notFound/404';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    img = (folder != '')? `${folder}/${img}` : img;

    switch ( tipo ) {

      case 'pdf':
        url += `/pdf/${img}`;

      break;

      case 'User':
        url += `/User/${img}`;
      break;

      case 'Post':
        url += `/Post/${img}`;
      break;

      case 'Boost':
        url += `/Boost/${img}`;
      break;

      // case 'hospital':
      //    url += '/hospitales/' + img;
      // break;

      default:
        //////////// ////////////console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }

      // ////////////console.log('imagen', url);
    return url;
  }

}
