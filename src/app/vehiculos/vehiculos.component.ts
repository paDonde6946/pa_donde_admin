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

  // Variables tabla Vehiculos
  columnas: any[] = [];
  listaVehiculos: any[] = [];
  estado: any = estadoUsuario;

  // Estados
  prepararVehiculo: boolean = false;
  botonGuardar: boolean = false;
  botonEditar: boolean = false;

  // Utilidades formulario
  tipoVehiculo: any = tipoVehiculo;
  tipoVehiculoDropdown: any = tipoVehiculoDropdown;
  uid: any = 0;
  cedulaUsuario: any;

  // Loader
  cargando: boolean = true;
  error: boolean = false;

  // Formulario para agregar el vehiculo
  formularioVehiculo = new FormGroup({
    cedula: new FormControl('', Validators.compose([Validators.required])),
    placa: new FormControl('', Validators.compose([Validators.required])),
    tipoVehiculo: new FormControl('', Validators.compose([Validators.required])),
    color: new FormControl('', Validators.compose([Validators.required])),
    marca: new FormControl('', Validators.compose([Validators.required])),
    anio: new FormControl('', Validators.compose([Validators.required])),
    modelo: new FormControl('', Validators.compose([Validators.required]))
  });

  // Constructor del componente vehiculo
  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public confirmationService: ConfirmationService
  ) { }

  // Inicializacion del componente
  ngOnInit(): void {

    // Columnas definidas para las columnas de la tabla de usuarios
    this.columnas = [
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

  // Metodo para obtener el listado de vehiculos
  async getListadoVehiculos() {
    await this.coreService.get('/vehiculos/listarVehiculos').subscribe(
      (res: any) => {
        this.error = false;
        this.prepararVehiculo = false;
        this.listaVehiculos = res.listadoVehiculo;
        this.cargando = false;
        this.listaVehiculos.forEach(element => {
          element.tipoVehiculoLabel = this.tipoVehiculo[element.tipoVehiculo];
          element.estadoLabel = this.estado[element.estado]
        });
      },
      (err: any) => {
        this.error = true;
      }
    )
  }

  // Metodo para cambiar el estao del vehiculo
  setEstado(uid: any) {
    let id = {
      id: uid
    }
    this.coreService.put('/vehiculos/cambiarEstado', id).subscribe(
      (res: any) => {
          this.msj.info("Estado actualizado exitosamente");
          this.getCargarDatos();
          this.error = false;
      },
      (err: any) => {
        this.error = true;
      }
    )
  }

  // Metodo para ingresar a la pantalla de editar vehiculo y cargar los datos
  editarVehiculo(data: any) {
    this.uid = data.uid;
    this.prepararVehiculo = true;
    this.botonGuardar = false;
    this.botonEditar = true;
    this.formularioVehiculo.controls['placa'].setValue(data.placa);
    this.formularioVehiculo.controls['tipoVehiculo'].setValue(data.tipoVehiculo);
    this.formularioVehiculo.controls['color'].setValue(data.color);
    this.formularioVehiculo.controls['marca'].setValue(data.marca);
    this.formularioVehiculo.controls['anio'].setValue(data.anio);
    this.formularioVehiculo.controls['modelo'].setValue(data.modelo);

  }

  // Metodo para ingresar a la pantalla de agregar vehiculo
  agregarVehiculo() {
    this.prepararVehiculo = true;
    this.botonGuardar = true;
    this.botonEditar = false;
    this.formularioVehiculo.reset();
  }

  // Metodo para regresar
  volver() {
    this.prepararVehiculo = false;
    this.botonGuardar = false;
    this.botonEditar = false;
  }

  // Metodo del boton guardar para agregar el vehiculo
  agregar() {
    this.coreService.get('/usuario/traerUsuarioXCedula/' + this.formularioVehiculo.value.cedula).subscribe(
      (res: any) => {
        let data = this.formularioVehiculo.valid;
        // Valida la data del formulario
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
      },
      (err: any) => {
        this.msj.alerta("La cédula no se encuentra registrada.");
        console.log(err);
      }
    );


  }

  // Metodo para guardar un vehiculo
  putGuardarVehiculo() {
    let params = {
      cedula: parseInt(this.formularioVehiculo.value.cedula),
      placa: this.formularioVehiculo.value.placa,
      tipoVehiculo: this.formularioVehiculo.value.tipoVehiculo,
      color: this.formularioVehiculo.value.color,
      marca: this.formularioVehiculo.value.marca,
      anio: this.formularioVehiculo.value.anio,
      modelo: this.formularioVehiculo.value.modelo
    };

    this.coreService.post('/vehiculos/agregarVehiculo', params).subscribe(
      (res: any) => {

        this.msj.info('Vehículo Guardado Correctamente');
        this.getListadoVehiculos();
        this.prepararVehiculo = false;
        this.error = false;
      },
      (err: any) => {
        this.error = true;
      }
    )
  }

  // Metodo para validar que el usuario exista en el sistema
  validarUsuario(cedula: any) {
    this.coreService.get('/usuario/traerUsuarioXCedula/' + cedula).subscribe(
      (res: any) => {
        this.cedulaUsuario = res
        console.log(this.cedulaUsuario + " metodo");
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // Metodo para actualizar el vehiculo
  actualizar() {
    if (this.formularioVehiculo.valid) {
      let data = {
        cedula: this.formularioVehiculo.controls['cedula'].value,
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
