import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertasService } from '../core/_services/alerta.service';
import { CoreService } from '../core/_services/core.services';
import { tipoUsuario, estadoUsuario } from '../core/_util/usuario-util';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [AlertasService, ConfirmationService]
})
export class UsuariosComponent implements OnInit {

  // Variables tabla Usuarios
  columnas: any[] = [];
  registroLista: any[] = [];
  totalRecords = 0;

  // Estados
  prepararUsuario: boolean = false;
  botonGuardar: boolean = false;
  botonEditar: boolean = false;
  // Utilidades formulario
  tipo = tipoUsuario;
  estado: any = estadoUsuario;
  uid: any;

  // Loader
  cargando: boolean = true;

  formularioUsuario = new FormGroup({
    cedula: new FormControl('', Validators.compose([Validators.required])),
    correo: new FormControl('', Validators.compose([Validators.required])),
    contrasenia: new FormControl('', Validators.compose([Validators.required])),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    apellido: new FormControl('', Validators.compose([Validators.required])),
    celular: new FormControl('', Validators.compose([Validators.required])),
  });
  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {

    // Columnas definidas para las columnas de la tabla de usuarios
    this.columnas = [
      { header: 'Cédula', field: 'cedula' },
      { header: 'Nombre', field: 'nombre' },
      { header: 'Apellido', field: 'apellido' },
      { header: 'Teléfono', field: 'celular' },
      { header: 'Estado', field: 'estado' },

    ];
    this.getListadoUsuarios();
  }

  // Metodo para obtener el listado de usuarios
  async getListadoUsuarios() {

    await this.coreService.get('/usuario/listaUsuarios').subscribe(
      (res: any) => {
        this.registroLista = res.listaUsuario;
        this.totalRecords = this.registroLista.length;
        this.registroLista.forEach(element => {
          element.estado = this.estado[element.estado]
        })

        this.cargando = false;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  // Metodo para boton Agregar Usuario
  prepararNuevo() {

    this.prepararUsuario = true;
    this.botonGuardar = true;
    this.botonEditar = false;
    this.formularioUsuario.reset();
  }

  // Metodo para boton Volver
  volver() {
    this.prepararUsuario = false;
    this.botonGuardar = false;
    this.botonEditar = false;
  }

  // Boton guardar Usuario
  agregar() {

    if (!this.formularioUsuario.valid) {
      this.formularioUsuario.markAllAsTouched();
    } else {
      let correo = this.formularioUsuario.value.correo.toString().split("@");

      if (correo[1] != 'unbosque.edu.co') {
        this.msj.alerta('El correo ingresado no es válido.')
      } else {
        if (this.formularioUsuario.value.celular != null && this.formularioUsuario.value.celular.toString().length != 10) {
          this.msj.alerta('El número de teléfono no válido.')
        } else {
          if (this.formularioUsuario.value.cedula != null && this.formularioUsuario.value.cedula.toString().length != 10) {
            this.msj.alerta('La cédula no es válida.')
          }
          else {
            let data = this.formularioUsuario.valid;
            if (data) {
              this.confirmationService.confirm({
                message: '¿Desea guardar este usuario?',
                accept: () => {
                  this.formularioUsuario.markAllAsTouched();
                  this.putGuardarUsuario();
                }
              });
            } else {
              this.formularioUsuario.markAllAsTouched();
            }
          }
        }
      }
    }
  }
  // Boton editar Usuario
  editarUsuario(data: any) {

    this.uid = data.uid;
    this.prepararUsuario = true;
    this.botonGuardar = false;
    this.botonEditar = true;
    this.formularioUsuario.controls['cedula'].setValue(data.cedula);
    this.formularioUsuario.controls['correo'].setValue(data.correo);
    this.formularioUsuario.controls['nombre'].setValue(data.nombre);
    this.formularioUsuario.controls['apellido'].setValue(data.apellido);
    this.formularioUsuario.controls['celular'].setValue(data.celular);
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

  // Put para guardar usuario
  putGuardarUsuario() {
    let params = {
      correo: this.formularioUsuario.value.correo,
      contrasenia: this.formularioUsuario.value.contrasenia,
      nombre: this.formularioUsuario.value.nombre,
      apellido: this.formularioUsuario.value.apellido,
      celular: this.formularioUsuario.value.celular,
      cedula: this.formularioUsuario.value.cedula
    };

    this.coreService.putWithOutParam('/login/usuario/registrar', params).subscribe(
      (res: any) => {
        console.log(res);
        this.msj.info('Usuario Guardado Correctamente');
        this.getListadoUsuarios();
        this.prepararUsuario = false;
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
  // Metodo de boton editar usuario 
  actualizar() {

    let correo = this.formularioUsuario.value.correo.toString().split("@");

    if (correo[1] != 'unbosque.edu.co') {
      this.msj.alerta('El correo ingresado no es válido.')
    } else {
      if (this.formularioUsuario.value.celular != null && this.formularioUsuario.value.celular.toString().length != 10) {
        this.msj.alerta('El número de teléfono no válido.')
      } else {
        let data = this.formularioUsuario.valid;
        this.confirmationService.confirm({
          message: '¿Desea actualizar esta consulta?',
          accept: () => {
            this.formularioUsuario.markAllAsTouched();
            this.postActualizarUsuario();
          }
        });
      }
    }

  }

  // Metodo para actualizar un usuario
  postActualizarUsuario() {

    let params = {
      uid: this.uid,
      correo: this.formularioUsuario.value.correo,
      nombre: this.formularioUsuario.value.nombre,
      apellido: this.formularioUsuario.value.apellido,
      celular: this.formularioUsuario.value.celular
    }
    console.log(params);
    this.coreService.post('/usuario/actualizarUsuario', params).subscribe(
      (res: any) => {
        this.msj.info("Usuario actualizado exitosamente");
        this.getListadoUsuarios();
        this.prepararUsuario = false;
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
      uid: data.uid
    }
    this.coreService.post('/usuario/cambiarEstadoUsuario', params).subscribe(
      (res: any) => {
        this.msj.info("Estado actualizado exitosamente");
        this.getListadoUsuarios();
        this.prepararUsuario = false;
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
    return this.formularioUsuario.get(campo)?.invalid && this.formularioUsuario.get(campo)?.touched;
  }

}
