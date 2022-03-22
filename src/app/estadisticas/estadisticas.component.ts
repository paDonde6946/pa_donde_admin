import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/_services/core.services';
import { estadoServicio } from '../core/_util/usuario-util';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  totalUsuarios: any;
  totalVehiculos: any;
  totalConductores: any;

  data: any;
  chartOptions: any;

  cargando: boolean = false; //true

  constructor(
    public coreService: CoreService,
  ) { }

  ngOnInit(): void {

    this.getTotalUsuarios();
    this.getTotalVehiculos();
    this.getTotalConductores();

  }

  async getTotalConductores(): Promise<number> {
    await this.coreService.get('/dashboard/estadisticas/cantidadConductores').subscribe(
      (res: any) => {
        this.totalConductores = res.value
        this.data.push(this.totalConductores);
        this.cargando = false;
        return this.totalConductores;
      },
      (err: any) => {
        console.log(err);
        return 0;
      }
    );

    return this.totalConductores;
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
