import { NgModule } from '@angular/core';
import { ImagenPipe } from './image-control.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { FilesServicePipe } from './files-service.pipe';
// import { SafeUrlPipe } from './';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SafeUrlPipe,
    FilesServicePipe
  ],
  exports: [
    ImagenPipe,
    SafeUrlPipe
  ]
})
export class PipesModule { }
