import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any): string {

    var str = value;
    var l = str.toString().replace(/[^a-zA-Z0-9]/g, "");

    // // //////////////console.log(l);


    return l;
  }

}
