import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {


  @Input("porcentaje") porcentaje: number = 0;

  @Output() complete = new EventEmitter<boolean>();
  // @Input("publicacion") publicacion: any;

  porc: number = 0;


  constructor() { }






  ngOnInit(): void {
  }




}
