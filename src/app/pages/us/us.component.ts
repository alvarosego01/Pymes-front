// importaciones nativas
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { SocialFloatComponent } from 'src/app/globals/globals.index';
import {   NotifyService, UsersService } from 'src/app/services/service.index';
import { GlobalConfigService } from 'src/app/services/-global-config.service';


// import { Module } from '';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.sass']
})
export class UsComponent implements OnInit {

  planes: boolean = false;

  constructor(
    // public SocialFloatComponent: SocialFloatComponent
    public _notifyServie: NotifyService,
    public GlobalConfigService: GlobalConfigService,
    public _userService: UsersService
  ) {
    this.GlobalConfigService.setTitle('Nosotros');
    this.openVideo();
  }

  ngOnInit() {
    window.scroll(0,0);
    this.openVideo();
  }


  openVideo(){
    //// //////////////console.log('abrio video');
    this._notifyServie.swalNormal.fire({
      html:
       "<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/5Y2UaNalDUI' frameborder='0' allowfullscreen></iframe></div>",
      // showCloseButton: true,
      width: 600,
      heightAuto: true,
      showConfirmButton: false
      // allowOutsideClick: () => {},
    });

  }


  openPlanes(){

    this.planes = true;



  }


  cerrarModal(){
    this.planes = false;
  }





}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/5Y2UaNalDUI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
