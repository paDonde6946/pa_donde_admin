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
      expect(component.cargando).toBeTrue();
      expect(component.error).toBeFalsy();
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
      expect(component.error).toBeFalsy();
    });
  });

});
