

import { Component, OnInit, Input } from '@angular/core';

import { NotifyService, _globalConfig, PostsService  } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-manager',
  templateUrl: './post-manager.component.html',
  styleUrls: ['./post-manager.component.sass']
})
export class PostManagerComponent implements OnInit {


  allPublications: any = [];

  constructor(
    public _postService: PostsService,
    public _globalConfig: _globalConfig,
    public _notifyService: NotifyService
  ) {


    this.getAllPublications();

  }

  ngOnInit(): void {
  }


  getAllPublications(){

    this._globalConfig.spinner = true;

    this._postService.getAllPublicationsGET().subscribe( resp => {
      this._globalConfig.spinner = false;
      this.allPublications = resp.data;



      this._notifyService.Toast.fire({
        title: resp.message,
        // text:'El navegador no soporta la geolocalización',
        icon: 'success'
        });


      console.log(this.allPublications);


   });
  }



}
