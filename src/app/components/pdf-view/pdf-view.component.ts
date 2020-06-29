import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.sass']
})
export class PdfViewComponent implements OnInit {



  // @Input('PDF') PDF: string;

  // @Input('not') not: string = null;


  constructor(
    public _postService: PostsService
  ) { }

  ngOnInit(): void {
  }


  cerrarModal(){
    this._postService.PDFFILE = null;
  }



  ocultarClick(e){
    //// ////console.log(e);
    // this._postService.PDFFILE = null;
    if(
      // e.target['className'] != '' &&
    !e.target['className'].includes("hiperButtonWhite") &&
    // !e.target['className'].includes("navButton") &&
    this._postService.PDFFILE != null ){

  //  this._usersService.loginVisible = false;

  // if(l){
    this._postService.PDFFILE = null
  }


  }

}
