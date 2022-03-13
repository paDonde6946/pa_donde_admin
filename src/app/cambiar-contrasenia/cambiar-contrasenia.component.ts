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
      contrasenia: this.formularioRecuperar.value.contrasenia1,
    }
    if (this.formularioRecuperar.value.contrasenia1 == '' || this.formularioRecuperar.value.contrasenia2 == '') {
      this.msj.alerta("Debe rellenar los campos solicitados.")
    } else if (this.formularioRecuperar.value.contrasenia1 != this.formularioRecuperar.value.contrasenia2) {
      this.msj.alerta('La contraseña no coincide');
    } else {
      this.coreService.post('/login/cambiarContraseniaAdmin', params).subscribe(

        (res: any) => {
          this.msj.info('Contraseña actualizada exitosamente');
          this.formularioRecuperar.reset();
        },
        (err: any) => {
          console.log(err);
        }
      )
    }

  }
}
