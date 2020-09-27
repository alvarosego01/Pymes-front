import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UsersService } from 'src/app/services/users.service';
import { CategoryService } from 'src/app/services/service.index';

@Component({
  selector: "app-publication-preview",
  templateUrl: "./publication-preview.component.html",
  styleUrls: ["./publication-preview.component.sass"],
})
export class PublicationPreviewComponent implements OnInit {


  activateMap: boolean = false;
  map: string = null;
  publication: any = null;


  imgPaginate: number = 0;
  imgActive: string = "";
  idxActiveImg: number = 0;

  ciudades: string = "";

  @Input("previewPublication") previewPublication: boolean = false;
  @Input("previewData") previewData: any = null;
  @Output() closePreviewPublication = new EventEmitter<boolean>();
  @Output() accion = new EventEmitter<string>();

  constructor(
    public _userService: UsersService,
    public _categoryService: CategoryService
  ) {




  }

  ngOnInit(): void {


    this.publication = this.previewData;

    if(this.publication != null && this.previewPublication != false){



      let mmp = this.publication._mapUrl;
      if ( (mmp.mapUrl != null) && mmp.mapUrl.includes("https://maps.google.com/maps?")) {
        this.map = mmp.mapUrl;
        this.activateMap = true;
      } else if (mmp.longitude != null && mmp.latitude != null) {
        // this.map = `https://maps.google.com/maps?q=${mmp.latitude},${mmp.longitude}&hl=es;z=14&outpu`;
      }



      this.ciudades = '';
      let p = this.publication._cityTarget;
      p.forEach((element) => {
        // ////// ////// console.log(element);
        if (p[p.length - 1] === element) {
          this.ciudades += `${element.city}`;
        } else {
          this.ciudades += `${element.city},`;
        }
      });


      this.imgActive = this.publication._files[0];
      this.idxActiveImg = 0;


    }





  }

  setActiveIMG(files, index) {
    // ////// ////// console.log(files);
    this.imgActive = files;
    this.idxActiveImg = index;
    //// ////// console.log('seteado', index);
  }


  getCategoryPrincipal(id){


    // ////// console.log('las categorys', this._categoryService.allCategoryList);

     let principal = this._categoryService.allCategoryList.filter( r => {

      return (r._id === id);
     })


     return principal[0]._category;

  }

  ocultarClick(e: Event) {
    this.closePreviewPublication.emit(false);
  }

  cerrarModal() {
    this.closePreviewPublication.emit(false);
  }





  sliderIMG(n) {

    let total_pages = Math.ceil(this.publication._files.length / 4);

    //// ////// console.log(this.idxActiveImg);
    // ////// ////// console.log('total', total_pages);
    switch (n) {

      case -1:

        this.imgPaginate = ( (this.imgPaginate > 0)  )? this.imgPaginate = this.imgPaginate - 1: this.imgPaginate;
        if(this.publication._files[this.idxActiveImg -1]){
          this.idxActiveImg = this.idxActiveImg - 1;
          //// ////// console.log('atras', this.publication._files[this.idxActiveImg]);
          this.imgActive = this.publication._files[this.idxActiveImg];
        }
        break;
        case +1:
        this.imgPaginate = (  (this.imgPaginate < total_pages ) )? this.imgPaginate = this.imgPaginate + 1: this.imgPaginate;

        if(this.publication._files[this.idxActiveImg + 1]){
          this.idxActiveImg = this.idxActiveImg + 1;
          //// ////// console.log('palante', this.publication._files[this.idxActiveImg]);
          this.imgActive = this.publication._files[this.idxActiveImg];
        }


        // this.publication._files

        break;

      default:
        break;

      }

      // ////// ////// console.log('pagina', this.imgPaginate);
    }




guardarBorrador(){

  // accion
  ////// console.log('se envia la accion emit');
  this.accion.emit('borrador');
  this.closePreviewPublication.emit(true);

}

goPay(){

    // accion
    ////// console.log('se envia la accion emit');
    this.accion.emit('goPay');
    this.closePreviewPublication.emit(true);


}





}
