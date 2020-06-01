import { Component, OnInit, ViewChild, ElementRef, HostListener, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { _globalConfig } from 'src/app/services/service.index';

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.sass']
})
export class NavDashboardComponent implements OnInit , AfterViewInit  {

  @ViewChildren('navlink') navlink: QueryList<any>;

  directiveNavDashboard:boolean = false;

  constructor(
    public _usersService: UsersService,
    public _globalConfig: _globalConfig
  ) {


   }




  ngOnInit(): void {

  }


  ngAfterViewInit():void {
    this.adjustNavDashboard(window.innerWidth);
    // console.log(this.navlink);
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
    // console.log('maldita sea', window.innerWidth
    // );
    this.adjustNavDashboard(window.innerWidth);
  }

  adjustNavDashboard(width){
      // let width = window.innerWidth;
    // console.log(width);
    if(this.navlink != null){

      if(width < 1000){
        var l = this.navlink['_results'];
        l.forEach(element => {
          element.nativeElement.setAttribute('data-widget', 'pushmenu');

          // console.log(element.nativeElement);
        });
        // this.navlink.nativeElement.text = 'CULO';
        // console.log(this.navlink);
      }else{
        var l = this.navlink['_results'];
        l.forEach(element => {
          element.nativeElement.removeAttribute('data-widget');

          // console.log(element.nativeElement);
        });
        // this.navlink.nativeElement.removeAttribute('data-widget');

        // //console.log(this.navlink);
      }
    }
  }



}
