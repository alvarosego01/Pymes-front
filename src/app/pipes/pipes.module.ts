import { NgModule } from '@angular/core';
import { ImagenPipe } from './image-control.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
// import { SafeUrlPipe } from './';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SafeUrlPipe
  ],
  exports: [
    ImagenPipe,
    SafeUrlPipe
  ]
})
export class PipesModule { }
