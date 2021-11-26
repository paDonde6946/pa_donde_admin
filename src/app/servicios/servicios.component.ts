import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertasService } from '../core/_services/alerta.service';
import { CoreService } from '../core/_services/core.services';
import { estadoUsuario } from '../core/_util/usuario-util';

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

  // Estados
  prepararServicio: boolean = false;
  botonGuardar: boolean = false;
  botonEditar: boolean = false;
  existe: boolean = false;
  // Utilidades
  uid: any;
  estado: any = estadoUsuario;
  // fecha = new Date;

  // Loader
  cargando: boolean = true;

  formularioServicio = new FormGroup({
    puntoInicio: new FormControl('', Validators.compose([Validators.required])),
    puntoFinal: new FormControl('', Validators.compose([Validators.required])),
    cuposTotales: new FormControl('', Validators.compose([Validators.required])),
    placa: new FormControl('', Validators.compose([Validators.required])),
    fecha: new FormControl('', Validators.compose([Validators.required])),
    descripcion: new FormControl(''),
  });
  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    // Columnas definidas para la de la tabla de servicios
    this.columnas = [
      { header: 'Punto Inicio', field: 'puntoInicio' },
      { header: 'Punto Final', field: 'puntoFinal' },
      { header: 'Cupos Totales', field: 'cuposTotales' },
      { header: 'Fecha', field: 'fecha' },
      { header: 'Estado', field: 'estado' },
    ];

    this.getListadoServicios();
  }


  // Metodo para obtener el listado de usuarios
  getListadoServicios() {

    this.coreService.get('/servicio/listarServicio').subscribe(
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

  // Metodo para boton Agregar Servicio
  prepararNuevo() {

    this.prepararServicio = true;
    this.botonGuardar = true;
    this.botonEditar = false;
    this.formularioServicio.reset();
  }

  // Metodo para boton Volver
  volver() {
    this.prepararServicio = false;
    this.botonGuardar = false;
    this.botonEditar = false;
  }

  // Boton guardar Servicio
  agregar() {

    if (this.formularioServicio.value.cuposTotales > 4 || 0 >= this.formularioServicio.value.cuposTotales) {
      this.msj.alerta('Los número de cupos totales ingresado no es válido.');
    }
    else if (this.formularioServicio.value.placa.length != 6) {
      this.msj.alerta('La placa ingresada no es válida.');
    }
    else {
      this.coreService.get('/vehiculos/buscarVehiculo/' + this.formularioServicio.value.placa).subscribe(
        (res: any) => {

          if (res != null || res != undefined || res != '') {

            this.uid = res.vehiculo.uid;

            let data = this.formularioServicio.valid;
            if (data) {
              this.confirmationService.confirm({
                message: '¿Desea guardar este servicio?',
                accept: () => {
                  this.formularioServicio.markAllAsTouched();
                  this.postGuardarServicio();
                }
              });
            } else {
              this.formularioServicio.markAllAsTouched();
            }
          }
        },
        (err: any) => {
          console.log(err);
          this.msj.alerta('La placa ingresada no se encuentra registrada.')
        }
      )
    }
  }
  // Boton editar Servicio
  editarServicio(data: any) {

    this.uid = data.uid;
    this.prepararServicio = true;
    this.botonGuardar = false;
    this.botonEditar = true;
    // this.formularioServicio.controls['correo'].setValue(data.correo);
    // this.formularioServicio.controls['nombre'].setValue(data.nombre);
    // this.formularioServicio.controls['apellido'].setValue(data.apellido);
    // this.formularioServicio.controls['celular'].setValue(data.celular);
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

  // Put para guardar servicio
  postGuardarServicio() {


    let params = {
      puntoInicio: this.formularioServicio.value.puntoInicio,
      puntoFinal: this.formularioServicio.value.puntoFinal,
      cuposTotales: this.formularioServicio.value.cuposTotales,
      vehiculo: this.uid,
      fecha: this.formularioServicio.value.fecha.toISOString(),
      descripcion: this.formularioServicio.value.descripcion
    };
    console.log(params);
    this.coreService.post('/servicio/agregarServicio', params).subscribe(
      (res: any) => {
        this.msj.info('Servicio Guardado Correctamente');
        this.getListadoServicios();
        this.prepararServicio = false;
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
  // Metodo de boton editar servicio 
  actualizar() {
    let data = this.formularioServicio.valid;
    this.confirmationService.confirm({
      message: '¿Desea actualizar este servicio?',
      accept: () => {
        this.formularioServicio.markAllAsTouched();
        this.postActualizarServicio();
      }
    });

  }

  // Metodo para actualizar un usuario
  postActualizarServicio() {

    let params = {
      // uid: this.uid,
      // correo: this.formularioServicio.value.correo,
      // nombre: this.formularioServicio.value.nombre,
      // apellido: this.formularioServicio.value.apellido,
      // celular: this.formularioServicio.value.celular
    }
    // console.log(params);
    this.coreService.post('', params).subscribe(
      (res: any) => {
        this.msj.info("Servicio actualizado exitosamente");
        this.getListadoServicios();
        this.prepararServicio = false;
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

  actualizarEstado(data: any) {
    let params = {
      // uid: data.uid
    }
    this.coreService.post('', params).subscribe(
      (res: any) => {

        this.msj.info("Estado actualizado exitosamente");
        this.getListadoServicios();
        this.prepararServicio = false;
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
  // Validar campos del formulario de Usuario
  campoNoValido(campo: any) {
    return this.formularioServicio.get(campo)?.invalid && this.formularioServicio.get(campo)?.touched;
  }

}
