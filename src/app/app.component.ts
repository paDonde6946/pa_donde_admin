import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuItem, MessageService } from 'primeng/api';
import { CONSTANTES_SESION } from './core/_util/services-util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginComponent, MessageService]
})
export class AppComponent implements OnInit {

  display: any;
  logueado: any;
  items: MenuItem[] = [];
  itemsSide: MenuItem[] = [];
  constructor(
    protected router: Router,
  ) {
  }
  ngOnInit(): void {
    this.logueado = sessionStorage.getItem(CONSTANTES_SESION.TOKEN);
    console.log(this.logueado);
    this.items = [

      {
        label: 'Administrador',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-user',
            // routerLink: ['/usuarios'],
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-fw pi-power-off'
          },
        ]

      },
    ];
    this.itemsSide = [

      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        style: { 'noSeleccionado': false },
        id: '1',
        title: '/usuarios'
      },
      {
        label: 'Vehiculos',
        icon: 'pi-star-o',
        style: { 'noSeleccionado': true },
        id: '2',
        title: '/usuarios'
      },
      {
        label: 'Parametros',
        icon: 'pi pi-cog',
        style: { 'noSeleccionado': true },
        id: '3',
        title: '/usuarios'
      },
      {
        label: 'Estadisticas',
        icon: 'pi pi-chart-bar',
        style: { 'noSeleccionado': true },
        id: '4',
        title: '/usuarios'
      },
    ];
  }

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
    return this.router.url;
  }

  validarSesion() {
    let sesion = sessionStorage.getItem(CONSTANTES_SESION.TOKEN);

    if (sesion == null || sesion == '' || sesion == undefined) {
      return false
    } else {
      return true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}


