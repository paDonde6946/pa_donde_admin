import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContraseniaComponent } from './cambiar-contrasenia.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('CambiarContraseniaComponent', () => {
  let component: CambiarContraseniaComponent;
  let fixture: ComponentFixture<CambiarContraseniaComponent>;
  let httpMock: HttpClientTestingModule;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarContraseniaComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('Creacion de componente CambiarContraseniaComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Retornar formulario cambiar contrasenia invalido', () => {
    const fixture = TestBed.createComponent(CambiarContraseniaComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioRecuperar;
    const contraseniaActual = app.formularioRecuperar.controls['contraseniaActual'];
    const contrasenia1 = app.formularioRecuperar.controls['contrasenia1'];
    const contrasenia2 = app.formularioRecuperar.controls['contrasenia2'];

    contrasenia1.setValue('Contrasenia*123');

    expect(form.invalid).toBeTrue();

  });

  it('Retornar formulario cambiar contrasenia valido', () => {
    const fixture = TestBed.createComponent(CambiarContraseniaComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const form = app.formularioRecuperar;
    const contraseniaActual = app.formularioRecuperar.controls['contraseniaActual'];
    const contrasenia1 = app.formularioRecuperar.controls['contrasenia1'];
    const contrasenia2 = app.formularioRecuperar.controls['contrasenia2'];

    contraseniaActual.setValue('Contrasenia*123')
    contrasenia1.setValue('Contra@123');
    contrasenia2.setValue('Contra@123');

    expect(form.valid).toBeTrue();

  });
});
