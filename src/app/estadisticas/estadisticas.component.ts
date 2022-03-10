import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/_services/core.services';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  totalUsuarios: any;
  totalVehiculos: any;
  totalConductores: any;

  cargando: boolean = false; //true
  constructor(
    public coreService: CoreService,
  ) { }

  ngOnInit(): void {

    this.getTotalUsuarios();
    this.getTotalVehiculos();
    this.getTotalConductores();
  }
  async getTotalConductores() {
    await this.coreService.get('/dashboard/estadisticas/cantidadConductores').subscribe(
      (res: any) => {
          this.totalConductores = res.value
          this.cargando = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  async getTotalVehiculos() {
    await this.coreService.get('/dashboard/estadisticas/cantidadVehiculos').subscribe(
      (res: any) => {
          this.totalVehiculos = res.value
          this.cargando = false;
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
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
