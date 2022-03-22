import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AppConfig } from './app.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AuthGuard } from './core/_guards/auth.guard';
import {MenubarModule} from 'primeng/menubar';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { RouterTestingModule } from '@angular/router/testing';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { CargandoComponent } from './cargando/cargando.component';
import { ServiciosComponent } from './servicios/servicios.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CambiarContraseniaComponent } from './cambiar-contrasenia/cambiar-contrasenia.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ChartModule } from 'primeng/chart';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    UsuariosComponent,
          VehiculosComponent,
          CargandoComponent,
          ServiciosComponent,
          EstadisticasComponent,
          CambiarContraseniaComponent,
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
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
    MenubarModule,
    ToolbarModule,
    TableModule,
    DropdownModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    RouterTestingModule,
    ProgressBarModule,
    InputTextareaModule,
    CalendarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ChartModule
  ],
  providers: [AuthGuard, MessageService,ConfirmationService, RouterTestingModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
