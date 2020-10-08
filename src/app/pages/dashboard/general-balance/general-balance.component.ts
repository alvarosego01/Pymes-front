import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NotifyService, VerifyService } from 'src/app/services/service.index';
import { UsersService } from 'src/app/services/users.service';
import { GlobalConfigService } from 'src/app/services/-global-config.service';



import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Color, MultiDataSet } from 'ng2-charts';
import { ImagenPipe } from 'src/app/pipes/image-control.pipe';
import { RoleTransformPipe } from 'src/app/pipes/role-transform.pipe';

@Component({
  selector: 'app-general-balance',
  templateUrl: './general-balance.component.html',
  styleUrls: ['./general-balance.component.sass']
})
export class GeneralBalanceComponent implements OnInit {


  statsGeneral: any = null;

  nroVentas: number = 0;
  totalVentas: number = 0;


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Publicaciones' },
    { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Usuarios' }
    // { data: null, label: 'Usuarios' },
  ];





  OrdenesbarChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Planes de publicación' },
    { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Ordenes de pauta' },
    // { data: null, label: 'Usuarios' },
  ];




  doughnutChartLabels: Label[] = ['Administrador', 'Persona natural', 'Empresa'];
  doughnutChartData: MultiDataSet = null/*[
    [55, 25, 20]
  ];*/
  doughnutChartType: ChartType = 'doughnut';

  OrdenesdoughnutChartLabels: Label[] = [
    'Micro',
    'Pequeño',
    'Mediano',
    'Grande'
  ];
  OrdenesdoughnutChartData: MultiDataSet = null/*[
    [55, 25, 20]
  ];*/
  OrdenesdoughnutChartType: ChartType = 'doughnut';



// para user normal


UsersbarChartData: ChartDataSets[] = [
  { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Publicaciones' },
  // { data: null, label: 'Usuarios' },
];



usuarioInfo: any = [];


  constructor(

    public _postService: PostsService,
    public GlobalConfigService: GlobalConfigService,
    public _notifyService: NotifyService,
    public _verifyService: VerifyService,
    public _userService: UsersService,


  ) {
    this.GlobalConfigService.setTitle('Balances y reportes');
    //// console.log('this._userService.roleName', this._userService.roleName);

    if(this._userService.roleName == 'Administrador'){

      this.getDataAdmin(this._userService.usuario._id);

    }else{

      this.getDataUser(this._userService.usuario._id);

    }

   }

  ngOnInit(): void {
  }

  getStatsGeneral(id){

    return new Promise((resolve, reject) => {

      this._postService.getStatsGeneralGET(id).subscribe((resp) => {


        resolve( resp.data );

      }, (err) => {

        reject();

      });


    })
  }

  getDataUser(id){

    //// console.log('id', id);
    this.GlobalConfigService.spinner = true;

    this._userService.getDataAdminGET(id).subscribe( async (resp: any) => {


     await this.getStatsGeneral(id).then(r => {

        this.usuarioInfo.statsGeneral = r;


        }, err => {
          console.error(err);
          this.GlobalConfigService.spinner = false;
        })

        //// console.log('el retorno', resp);
        this.statsGeneral = resp.data;

        if(this.statsGeneral.dateUserPublications.posts != null && this.statsGeneral.dateUserPublications.posts.length > 0){

        this.statsGeneral.dateUserPublications.posts[0].meses.forEach( (element,idx) => {

          // meses.push(element.mes);
          var index = null;
          index = this.barChartLabels.findIndex(r => {

            // //// console.log('ryear', r.year);
            return r === element.mes;
          });

          if(index != null){

            if(element.registros.length > 0){

              element.registros.forEach((el, idx) => {

                if(el[0] != null){
                  let xx:any = this.UsersbarChartData[0].data[index];
                  xx++;
                  this.UsersbarChartData[0].data[index] = xx;
                }

              });



            }
          }


        });
      }



      this.GlobalConfigService.spinner = false;


    }, (err) => {

      this.GlobalConfigService.spinner = false;
    });

  }


  getDataAdmin(id){

    this.GlobalConfigService.spinner = true;

    this._userService.getDataAdminGET(id).subscribe((resp: any) => {

      //// console.log('el retorno', resp);
      this.statsGeneral = resp.data;

      // roleTransform
      // CLIENTE_ROLE
      // EMPRESA_ROLE
      // ADMIN_ROLE
      this.doughnutChartData = [ resp.data.typeUsers.ADMIN_ROLE, resp.data.typeUsers.CLIENTE_ROLE, resp.data.typeUsers.EMPRESA_ROLE  ];




      if(this.statsGeneral.dateUserPublications.bills != null && this.statsGeneral.dateUserPublications.bills.length > 0 ){



      this.statsGeneral.dateUserPublications.bills[0].meses.forEach( (element,idx) => {

        // meses.push(element.mes);
        var index = null;
        index = this.barChartLabels.findIndex(r => {

          // //// console.log('ryear', r.year);
          return r === element.mes;
        });

        if(index != null){

          if(element.registros.length > 0){

            element.registros.forEach((el, idx) => {

              if(el[0] != null){
                let xx:any = this.OrdenesbarChartData[0].data[index];
                xx++;
                this.OrdenesbarChartData[0].data[index] = xx;
              }
              if(el[1] != null){
                let xx:any = this.OrdenesbarChartData[1].data[index];
                xx++;
                this.OrdenesbarChartData[1].data[index] = xx;
              }

            });



          }
        }


      });

    }

      if(this.statsGeneral.dateUserPublications.posts != null && this.statsGeneral.dateUserPublications.posts.length > 0){



      this.statsGeneral.dateUserPublications.posts[0].meses.forEach( (element,idx) => {

        // meses.push(element.mes);
        var index = null;
        index = this.barChartLabels.findIndex(r => {

          // //// console.log('ryear', r.year);
          return r === element.mes;
        });

        if(index != null){

          this.barChartData[0].data[index] = element.registros.length;
          index = null;
        }


      });

    }
      if(this.statsGeneral.dateUserPublications.users != null && this.statsGeneral.dateUserPublications.users.length > 0){



      this.statsGeneral.dateUserPublications.users[0].meses.forEach( (element,idx) => {

        // meses.push(element.mes);
        var index = null;
        index = this.barChartLabels.findIndex(r => {

          // //// console.log('ryear', r.year);
          return r === element.mes;
        });

        if(index != null){

          this.barChartData[1].data[index] = element.registros.length;
          index = null;
        }


      });

    }

      if( this.statsGeneral.salesStatus.length > 0 ){

        let aux = this.statsGeneral.salesStatus.filter( r => {

          return r.status === true;
        })

        this.nroVentas = aux.length || 0;

        var ordenesDonut: any = [0, 0, 0, 0,];

        aux.forEach((element, idx) => {

          this.totalVentas = Number(this.totalVentas) + Number(element.price);

          if(element.description[1] != null){

            if(element.description[1].plan == "Micro" ){
              ordenesDonut[0]++;
            }
            if(element.description[1].plan == "Pequeño" ){
              ordenesDonut[1]++;
            }
            if(element.description[1].plan == "Mediano" ){
              ordenesDonut[2]++;
            }
            if(element.description[1].plan == "Grande" ){
              ordenesDonut[3]++;
            }

          }

          // Micro
          // Pequeño
          // Mediano
          // Grande
          this.OrdenesdoughnutChartData = ordenesDonut;

        });

        // var tipo = null;

      }




      this.GlobalConfigService.spinner = false;
    }, (err) => {
      console.error(err);
      this.GlobalConfigService.spinner = false;
    });

  }



}
