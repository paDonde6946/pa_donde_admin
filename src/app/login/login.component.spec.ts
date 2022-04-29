import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreService } from '../core/_services/core.services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion de componente LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Retornar formulario Login invalido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioLogin;
    const correo = app.formularioLogin.controls['correo'];
    const contrasenia = app.formularioLogin.controls['contrasenia'];

    correo.setValue('wramosc@unbosque.edu.co');

    expect(form.invalid).toBeTrue();

  });

  it('Retornar formulario Login valido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioLogin;
    const correo = app.formularioLogin.controls['correo'];
    const contrasenia = app.formularioLogin.controls['contrasenia'];

    correo.setValue('wramosc@unbosque.edu.co');
    contrasenia.setValue('Contrasenia123*');

    expect(form.valid).toBeTrue();

  });

  it('Retornar formulario Recuperar invalido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioRecuperar;
    const correo = app.formularioRecuperar.controls['correo'];

    expect(form.invalid).toBeTrue();

  });

  it('Retornar formulario Recuperar valido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioRecuperar;
    const correo = app.formularioRecuperar.controls['correo'];

    correo.setValue('wramosc@unbosque.edu.co');

    expect(form.valid).toBeTrue();

  });

  it('Retornar formulario Nueva contrasenia invalido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioNuevaContrasenia;
    const contrasenia1 = app.formularioNuevaContrasenia.controls['contrasenia1'];
    const contrasenia2 = app.formularioNuevaContrasenia.controls['contrasenia2'];

    contrasenia1.setValue('Contrasenia*123');

    expect(form.invalid).toBeTrue();

  });

  it('Retornar formulario Nueva contrasenia valido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioNuevaContrasenia;
    const contrasenia1 = app.formularioNuevaContrasenia.controls['contrasenia1'];
    const contrasenia2 = app.formularioNuevaContrasenia.controls['contrasenia2'];

    contrasenia1.setValue('Contrasenia*123');
    contrasenia2.setValue('Contrasenia*123');

    expect(form.valid).toBeTrue();

  });

  it('Metodo Login()', () => {
    component.login();
    fixture.detectChanges();
  });

  it('Metodo Logout()', () => {
    component.logout();
    fixture.detectChanges();
  });

  it('Metodo recuperarContrasenia()', () => {
    component.recuperarContrasenia();
    fixture.detectChanges();
  });

  it('Metodo guardarContrasenia()', () => {
    component.guardarContrasenia();
    fixture.detectChanges();
  });

  it('Metodo obtainAccessToken(formularioLogin: any)', () => {
    component.obtainAccessToken('formulario');
    fixture.detectChanges();
  });

  
  it('Metodo volver()', () => {
    component.volver();
    fixture.detectChanges();
  });
  
  it('Metodo saveToken(token: any, user: any)', () => {
    component.saveToken('token', 'user');
    fixture.detectChanges();
  });

  describe('Cuando enviarRecuperar() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'post').and.returnValue(throwError({ error: 'error' }));
      component.enviarRecuperar();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'post').and.returnValue(of({ json: [] }));
      component.enviarRecuperar();
      fixture.detectChanges();
      expect(component.recuperar).toBeFalse();
      expect(component.cambiarContrasenia).toBeFalse();
      expect(component.loginAdmin).toBeTrue();
    });
  });
});
