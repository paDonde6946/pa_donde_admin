import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiciosComponent } from './servicios.component';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

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
});
