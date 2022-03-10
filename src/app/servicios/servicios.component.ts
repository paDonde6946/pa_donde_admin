import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertasService } from '../core/_services/alerta.service';
import { CoreService } from '../core/_services/core.services';
import { estadoServicio } from '../core/_util/usuario-util';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [AlertasService, ConfirmationService]
})
export class ServiciosComponent implements OnInit {

  // Variables tabla Servicios
  columnas: any[] = [];
  registroLista: any[] = [];
  totalRecords = 0;


  existe: boolean = false;
  // Utilidades
  uid: any;
  estado: any = estadoServicio;
  // fecha = new Date;

  // Loader
  cargando: boolean = true;
  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    // Columnas definidas para la de la tabla de servicios
    this.columnas = [
      { header: 'Punto Inicio', field: 'nombreOrigen' },
      { header: 'Punto Final', field: 'nombreDestino' },
      { header: 'Cupos Totales', field: 'cantidadCupos' },
      { header: 'Fecha', field: 'fechayhora' },
      { header: 'Estado', field: 'estado' },
    ];

    this.getListadoServicios();
  }

  // Metodo para obtener el listado de usuarios
  async getListadoServicios() {

    await this.coreService.get('/servicio/listarServicio').subscribe(
      (res: any) => {
        this.registroLista = res.listaServicio;
        this.totalRecords = this.registroLista.length;
        this.registroLista.forEach(element => {
          element.estado = this.estado[element.estado];
        });
        this.cargando = false;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  // Metodo para cargador valores de lista al editar
  cargarDatosEditar(iLista: any, valor: any) {
    if (iLista !== undefined && iLista != null) {
      for (let i = 0; i < iLista.length; i++) {
        if (iLista[i].value == valor) {
          return iLista[i];
        }
      }
    }
  }

  actualizarEstado(data: any) {
    let params = {
      uid: data.uid
    }
    console.log(params.uid);
    this.coreService.put('/servicio/cambiarEstado', params).subscribe(
      (res: any) => {

        this.msj.info("Estado actualizado exitosamente");
        this.getListadoServicios();
      },

      (err: any) => {
        if (err.errors.error !== undefined && err.errors.error !== null) {
          for (let index = 0; index < err.errors.error.length; index++) {
            this.msj.error(err.errors.error[index]);
          }
        }
      }
    )
  }
}
