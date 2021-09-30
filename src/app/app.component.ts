import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginComponent, MessageService]
})
export class AppComponent implements OnInit {
  display: any;
  logueado: any;
  constructor(
    protected router: Router,
    private login: LoginComponent,
  ) {

    this.logueado = this.login.logueado;
  }
  ngOnInit(): void {
    
  }

  isHomeRouteActivated(){
    return this.router.url;
  }
}


