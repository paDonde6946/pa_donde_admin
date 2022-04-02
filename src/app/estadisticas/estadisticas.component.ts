import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/_services/core.services';
import { estadoServicio } from '../core/_util/usuario-util';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  totalUsuarios: number = 0;
  totalVehiculos: number = 0;
  totalConductores: number = 0;
  totalServicios: number = 0;

  
  cargando: boolean = false; //true
  
  paso: boolean = false
  
  dataConductores: any;
  dataTipo: any;
  basicOptions: any;
  chartOptions: any;

  constructor(
    public coreService: CoreService,
  ) { }

  ngOnInit(): void {

    this.getTotalUsuarios();
    this.getTotalVehiculos();
    this.getTotalConductores();
    this.getTotalServicios();
    this.getConductoresMasServicios();
    this.getCarrosMotos();
  }

  estadisticaMasConductores(arreglo: any[]) {

    this.dataConductores = {
      labels: [arreglo[0] ? arreglo[0].nombre : '', arreglo[1] ? arreglo[1].nombre : '', arreglo[2] ? arreglo[2].nombre : '', arreglo[3] ? arreglo[3].nombre : '', arreglo[4] ? arreglo[4].nombre : ''],
      datasets: [
        {
          label: 'Número de servicios',
          backgroundColor: '#5D992C',
          data: [arreglo[0] ? arreglo[0].numServiciosHechos : '', arreglo[1] ? arreglo[1].numServiciosHechos : '', arreglo[2] ? arreglo[2].numServiciosHechos : '', arreglo[3] ? arreglo[3].numServiciosHechos : '', arreglo[4] ? arreglo[4].numServiciosHechos : '']
        }
      ]
    };
  }

  estadisticaCarrosVsMotos(tipo: any[]) {
    console.log(tipo);
    this.dataTipo = {
      labels: ['Carros', 'Motos'],
      datasets: [
        {
          data: [tipo[0],tipo[1]],
          backgroundColor: [
            "#c9705a",
            "#5e90be"
          ],
          hoverBackgroundColor: [
            "#c9705a",
            "#5e90be"
          ]
        }
      ]
    };
  }

  async getTotalConductores() {
    await this.coreService.get('/dashboard/estadisticas/cantidadConductores').subscribe(
      (res: any) => {
        this.totalConductores = res.value
        this.cargando = false;
        this.paso = true;
      },
      (err: any) => {
        console.log(err);
      }
    );

    return this.totalConductores;
  }
  async getTotalVehiculos() {
    await this.coreService.get('/dashboard/estadisticas/cantidadVehiculos').subscribe(
      (res: any) => {
        this.totalVehiculos = res.value
        this.cargando = false;
        this.paso = true;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  async getTotalUsuarios() {
    await this.coreService.get('/dashboard/estadisticas/cantidadUsuarios').subscribe(
      (res: any) => {
        this.totalUsuarios = res.value
        this.cargando = false;
        this.paso = true;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  async getTotalServicios() {
    await this.coreService.get('/dashboard/estadisticas/cantidadServicios').subscribe(
      (res: any) => {
        this.totalServicios = res.value
        this.cargando = false;
        this.paso = true;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  async getConductoresMasServicios() {
    await this.coreService.get('/dashboard/estadisticas/conductoresMasServicios').subscribe(
      (res: any) => {
        this.estadisticaMasConductores(res.value);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  async getCarrosMotos() {
    await this.coreService.get('/dashboard/estadisticas/cantidadCarrosMotos').subscribe(
      (res: any) => {
        this.estadisticaCarrosVsMotos(res.value);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
