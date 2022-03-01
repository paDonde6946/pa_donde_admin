import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuItem, MessageService } from 'primeng/api';
import { CONSTANTES_SESION } from './core/_util/services-util';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginComponent, MessageService,  HttpClient]
})
export class AppComponent implements OnInit {
  title: string = 'PaDondeAdmin';
  display: any;
  logueado: any;
  items: MenuItem[] = [];
  itemsSide: MenuItem[] = [];
  mostrarMenu : any = false;
  constructor(
    protected router: Router,
  ) {
  }
  ngOnInit(): void {
    this.logueado = sessionStorage.getItem(CONSTANTES_SESION.TOKEN);
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
    let sesion = sessionStorage.getItem(CONSTANTES_SESION.CORREO);

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

  mostarMenu(){
    this.mostrarMenu =!this.mostrarMenu;
    console.log(this.mostrarMenu);
  
  }
}


