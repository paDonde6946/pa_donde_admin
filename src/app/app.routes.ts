import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },

];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(
    routes,
    {
        scrollPositionRestoration: 'enabled',
        useHash: true
    }
);