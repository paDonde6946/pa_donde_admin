import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { VehiculosComponent } from './vehiculos.component';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { By } from '@angular/platform-browser';

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
});
