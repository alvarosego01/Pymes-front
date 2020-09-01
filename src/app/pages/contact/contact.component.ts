import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { GlobalConfigService } from 'src/app/services/-global-config.service';
import { NotifyService, FormsResourcesService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  constructor(

    public router: Router,
    public _userService: UsersService,
    public _globaConfig: GlobalConfigService,
    public _notifyService: NotifyService,
    public _formService: FormsResourcesService,
    public GlobalConfigService: GlobalConfigService

  ) {
    this.GlobalConfigService.setTitle('Contacto');

  }

  ngOnInit(): void {
  }



  sendContactMessage(forma: NgForm){

    var contacto = {
      Name: forma.value.Name,
      Email: forma.value.Email,
      Telf: forma.value.Telf,
      Consulta: forma.value.Consulta,
    }

    this._globaConfig.spinner = true;

    this._userService.sendContactMessagePOST(contacto).subscribe((resp) => {
        // var data = resp.data;

        this._notifyService.Toast.fire({

          title: resp.message,
          icon: 'success'

        });

        // forma.reset();
        this._globaConfig.spinner = false;
      }, (err) => {


        this._notifyService.Toast.fire({
          title: 'Algo ha salido mal, intente más tarde',
          icon: 'error'
        });

        this._globaConfig.spinner = false;
    });

  }

}
