import { NgModule } from '@angular/core';
import { ImagenPipe } from './image-control.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { FilesServicePipe } from './files-service.pipe';
import { FormResourcePipe } from './form-resource.pipe';
import { NumberFormatPipe } from './number-format.pipe';
import { TagsPipe } from './tags.pipe';
import { RoleTransformPipe } from './role-transform.pipe';
// import { SafeUrlPipe } from './';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SafeUrlPipe,
    FilesServicePipe,
    FormResourcePipe,
    NumberFormatPipe,
    TagsPipe,
    RoleTransformPipe
  ],
  exports: [
    ImagenPipe,
    SafeUrlPipe,
    FormResourcePipe,
    NumberFormatPipe,
    TagsPipe,
    RoleTransformPipe
  ]
})
export class PipesModule { }
