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

  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public confirmationService: ConfirmationService
    ) { }
    
  estado:any = estadoUsuario;
  
  columnas : any = [
    { header: 'Placa', field: 'placa' },
    { header: 'TipoVehiculo', field: 'tipoVehiculoLabel' },
    { header: 'Color', field: 'color' },
    { header: 'Marca', field: 'marca' },
    { header: 'Año', field: 'anio' },
    { header: 'Modelo', field: 'modelo' },
    { header: 'Estado', field: 'estadoLabel' },
  ];
  
  tipoVehiculo : any = tipoVehiculo;
  cargando : boolean = true;
  listaVehiculos : any[] = [];
  tipoVehiculoDropdown : any =  tipoVehiculoDropdown;

  prepararVehiculo : boolean = false;
  botonGuardar : boolean = false;
  botonEditar : boolean = true;
  uid : any = 0;

  formularioVehiculo = new FormGroup({
    placa : new FormControl('', Validators.compose([Validators.required])),
    tipoVehiculo : new FormControl('', Validators.compose([Validators.required])),
    color : new FormControl('', Validators.compose([Validators.required])),
    marca : new FormControl('', Validators.compose([Validators.required])),
    anio : new FormControl('', Validators.compose([Validators.required])),
    modelo : new FormControl('', Validators.compose([Validators.required])),
    estado : new FormControl('', Validators.compose([Validators.required]))
  });

  ngOnInit(): void {
    this.getCargarDatos();
  }

  async getCargarDatos(){
    await this.getListadoVehiculos();
  }
  
  async getListadoVehiculos(){
    await this.coreService.get('/vehiculos/listarVehiculos').subscribe(
      (res: any) => {
        this.listaVehiculos = res.listadoVehiculo;
        this.listaVehiculos.forEach(element => {
          element.tipoVehiculoLabel = this.tipoVehiculo[element.tipoVehiculo];
          element.estadoLabel = this.estado[element.estado]
        });
        this.prepararVehiculo = false;
        this.cargando =false;
        
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  setEstado(uid:any){
    let id = {
      id:uid
    }
    this.coreService.put('/vehiculos/cambiarEstado', id).subscribe(
      (res: any) => {
        if(res.ok){
          this.msj.info("Estado actualizado exitosamente");
          this.getCargarDatos();
        }else{
          this.msj.error("Lo sentimos tenemos un problema");
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  editarVehiculo(data: any){

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
    this.formularioVehiculo.controls['estado'].setValue(data.estado);
    
  }

  agregarVehiculo(){
    this.prepararVehiculo = true;
    this.botonGuardar = true;
  }

  volver(){
    this.prepararVehiculo = false;
  }

  guardarVehiculo(){

  }

  actualizar(){
    console.log();
    if(this.formularioVehiculo.valid){
      let data = {
        placa : this.formularioVehiculo.controls['placa'].value,
        tipoVehiculo : this.formularioVehiculo.controls['tipoVehiculo'].value,
        color : this.formularioVehiculo.controls['color'].value,
        marca : this.formularioVehiculo.controls['marca'].value,
        anio : this.formularioVehiculo.controls['anio'].value,
        modelo : this.formularioVehiculo.controls['modelo'].value,
        estado : this.formularioVehiculo.controls['estado'].value,
        id :  this.uid
      }
      this.coreService.put('/vehiculos/actualizarVehiculo',data).subscribe(
        (res: any) => {
          if(res.ok){
            this.msj.info("Vehiculo actualizado exitosamente");
            this.getCargarDatos();
          }else{
            this.msj.error("Lo sentimos no fue posible actualizar el vehiculo");
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }else{
      this.msj.error("Verifique que todos los campos esten y esten correctos");
    }
  }

  // Validar campos del formulario de Usuario
  campoNoValido(campo: any) {
    return this.formularioVehiculo.get(campo)?.invalid && this.formularioVehiculo.get(campo)?.touched;
  }

}
