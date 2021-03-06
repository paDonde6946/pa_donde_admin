import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AlertasService } from '../core/_services/alerta.service';
import { CoreService } from '../core/_services/core.services';
import { CONSTANTES_SESION } from '../core/_util/services-util';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AlertasService, MessageService, RouterTestingModule],
})
export class LoginComponent implements OnInit {
  protected baseUrl: string = 'http://localhost:3001/web';
  // Estados
  loginAdmin: boolean = true;
  recuperar: boolean = false;
  cambiarContrasenia: boolean = false;

  // Id usuario
  uid: any;
  token: any;

  formBuilder: FormBuilder;
  formularioLogin = new FormGroup({
    correo: new FormControl('', Validators.compose([Validators.required])),
    contrasenia: new FormControl('', Validators.compose([Validators.required])),
  });

  formularioRecuperar = new FormGroup({
    correo: new FormControl('', Validators.compose([Validators.required])),
  });

  formularioNuevaContrasenia = new FormGroup({
    contrasenia1: new FormControl('', Validators.compose([Validators.required])),
    contrasenia2: new FormControl('', Validators.compose([Validators.required])),
  })

  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
    public messageService: MessageService,
    protected router: Router,) {

    this.formBuilder = new FormBuilder();
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  login() {

    // Validacion de usuario
    if (this.formularioLogin.value.correo === undefined || this.formularioLogin.value.correo === null || this.formularioLogin.value.correo === '') {
      this.msj.error('Usuario Obligatorio.');

      // Validacion de contraseña
    } else if (this.formularioLogin.value.contrasenia === undefined || this.formularioLogin.value.contrasenia === null || this.formularioLogin.value.contrasenia === '') {
      this.msj.error('Contraseña Obligatorio.');

    } else {
      this.obtainAccessToken(this.formularioLogin);
    }
  }

  enter(event: any) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  obtainAccessToken(formularioLogin: any) {
    let params = {
      correo: this.formularioLogin.value.correo,
      contrasenia: this.formularioLogin.value.contrasenia
    }

    // this.spinner.show();
    this.coreService.getWithParams('/login/admin', params)
      .subscribe(
        (res: any) => {
          if (res.usuario.cambio_contrasenia == 1) {
            this.loginAdmin = false;
            this.cambiarContrasenia = true;
            this.uid = res.usuario.uid;
            this.token = res.token
            sessionStorage.setItem(CONSTANTES_SESION.TOKEN, res.token);

          } else {
            this.loginAdmin = false;
            this.recuperar = false;
            this.cambiarContrasenia = false;
            sessionStorage.setItem(CONSTANTES_SESION.CORREO, params.correo);
            sessionStorage.setItem(CONSTANTES_SESION.TOKEN, res.token);
            sessionStorage.setItem(CONSTANTES_SESION.ID, res.usuario.uid);
            this.router.navigate(['/usuarios']);
          }
        },
        (err: any) => {
          console.log(err);
          this.msj.error('Credenciales Incorrectas.');
        }
      );
  }

  guardarContrasenia() {

    let params = {
      uid: this.uid,
      contrasenia: this.formularioNuevaContrasenia.value.contrasenia1,
      token: this.token
    }
    const criteriosContrasenia = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (this.formularioNuevaContrasenia.value.contrasenia1 != this.formularioNuevaContrasenia.value.contrasenia2) {
      this.msj.alerta('La contraseña no coincide');
    } 
    else if (!criteriosContrasenia.test(this.formularioNuevaContrasenia.value.contrasenia1)) {
      this.msj.alerta("La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial y poseer mas de 8 caracteres")
    }
    else {
      this.coreService.post('/login/cambiarContraseniaAdmin', params).subscribe(
        (res: any) => {
          // console.log('1');
          sessionStorage.setItem(CONSTANTES_SESION.TOKEN, res.token);
          // console.log('2');
          this.cambiarContrasenia = false;
          // console.log('3');
          this.recuperar = false;
          // console.log('4');
          this.loginAdmin = true;
          // console.log('5');
          this.msj.info('Contraseña actualizada exitosamente');
          this.formularioLogin.reset();
        },
        (err: any) => {
          console.log(err);
        }
      )
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  recuperarContrasenia() {
    this.recuperar = true;
    this.loginAdmin = false;
    this.cambiarContrasenia = false;
  }

  enviarRecuperar() {
    let correo = this.formularioRecuperar.value.correo.toString().split("@");

    if (this.formularioRecuperar.value.correo == '') {
      this.msj.alerta('Debe ingresar un correo para recuperar su contraseña.')
    } else if (correo[1] != 'unbosque.edu.co') {
      this.msj.alerta('El correo ingresado no es válido.')
    } else {
      let params = {
        correo: this.formularioRecuperar.value.correo
      }
      console.log(params);
      this.coreService.post('/login/admin/olvidarContrasenia', params).subscribe(
        (res: any) => {
          console.log(res);
          this.msj.info('Se le ha enviado un mensaje a su correo electronico');
          this.recuperar = false;
          this.cambiarContrasenia = false;
          this.loginAdmin = true;
        },
        (err: any) => {
          console.log(err);
        }
      )
    }

  }

  volver() {
    this.loginAdmin = true;
    this.recuperar = false;
    this.cambiarContrasenia = false;
  }

  enterRecuperar(event: any) {
    if (event.key === 'Enter') {
      this.enviarRecuperar();
    }
  }

  enterCambiarContrasenia(event: any) {
    if (event.key === 'Enter') {
    }
  }

  saveToken(token: any, user: any) {
    sessionStorage.setItem(CONSTANTES_SESION.TOKEN, token.token);
    this.router.navigate(['/inicio']);
  }

  redirigir(url: any) {
    this.router.navigate([url]);
  }

  checkCredentials() {
    return sessionStorage.getItem('');
  }
}
