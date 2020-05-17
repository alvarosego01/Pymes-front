import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { _globalConfig } from 'src/app/services/service.index';

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.sass']
})
export class NavDashboardComponent implements OnInit {

  @ViewChild('navlink') navlink: ElementRef;

  directiveNavDashboard:boolean = false;

  constructor(
    public _usersService: UsersService,
    public _globalConfig: _globalConfig
  ) {


   }

  ngOnInit(): void {
      this.adjustNavDashboard();
  }

  logout(){
    this._usersService.logout();
  }

  openLoginByAside(){

    this._usersService.loginVisible = !this._usersService.loginVisible;

  }


  @HostListener('window:resize')
  onResize() {
    // this.currentWindowWidth = window.innerWidth
    // //console.log(this.currentWindowWidth);
    this.adjustNavDashboard();
  }

  adjustNavDashboard(){
      let width = window.innerWidth;
    // //console.log(width);
    if(this.navlink != null){

      if(width < 1000){

        this.navlink.nativeElement.setAttribute('data-widget', 'pushmenu');
        // this.navlink.nativeElement.text = 'CULO';
        // //console.log(this.navlink);
      }else{
        this.navlink.nativeElement.removeAttribute('data-widget');
        // this.navlink.nativeElement.removeAttribute('data-widget');

        // //console.log(this.navlink);
      }
    }
  }



}


