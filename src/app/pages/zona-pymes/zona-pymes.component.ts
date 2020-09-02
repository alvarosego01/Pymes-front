import { Component, OnInit } from '@angular/core';
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: 'app-zona-pymes',
  templateUrl: './zona-pymes.component.html',
  styleUrls: ['./zona-pymes.component.sass']
})
export class ZonaPymesComponent implements OnInit {

  constructor(

    public GlobalConfigService: GlobalConfigService

  ) {

    this.GlobalConfigService.setTitle('Zona Pymes');

  }

  ngOnInit(): void {
  }

}
