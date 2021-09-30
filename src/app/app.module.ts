import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './app.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './header/header.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BasePanelMenuItem, PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthGuard } from './core/_guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    MenuComponent,
    HeaderComponent,
    UsuariosComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutes,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    SidebarModule,
    PanelMenuModule,
  ],
  providers: [AuthGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
