import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { UsuariosComponent } from './usuarios.component';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MessageService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion de componente UsuariosComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Retornar formulario Usuario invalido', () => {
    const fixture = TestBed.createComponent(UsuariosComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioUsuario;
    const cedula = app.formularioUsuario.controls['cedula'];
    const correo = app.formularioUsuario.controls['correo'];
    cedula.setValue(1127838475);
    correo.setValue('wramosc@unbosque.edu.co');
    expect(form.invalid).toBeTrue();

  });

  it('Retornar formulario Usuario valido', () => {
    const fixture = TestBed.createComponent(UsuariosComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioUsuario;
    const cedula = app.formularioUsuario.controls['cedula'];
    const correo = app.formularioUsuario.controls['correo'];
    const contrasenia = app.formularioUsuario.controls['contrasenia'];
    const nombre = app.formularioUsuario.controls['nombre'];
    const apellido = app.formularioUsuario.controls['apellido'];
    const celular = app.formularioUsuario.controls['celular'];

    cedula.setValue(1127838475);
    correo.setValue('wramosc@unbosque.edu.co');
    contrasenia.setValue('Contrasenia123*');
    nombre.setValue('William');
    apellido.setValue('Ramos');
    celular.setValue(3219992548);

    expect(form.valid).toBeTrue();
  });

  describe('Cuando getListadoUsuarios() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getListadoUsuarios();
      expect(component.error).toBeTrue();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ users: [] }));
      component.getListadoUsuarios();
      expect(component.cargando).toBeFalse();
      expect(component.error).toBeFalse();
    });
  });

  describe('Cuando putGuardarUsuario() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'putWithOutParam').and.returnValue(throwError({ error: 'error' }));
      component.putGuardarUsuario();
      expect(component.error).toBeTrue();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'putWithOutParam').and.returnValue(of({ users: [] }));
      component.putGuardarUsuario();
      expect(component.error).toBeFalse();
    });
  });

  describe('Cuando postActualizarUsuario() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'post').and.returnValue(throwError({ error: 'error' }));
      component.postActualizarUsuario();
      expect(component.error).toBeTrue();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'post').and.returnValue(of({ users: [] }));
      component.postActualizarUsuario();
      expect(component.error).toBeFalse();
    });
  });

  describe('Cuando actualizarEstado(data: any) es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'post').and.returnValue(throwError({ error: 'error' }));
      component.actualizarEstado(1);
      expect(component.error).toBeTrue();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'post').and.returnValue(of({ users: [] }));
      component.actualizarEstado(1);
      // expect(component.getListadoUsuarios()).toHaveBeenCalled();
      expect(component.prepararUsuario).toBeFalse();
    });
  });

  it('Metodo cargarDatosEditar(iLista: any, valor: any)', () => {
    component.cargarDatosEditar('lista',1);
    fixture.detectChanges();
  });

  it('Estados componentes en prepararNuevo()', () => {
    component.prepararNuevo();
    fixture.detectChanges();
    expect(component.prepararNuevo).toBeTruthy();
    expect(component.botonGuardar).toBeTruthy();
    expect(component.botonEditar).toBeFalse();
  });

  it('Estados componentes en volver()', () => {
    component.volver();
    fixture.detectChanges();
    expect(component.botonGuardar).toBeFalse();
    expect(component.botonEditar).toBeFalse();
  });

  it('Estados componentes en volver()', () => {
    component.volver();
    fixture.detectChanges();
    expect(component.botonGuardar).toBeFalse();
    expect(component.botonEditar).toBeFalse();
  });

  it('Metodo Agregar()', () => {
    component.agregar();
    fixture.detectChanges();

    const form = component.formularioUsuario;
    const cedula = component.formularioUsuario.controls['cedula'];
    let correo = component.formularioUsuario.controls['correo'];
    const contrasenia = component.formularioUsuario.controls['contrasenia'];
    const nombre = component.formularioUsuario.controls['nombre'];
    const apellido = component.formularioUsuario.controls['apellido'];
    const celular = component.formularioUsuario.controls['celular'];

    cedula.setValue(1127838475);
    correo.setValue('wramosc@unbosque.edu.co');
    contrasenia.setValue('Contrasenia123*');
    nombre.setValue('William');
    apellido.setValue('Ramos');
    celular.setValue(3219992548);
    expect(form.valid).toBeTrue();

  });

  it('Metodo editarUsuario(data: any)', () => {
    component.editarUsuario(1);
    fixture.detectChanges();
  });

  it('Metodo actualizar()', () => {
    component.actualizar();
    fixture.detectChanges();
  });

  it('Metodo editarUsuario(data: any)', () => {
    component.editarUsuario(1);
    fixture.detectChanges();
  });

  it('Metodo campoNoValido(campo: any)', () => {
    component.campoNoValido('campo');
    fixture.detectChanges();
  });

  it('Metodo campoNoValido(campo: any)', () => {
    component.campoNoValido('campo');
    fixture.detectChanges();
  });
});
