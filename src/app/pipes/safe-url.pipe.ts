
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml  } from '@angular/platform-browser';


@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {



  constructor(private sanitizer: DomSanitizer) { }
  transform(url): SafeHtml  {
    // return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    let iframe = `<iframe  src="${url}" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen=""></iframe>`;
    return this.sanitizer.bypassSecurityTrustHtml(iframe);
  }


}
