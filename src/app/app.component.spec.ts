import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion de componente AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Proyecto debe tener como titulo 'PaDondeAdmin'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PaDondeAdmin');
  });

  it('Metodo logout()', () => {
    component.logout();
    fixture.detectChanges();
  });

  it('Metodo validarSesion()', () => {
    component.validarSesion();
    fixture.detectChanges();
  });
  it('Metodo mostrarMenu()', () => {
    component.mostarMenu();
    fixture.detectChanges();
  });

  it('Metodo cambiarEstadoAccion(id: any)', () => {
    component.cambiarEstadoAccion(1);
    fixture.detectChanges();
  });
});
