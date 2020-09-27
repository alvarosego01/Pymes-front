import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { PipesModule } from "src/app/pipes/pipes.module";

import { IMaskModule } from "angular-imask";
import { ClickOutsideModule } from "ng-click-outside";
import { CommonModule } from "@angular/common";
import { SortablejsModule } from "ngx-sortablejs";
import { StarRatingModule } from "angular-star-rating";
import { PdfViewerModule } from "ng2-pdf-viewer";

import { DpDatePickerModule } from "ng2-date-picker";

import { GlobalPaginatorComponent } from "src/app/components/global-paginator/global-paginator.component";
import { LoadingComponent } from "./loading/loading.component";
// import { COMPONENTS_MODULE } from 'src/app/components/components.module';

@NgModule({
  declarations: [GlobalPaginatorComponent, LoadingComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ClickOutsideModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    StarRatingModule.forRoot(),
    PdfViewerModule,
    IMaskModule,
    SortablejsModule.forRoot({
      animation: 150,
      swapThreshold: 1,
    }),
    DpDatePickerModule,

    // COMPONENTS_MODULE
    // AppModule
    // InfoPostComponent
    // PublicationPreviewComponent
  ],
  exports: [GlobalPaginatorComponent, LoadingComponent],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GLOBALCOMPONENTS_MODULE {}
