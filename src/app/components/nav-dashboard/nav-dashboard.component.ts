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

    this._usersService.loginVisible = !this._usersService.loginVisible;

  }



}


