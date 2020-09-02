import { Pipe, PipeTransform } from '@angular/core';

import IMask from 'imask';

@Pipe({
  name: 'formResource'
})
export class FormResourcePipe implements PipeTransform {

  transform(value: any, type: string): any {
    // return null;

    if(type=='facebook'){


        var facebookMask = IMask(value, {
          mask: '{https://www.facebook.com/}*****'
        });

        return facebookMask;

    

    }


  }

}
