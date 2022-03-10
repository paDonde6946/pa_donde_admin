import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertasService } from '../core/_services/alerta.service';
import { CoreService } from '../core/_services/core.services';
import { estadoUsuario, tipoVehiculo, tipoVehiculoDropdown } from '../core/_util/usuario-util';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss'],
  providers: [AlertasService, ConfirmationService]

})
export class VehiculosComponent implements OnInit {

  // Estados
  prepararVehiculo: boolean = false;
  botonGuardar: boolean = false;
  botonEditar: boolean = false;

  tipoVehiculo: any = tipoVehiculo;
  cargando: boolean = true;
  listaVehiculos: any[] = [];
  columnas: any[] = [];
  tipoVehiculoDropdown: any = tipoVehiculoDropdown;

  uid: any = 0;

  estado: any = estadoUsuario;

  cedulaUsuario: any;

  formularioVehiculo = new FormGroup({
    // cedula: new FormControl('', Validators.compose([Validators.required])),
    placa: new FormControl('', Validators.compose([Validators.required])),
    tipoVehiculo: new FormControl('', Validators.compose([Validators.required])),
    color: new FormControl('', Validators.compose([Validators.required])),
    marca: new FormControl('', Validators.compose([Validators.required])),
    anio: new FormControl('', Validators.compose([Validators.required])),
    modelo: new FormControl('', Validators.compose([Validators.required]))
  });

  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.columnas = [
      // { header: 'Cédula', field: 'cedula' },
      { header: 'Placa', field: 'placa' },
      { header: 'TipoVehiculo', field: 'tipoVehiculoLabel' },
      { header: 'Color', field: 'color' },
      { header: 'Marca', field: 'marca' },
      { header: 'Año', field: 'anio' },
      { header: 'Modelo', field: 'modelo' },
      { header: 'Estado', field: 'estadoLabel' },
    ];
    this.getCargarDatos();
  }

  async getCargarDatos() {
    await this.getListadoVehiculos();
  }

  async getListadoVehiculos() {
    await this.coreService.get('/vehiculos/listarVehiculos').subscribe(
      (res: any) => {
        this.listaVehiculos = res.listadoVehiculo;
        this.listaVehiculos.forEach(element => {
          element.tipoVehiculoLabel = this.tipoVehiculo[element.tipoVehiculo];
          element.estadoLabel = this.estado[element.estado]
        });
        this.prepararVehiculo = false;
        this.cargando = false;

      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  setEstado(uid: any) {
    let id = {
      id: uid
    }
    this.coreService.put('/vehiculos/cambiarEstado', id).subscribe(
      (res: any) => {
        if (res.ok) {
          this.msj.info("Estado actualizado exitosamente");
          this.getCargarDatos();
        } else {
          this.msj.error("Lo sentimos tenemos un problema");
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  editarVehiculo(data: any) {
    this.uid = data.uid;
    this.prepararVehiculo = true;
    this.botonGuardar = false;
    this.botonEditar = true;
    // this.formularioVehiculo.controls['cedula'].setValue(data.cedula);
    this.formularioVehiculo.controls['placa'].setValue(data.placa);
    this.formularioVehiculo.controls['tipoVehiculo'].setValue(data.tipoVehiculo);
    this.formularioVehiculo.controls['color'].setValue(data.color);
    this.formularioVehiculo.controls['marca'].setValue(data.marca);
    this.formularioVehiculo.controls['anio'].setValue(data.anio);
    this.formularioVehiculo.controls['modelo'].setValue(data.modelo);

  }

  agregarVehiculo() {
    this.prepararVehiculo = true;
    this.botonGuardar = true;
    this.botonEditar = false;
    this.formularioVehiculo.reset();
  }

  volver() {
    this.prepararVehiculo = false;
    this.botonGuardar = false;
    this.botonEditar = false;
  }

  agregar() {
    // this.validarUsuario(this.formularioVehiculo.value.cedula);

    // if (this.cedulaUsuario == null || this.cedulaUsuario == '' || this.cedulaUsuario == undefined) {
    //   this.msj.alerta("La cédula no se encuentra registrada.");
    // } else {
    let data = this.formularioVehiculo.valid;
    if (data) {
      this.confirmationService.confirm({
        message: '¿Desea guardar este vehículo?',
        accept: () => {
          this.formularioVehiculo.markAllAsTouched();
          this.putGuardarVehiculo();
        }
      });
    } else {
      this.formularioVehiculo.markAllAsTouched();
    }
    // }
  }

  putGuardarVehiculo() {
    let params = {
      // cedula: parseInt(this.formularioVehiculo.value.cedula),
      placa: this.formularioVehiculo.value.placa,
      tipoVehiculo: this.formularioVehiculo.value.tipoVehiculo,
      color: this.formularioVehiculo.value.color,
      marca: this.formularioVehiculo.value.marca,
      anio: this.formularioVehiculo.value.anio,
      modelo: this.formularioVehiculo.value.modelo
    };
    console.log(params);
    this.coreService.post('/vehiculos/agregarVehiculo', params).subscribe(
      (res: any) => {

        this.msj.info('Vehículo Guardado Correctamente');
        this.getListadoVehiculos();
        this.prepararVehiculo = false;
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

  validarUsuario(cedula: any) {
    this.coreService.get('/usuario/traerUsuarioXCedula/' + cedula).subscribe(
      (res: any) => {
        this.cedulaUsuario = res
      },
      (err: any) => {
        console.log(err);
      }

    );

  }

  actualizar() {
    if (this.formularioVehiculo.valid) {
      let data = {
        // cedula: this.formularioVehiculo.controls['cedula'].value,
        placa: this.formularioVehiculo.controls['placa'].value,
        tipoVehiculo: this.formularioVehiculo.controls['tipoVehiculo'].value,
        color: this.formularioVehiculo.controls['color'].value,
        marca: this.formularioVehiculo.controls['marca'].value,
        anio: this.formularioVehiculo.controls['anio'].value,
        modelo: this.formularioVehiculo.controls['modelo'].value,
        id: this.uid
      }
      this.coreService.put('/vehiculos/actualizarVehiculo', data).subscribe(
        (res: any) => {
          if (res.ok) {
            this.confirmationService.confirm({
              message: '¿Desea editar este vehículo?',
              accept: () => {
                this.msj.info("Vehículo actualizado exitosamente");
                this.getCargarDatos();
              }
            });
          } else {
            this.msj.error("Lo sentimos, no fue posible actualizar el vehículo");
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.msj.error("Verifique que todos los campos esten y esten correctos");
    }
  }

  // Validar campos del formulario de Usuario
  campoNoValido(campo: any) {
    return this.formularioVehiculo.get(campo)?.invalid && this.formularioVehiculo.get(campo)?.touched;
  }

}
