import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService, UsersService } from './services/service.index';
import { LoginComponent } from './components/login/login.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Mercado Pyme';



  constructor(
    private router: Router,
    public _globaConfig: GlobalConfigService,
    public _usersService: UsersService
  ) {
    this._globaConfig.spinner = true;
    // this.currentWindowWidth = window.innerWidth

   }



   ngAfterViewInit(): void{
     this._globaConfig.spinner = false
   }





}
