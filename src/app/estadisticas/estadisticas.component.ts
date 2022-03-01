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
  getTotalConductores() {
    this.coreService.get('/dashboard/estadisticas/cantidadConductores').subscribe(
      (res: any) => {
          this.totalConductores = res.value
          console.log(this.totalConductores);
          this.cargando = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getTotalVehiculos() {
    this.coreService.get('/dashboard/estadisticas/cantidadVehiculos').subscribe(
      (res: any) => {
          this.totalVehiculos = res.value
          console.log(this.totalVehiculos);
          this.cargando = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getTotalUsuarios() {
    this.coreService.get('/dashboard/estadisticas/cantidadUsuarios').subscribe(
      (res: any) => {
          this.totalUsuarios = res.value
          console.log(this.totalUsuarios);
          this.cargando = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
