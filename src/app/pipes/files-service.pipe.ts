import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesService'
})
export class FilesServicePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
