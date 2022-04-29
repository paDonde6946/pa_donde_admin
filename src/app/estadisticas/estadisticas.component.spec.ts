import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasComponent } from './estadisticas.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { interval, of, throwError } from 'rxjs';

describe('EstadisticasComponent', () => {
  let component: EstadisticasComponent;
  let fixture: ComponentFixture<EstadisticasComponent>;
  let httpMock: HttpClientTestingModule;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Cuando getTotalConductores() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getTotalConductores();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ estadisticas: []}));
      component.getTotalConductores();

    });
  });

  describe('Cuando getTotalVehiculos() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getTotalVehiculos();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ estadisticas: []}));
      component.getTotalVehiculos();

    });
  });

  describe('Cuando getTotalUsuarios() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getTotalUsuarios();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ estadisticas: []}));
      component.getTotalUsuarios();

    });
  });

  describe('Cuando getTotalServicios() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getTotalServicios();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ estadisticas: []}));
      component.getTotalServicios();

    });
  });

  describe('Cuando getConductoresMasServicios() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getConductoresMasServicios();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ estadisticas: []}));
      component.getConductoresMasServicios();

    });
  });

  describe('Cuando getConductoresMasServicios() es llamado', () => {

    it('Deberia manejar un error', () => {
      spyOn(component.coreService, 'get').and.returnValue(throwError({ error: 'error' }));
      component.getCarrosMotos();
    });

    it('Todo deberia ir bien', () => {
      spyOn(component.coreService, 'get').and.returnValue(of({ estadisticas: []}));
      component.getCarrosMotos();

    });
  });
});
