import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


export const routes: Routes = [


    { path: '', component: LoginComponent },
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
    

];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(
    routes,
    {
        scrollPositionRestoration: 'enabled',
        useHash: true
    }
);