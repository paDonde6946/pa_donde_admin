import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AlertasService } from '../core/_services/alerta.service';
import { CoreService } from '../core/_services/core.services';
import { CONSTANTES_SESION } from '../core/_util/services-util';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.scss'],
  providers: [AlertasService, MessageService],
})
export class CambiarContraseniaComponent implements OnInit {

  formBuilder: FormBuilder;
  formularioRecuperar = new FormGroup({
    contraseniaActual: new FormControl('', Validators.compose([Validators.required])),
    contrasenia1: new FormControl('', Validators.compose([Validators.required])),
    contrasenia2: new FormControl('', Validators.compose([Validators.required])),
  })
  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public messageService: MessageService,
  ) {

    this.formBuilder = new FormBuilder();
  }

  ngOnInit(): void {
  }

  guardarContrasenia() {

    let params = {
      uid: sessionStorage.getItem(CONSTANTES_SESION.ID),
      contraseniaActual: this.formularioRecuperar.value.contraseniaActual,
      contrasenia: this.formularioRecuperar.value.contrasenia1
    }

    const criteriosContrasenia = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (this.formularioRecuperar.value.contraseniaActual == '' || this.formularioRecuperar.value.contrasenia1 == '' || this.formularioRecuperar.value.contrasenia2 == '') {
      this.msj.alerta("Debe rellenar los campos solicitados.")
    } else if (!criteriosContrasenia.test(this.formularioRecuperar.value.contrasenia1)) {
      this.msj.alerta("La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial y poseer mas de 8 caracteres")
    }
    else if (this.formularioRecuperar.value.contrasenia1 != this.formularioRecuperar.value.contrasenia2) {
      this.msj.alerta('La contraseña no coincide');
    } else {
      this.coreService.post('/login/cambiarContraseniaAdmin', params).subscribe(

        (res: any) => {
          this.msj.info('Contraseña actualizada exitosamente');
          this.formularioRecuperar.reset();
        },
        (err: any) => {
          try{
            this.msj.error('La contraseña actual ingresada no es correcta');
          } catch(e){
            console.log(err);
            console.error('error', e);
          }
        }
      )
    }

  }
}
