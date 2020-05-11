import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.sass']
})
export class NavDashboardComponent implements OnInit {

  constructor(
    public _usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._usersService.logout();
  }

  openLoginByAside(){
    // this._usersService.loginVisible = !this._usersService.loginVisible
    // document.querySelectorAll('.loginController')[0].click();
    // document.getElementsByClassName('loginController')[0].click();
    let element: HTMLElement = document.querySelectorAll(".loginController")[0] as HTMLElement;
    element.click();
  }



}


