import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {


  constructor(
    private sanitizer: DomSanitizer
  ){

  }

  transform(value: string ): SafeHtml {


    let h = "<a class='hiper' href='#'>#"+value+"</a>";

    // return h;
    return this.sanitizer.bypassSecurityTrustHtml(h);

  }

}
