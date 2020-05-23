import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";
import { PostsService, _globalConfig, NotifyService, UsersService } from 'src/app/services/service.index';

import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-info-post',
  templateUrl: './info-post.component.html',
  styleUrls: ['./info-post.component.sass']
})
export class InfoPostComponent implements OnInit {



  publication: any;
  idPublication: string;
  ciudades: string = '';

  visit: any = {
    role: '',
    root: ''
  }

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
    public _notifyService: NotifyService,
    private url:LocationStrategy,
    public _userService: UsersService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      this.setPublication(id);


    });

    this.setTypeVisit();
  }

  ngOnInit(): void {
  }


  openContact(dataContact: any){
    console.log(dataContact);
  }

  setTypeVisit(){
    console.log(this.url.path());



    if(
      this._userService.estaLogueado() == true &&
      this._userService.token != null &&
      this._userService.roleName == 'Administrador' &&
      this.url.path().includes("/admin/infoPost")
      ){
        this.visit.role = this._userService.roleName;
        this.visit.root = this.url.path();
        // console.log('visita', this.visit);
    //  this.active=0;
     }

  }


  setPublication(idPublic){


    this._globalConfig.spinner = true;
    this._postService.getSinglePostGET(idPublic).subscribe((resp) => {
        // this._globalConfig.spinner = false;


        if(resp.status == 200 && resp.ok == true){

          // this._notifyService.Toast.fire({
            // title: resp.message,
          //  text: '¡Gracias por unirte a Mercado Pyme!',
          // icon: 'success'
          // });
          this.publication = resp.data;
          this.publication = this.publication[0];

          let p = this.publication._cityTarget;
          p.forEach(element => {
            console.log(element);
            if(p[p.length-1] === element){
              this.ciudades += `${element.city}`;
            }else{
              this.ciudades += `${element.city},`;
             }
          });

          // console.log('existe', resp.data);
          this._globalConfig.spinner = false;
        }else{
          this._notifyService.Toast.fire({
            title: resp.message,
          // text: '¡Gracias por unirte a Mercado Pyme!',
          icon: 'error'
          });

          this._globalConfig.spinner = false;
          this.router.navigate(["/dashboard"]);
        }
        // return true;


      });


  }

}
