import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {   UsersService, VisitsService } from './services/service.index';
import { GlobalConfigService } from './services/-global-config.service';
import { WebsocketService } from './services/websocket.service';
import { i_Visit } from 'src/interfaces/I_visit';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Mercado Pyme';



  constructor(
    private router: Router,
    public _globaConfig: GlobalConfigService,
    public _usersService: UsersService,
    public _visitService: VisitsService,
    public wsService: WebsocketService,
  ) {
    this._globaConfig.spinner = true;
    // this.currentWindowWidth = window.innerWidth



   }



   ngAfterViewInit(): void{
     this._globaConfig.spinner = false
   }

   ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.

     this._visitService.pruebametodo();

    let l: i_Visit = {
      type: 'general',
    }
    this.wsService.beginVisit(l).then(r => {
    });
   }








   ngOnDestroy(){

    console.log('salida');

   }


}
