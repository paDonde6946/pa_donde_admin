import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiciosComponent } from './servicios.component';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';

describe('ServiciosComponent', () => {
  let component: ServiciosComponent;
  let fixture: ComponentFixture<ServiciosComponent>;
  let httpMock: HttpClientTestingModule;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [MessageService],
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion de componente ServiciosComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Cuando getListadoServicios() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getListadoServicios();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ servicios: [] }));
      component.getListadoServicios();
    });
  });

  describe('Cuando actualizarEstado(data: any) es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'put').and.returnValue(throwError({ error: 'error' }));
      component.actualizarEstado(1);
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'put').and.returnValue(of({ servicios: [] }));
      component.actualizarEstado(1);
    });
  });

  it('Metodo cargarDatosEditar(iLista: any, valor: any)', () => {
    component.cargarDatosEditar('lista',1);
    fixture.detectChanges();
  });
});
