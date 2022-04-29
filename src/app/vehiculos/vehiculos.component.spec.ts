import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { VehiculosComponent } from './vehiculos.component';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let httpMock: HttpClientTestingModule;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculosComponent],
      imports: [HttpClientTestingModule],
      providers: [MessageService]
    })
      .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion de componente VehiculosComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Retornar formulario Vehiculo invalido', () => {
    const fixture = TestBed.createComponent(VehiculosComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioVehiculo;
    const cedula = app.formularioVehiculo.controls['cedula'];
    const placa = app.formularioVehiculo.controls['placa'];
    const tipoVehiculo = app.formularioVehiculo.controls['tipoVehiculo'];
    const color = app.formularioVehiculo.controls['color'];
    const marca = app.formularioVehiculo.controls['marca'];
    const anio = app.formularioVehiculo.controls['anio'];
    const modelo = app.formularioVehiculo.controls['modelo'];

    cedula.setValue(1127939453);
    placa.setValue('AAA321');
    tipoVehiculo.setValue(1);
    color.setValue('Blanco');
    marca.setValue('BMW');

    expect(form.invalid).toBeTrue();

  });

  it('Retornar formulario Vehiculo valido', () => {
    const fixture = TestBed.createComponent(VehiculosComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioVehiculo;
    const cedula = app.formularioVehiculo.controls['cedula'];
    const placa = app.formularioVehiculo.controls['placa'];
    const tipoVehiculo = app.formularioVehiculo.controls['tipoVehiculo'];
    const color = app.formularioVehiculo.controls['color'];
    const marca = app.formularioVehiculo.controls['marca'];
    const anio = app.formularioVehiculo.controls['anio'];
    const modelo = app.formularioVehiculo.controls['modelo'];

    cedula.setValue(1127939453);
    placa.setValue('AAA321');
    tipoVehiculo.setValue(1);
    color.setValue('Blanco');
    marca.setValue('BMW');
    anio.setValue('2020');
    modelo.setValue('X5');

    expect(form.valid).toBeTrue();
  });

  describe('Cuando getListadoVehiculos() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getListadoVehiculos();
      expect(component.error).toBeTrue();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ vehicules: [] }));
      component.getListadoVehiculos();
      expect(component.prepararVehiculo).toBeFalse();
      expect(component.error).toBeFalse();
    });
  });

  describe('Cuando setEstado(uid: any) es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'put').and.returnValue(throwError({ error: 'error' }));
      component.setEstado(1);
      expect(component.error).toBeTrue();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'put').and.returnValue(of({ vehicules: [] }));
      component.setEstado(1);
      expect(component.error).toBeFalse();
    });
  });

  describe('Cuando agregar() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.agregar();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ vehicules: [] }));
      component.agregar();

      const form = component.formularioVehiculo;
      const cedula = component.formularioVehiculo.controls['cedula'];
      const placa = component.formularioVehiculo.controls['placa'];
      const tipoVehiculo = component.formularioVehiculo.controls['tipoVehiculo'];
      const color = component.formularioVehiculo.controls['color'];
      const marca = component.formularioVehiculo.controls['marca'];
      const anio = component.formularioVehiculo.controls['anio'];
      const modelo = component.formularioVehiculo.controls['modelo'];

      cedula.setValue(1127939453);
      placa.setValue('AAA321');
      tipoVehiculo.setValue(1);
      color.setValue('Blanco');
      marca.setValue('BMW');
      anio.setValue('2020');
      modelo.setValue('X5');

      expect(form.valid).toBeTrue();
    });
  });

  describe('Cuando putGuardarVehiculo() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'post').and.returnValue(throwError({ error: 'error' }));
      component.putGuardarVehiculo();
      expect(component.error).toBeTrue();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'post').and.returnValue(of({ vehicules: [] }));
      component.putGuardarVehiculo();

      const form = component.formularioVehiculo;
      const cedula = component.formularioVehiculo.controls['cedula'];
      const placa = component.formularioVehiculo.controls['placa'];
      const tipoVehiculo = component.formularioVehiculo.controls['tipoVehiculo'];
      const color = component.formularioVehiculo.controls['color'];
      const marca = component.formularioVehiculo.controls['marca'];
      const anio = component.formularioVehiculo.controls['anio'];
      const modelo = component.formularioVehiculo.controls['modelo'];

      cedula.setValue(1127939453);
      placa.setValue('AAA321');
      tipoVehiculo.setValue(1);
      color.setValue('Blanco');
      marca.setValue('BMW');
      anio.setValue('2020');
      modelo.setValue('X5');

      expect(form.valid).toBeTrue();

    });
  });

  describe('Cuando validarUsuario(cedula: any) es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.validarUsuario(1127939453);
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ users: [] }));
      component.validarUsuario(1127939453);

    });
  });

  describe('Cuando  actualizar() es llamado', () => {
    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'put').and.returnValue(throwError({ error: 'error' }));
      component.actualizar();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'put').and.returnValue(of({ vehicules: [] }));
      
      const form = component.formularioVehiculo;
      const cedula = component.formularioVehiculo.controls['cedula'];
      const placa = component.formularioVehiculo.controls['placa'];
      const tipoVehiculo = component.formularioVehiculo.controls['tipoVehiculo'];
      const color = component.formularioVehiculo.controls['color'];
      const marca = component.formularioVehiculo.controls['marca'];
      const anio = component.formularioVehiculo.controls['anio'];
      const modelo = component.formularioVehiculo.controls['modelo'];
      
      cedula.setValue(1127939453);
      placa.setValue('AAA321');
      tipoVehiculo.setValue(1);
      color.setValue('Blanco');
      marca.setValue('BMW');
      anio.setValue('2020');
      modelo.setValue('X5');
      
      expect(form.valid).toBeTrue();

      component.actualizar();
    });
  });

  it('Metodo editarVehiculo(data: any)', () => {
    component.editarVehiculo(1);
    fixture.detectChanges();
  });

  it('Metodo volver()', () => {
    component.volver();
    fixture.detectChanges();
    expect(component.prepararVehiculo).toBeFalse;
    expect(component.botonGuardar).toBeFalse;
    expect(component.botonEditar).toBeFalse;
  });

  it('Metodo agregarVehiculo()', () => {
    component.agregarVehiculo();
    fixture.detectChanges();
    expect(component.prepararVehiculo).toBeFalse;
    expect(component.botonGuardar).toBeFalse;
    expect(component.botonEditar).toBeFalse;
  });

  it('Metodo campoNoValido(campo: any)', () => {
    component.campoNoValido('campo');
    fixture.detectChanges();
  });
});
