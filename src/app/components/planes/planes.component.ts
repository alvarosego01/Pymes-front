import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.sass']
})
export class PlanesComponent implements OnInit {


  // planes: boolean = false;

  @Input("planes") planes: boolean = false;
  @Output() closePlanes  =  new EventEmitter<boolean>();

  constructor(
    public _userService: UsersService
  ) {


    // //////////// console.log('AAAA', this.planes);

  }

  ngOnInit(): void {
    // // ////// console.log('AAAA2', this.planes);
  }



  cerrarModal(){
    this.closePlanes.emit(false);
  }




  ocultarClick(e){
    // this._postService.PDFFILE = null;
    if(
      // e.target['className'] != '' &&
      !e.target['className'].includes("hiperButton") &&
      // !e.target['className'].includes("navButton") &&
      this.planes != false ){
        // ////// console.log(e);

  //  this._usersService.loginVisible = false;

  // if(l){
    this.closePlanes.emit(false);
  }


  }





}
