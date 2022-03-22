import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuItem, MessageService } from 'primeng/api';
import { CONSTANTES_SESION } from './core/_util/services-util';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginComponent, MessageService, HttpClient]
})
export class AppComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  title: string = 'PaDondeAdmin';
  display: any;
  logueado: any;
  menu: boolean = false;
  mostrar: boolean = false;
  items: MenuItem[] = [];
  itemsSide: MenuItem[] = [];
  mostrarMenu: any = false;
  constructor(
    private observer: BreakpointObserver,
    protected router: Router,
  ) {
  }

  // Controlador del menu lateral
  ngAfterViewInit() {

    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.menu = false;
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
          this.menu = true;
        }
      });
  }

  // Inicializacion del componente
  ngOnInit(): void {

    this.logueado = sessionStorage.getItem(CONSTANTES_SESION.CORREO);
    this.itemsSide = [

      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        style: { 'noSeleccionado': false },
        id: '1',
        title: '/usuarios'
      },
      {
        label: 'Vehículos',
        icon: 'pi-star-o',
        style: { 'noSeleccionado': true },
        id: '2',
        title: '/vehiculos'
      },
      {
        label: 'Servicios',
        icon: 'pi pi-flag',
        style: { 'noSeleccionado': true },
        id: '3',
        title: '/servicios'
      },
      {
        label: 'Estadísticas',
        icon: 'pi pi-chart-bar',
        style: { 'noSeleccionado': true },
        id: '4',
        title: '/estadisticas'
      },
      {
        label: 'Cambiar Contraseña',
        icon: 'pi pi-lock',
        style: { 'noSeleccionado': true },
        id: '5',
        title: '/cambiarContrasenia'
      },
    ];
  }

  // Valida la seleccion de los botones del menu lateral
  cambiarEstadoAccion(id: any) {
    this.itemsSide.forEach(item => {

      if (item.id == id) {
        item.style.noSeleccionado = false;
        this.router.navigate([item.title]);
      } else {
        item.style.noSeleccionado = true;
      }
    });
  }

  isHomeRouteActivated() {
    window.location.reload();
    return this.router.url;
  }

  // Validar la sesion del usuario
  validarSesion() {
    let sesion = sessionStorage.getItem(CONSTANTES_SESION.CORREO);

    if (sesion == null || sesion == '' || sesion == undefined) {
      return false
    } else {
      return true;
    }
  }

  // Cierra la sesion del usuario y limpia las constantes de sesion
  logout() {
    this.logueado = undefined;
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  mostarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
    console.log(this.mostrarMenu);

  }
}


