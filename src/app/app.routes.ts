import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';


export const routes: Routes = [


    { path: '', component: LoginComponent },
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
    {path: 'vehiculos', component: VehiculosComponent, canActivate: [AuthGuard]},
    {path: 'servicios', component: ServiciosComponent, canActivate: [AuthGuard]},
    {path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard]},

    

];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(
    routes,
    {
        scrollPositionRestoration: 'enabled',
        useHash: true
    }
);