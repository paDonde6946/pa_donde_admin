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
  // Login
  logueado: boolean = false;
  formBuilder: FormBuilder;
  formularioLogin = new FormGroup({
    correo: new FormControl('', Validators.compose([Validators.required])),
    contrasenia: new FormControl('', Validators.compose([Validators.required])),
  });

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
          sessionStorage.setItem(CONSTANTES_SESION.CORREO, formularioLogin.correo);
          sessionStorage.setItem(CONSTANTES_SESION.TOKEN, res.token);
          this.router.navigate(['/usuarios']);
        },
        (err: any) => {
          console.log(err);
          this.msj.error('Credenciales Incorrectas.');
        }
      );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
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
