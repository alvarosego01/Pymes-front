import { Component, OnInit } from '@angular/core';
import { CategoryService, NotifyService,   PostsService } from 'src/app/services/service.index';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-control-category',
  templateUrl: './control-category.component.html',
  styleUrls: ['./control-category.component.sass']
})
export class ControlCategoryComponent implements OnInit {


  newCategoryData: any = {
    type: null,
    name: null
  };


  categoryList: any = [];
  categoryPaginator: any = null;

  posts: any = [];
  postsPaginator: any = null;

  constructor(
    public _categoryService: CategoryService,
    public _notifyService: NotifyService,
    public _postService: PostsService,
       public GlobalConfigService: GlobalConfigService
  ) {

    // .name.newCategoryData = null
    this.getCategory();
    this.getAllPublications();

   }

  ngOnInit(): void {
  }


  newCategory(data: any){

    this.GlobalConfigService.spinner = true;

    this._categoryService.newCategoryPOST(data).subscribe((resp) => {
      this.GlobalConfigService.spinner = false;

        this._notifyService.Toast.fire({
          title: resp.message,
          // text:'El navegador no soporta la geolocalización',
          icon: "success",
        });

        // //// console.log('alguna respuesta', resp)
        this.newCategoryData.type = null;
        this.newCategoryData.name = null;
        this.getCategory();
        // this.getAllPublications();
      // ////// console.log(this.allPublications);
      ////// ////// console.log(this.allPublications);
    }, (err) => {
      console.error(err);
      this.GlobalConfigService.spinner = false;
    });

  }

  editCategory(data: any){

    this.GlobalConfigService.spinner = true;

    this._categoryService.editCategoryPUT(data).subscribe((resp) => {
      this.GlobalConfigService.spinner = false;

        this._notifyService.Toast.fire({
          title: resp.message,
          // text:'El navegador no soporta la geolocalización',
          icon: "success",
        });

        this.newCategoryData.type = null;
        this.newCategoryData.name = null;
        this.getCategory();
      // ////// console.log(this.allPublications);
      ////// ////// console.log(this.allPublications);
    }, (err) => {
      console.error(err);
      this.GlobalConfigService.spinner = false;
    });

  }



  categoryOptions(){

    let l = this.categoryList;
    var c = '';
    if((l) && l.length > 0){

      c +=
      `{"New": "Nueva categoria principal",`;

      l.forEach((element, i) => {

      if (i === l.length - 1){
        // //// console.log("Last callback call at index " + idx + " with value " + i );
        c+= `"${element._id}":"${element._category}"`
    }else{
      c+= `"${element._id}":"${element._category}",`
    }

  });

    c+= `}`;

  }else{
    c +=
    `{"New": "Nueva categoria principal"}`;
  }
    // //// console.log(c);
    return JSON.parse(c);
    // return c;
  }


 async openNewCategory(){

   var list = this.categoryOptions();

  var { value: data } = await this._notifyService.swalNormal.fire({
    title: 'Nueva categoria',
    input: 'select',
    inputOptions: list,
    inputPlaceholder: '¿Nueva categoría o sub categoria?',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value != '' && value != null) {
          resolve()
        } else {
          resolve('Necesitas seleccionar una opción')
        }
      })
    }
  })

  if (data) {

    this.newCategoryData.type = data;

    await this._notifyService.swalNormal.fire({

        title: 'Nombre de la categoria',
        input: 'text',

        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: true,

        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value != '' && value != null) {
              resolve()
            } else {
              resolve('Necesitas escribir el nombre de la categoria')
            }
          })
        }

      }).then( async (r) => {
        if(r.value){

          this.newCategoryData.name = r.value;
        //// console.log(this.newCategoryData);

        this.newCategory(this.newCategoryData);

      }
      });





  }

  }


  async openUpdateCategory(id: string, type: string, idx: string = null){



    await this._notifyService.swalNormal.fire({

      title: 'Editar nombre de la categoria',
      input: 'text',

      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,

      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value != '' && value != null) {
            resolve()
          } else {
            resolve('Necesitas escribir el nombre de la categoria')
          }
        })
      }

    }).then( async (r) => {
      if(r.value){

        // this.newCategoryData.name = r.value;
      // //// console.log(this.newCategoryData);
        var l = {
          _id: id,
          idx: idx,
          type: type,
          change: r.value
        }

        //// console.log('cambio sub', l);
      this.editCategory(l);

    }
    });


  }


  getCategory(){
    this.GlobalConfigService.spinner = true;

    this._categoryService.getCategoryGET().subscribe((resp) => {
      this.GlobalConfigService.spinner = false;


        this.categoryList = resp.data;



        // this.getAllPublications(this.postsPaginator.currentPage);


    }, (err) => {

      console.error(err);
      this.GlobalConfigService.spinner = false;
    });
  }


  getAllPublications(paginate: number = 1){

    // getAllPublicationsGET

    this.GlobalConfigService.spinner = true;

    this._postService.getAllPublicationsGET(paginate).subscribe((resp) => {
      this.GlobalConfigService.spinner = false;

      this.posts = resp.data;

      this.postsPaginator = resp.paginator;

      this.posts.sort(function (a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      // console.log('LOS POSTS', this.posts);

    }, (err) => {

      console.error(err);
      this.GlobalConfigService.spinner = false;
    });

  }




  changeCategory(categoria: any, id:string, type: string, nro: number){

    var l = {

      _category: categoria,
      _idPost: id,
      type: type,
      nro: nro

    }

    this.GlobalConfigService.spinner = true;

    this._postService.changeCategoryPUT(l).subscribe((resp) => {
      this.GlobalConfigService.spinner = false;

      // this.posts = resp.data;

      // //// console.log(this.posts);
      this._notifyService.Toast.fire({
        title: resp.message,
        // text:'El navegador no soporta la geolocalización',
        icon: "success",
      });

      this.getAllPublications(this.postsPaginator.currentPage);

    }, (err) => {

      console.error(err);
      this.GlobalConfigService.spinner = false;
    });


  }



  newPageResponse(paginate){


    this.postsPaginator.currentPage = paginate;

    this.getAllPublications(this.postsPaginator.currentPage);

  }




}

