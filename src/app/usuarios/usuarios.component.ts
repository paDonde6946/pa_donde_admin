import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../core/_services/alerta.service';
import { CoreService } from '../core/_services/core.services';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  // Variables tabla Usuarios
  columnas: any[] = [];
  registroLista: any[] = [];
  totalRecords = 0;

  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
  ) { }

  ngOnInit(): void {

    this.columnas = [
      { header: 'Nombre', field: 'nombre' },
      { header: 'Apellido', field: 'apellido' },
      { header: 'Teléfono', field: 'celular' }
    ];

    this.getListadoExperiencias();
  }

  getListadoExperiencias() {
    
    this.coreService.get('/usuario/listaUsuarios').subscribe(
      (res: any) => {
        this.registroLista = res.listaUsuario;
        this.totalRecords = this.registroLista.length;
        console.log(res.listaUsuario);
        console.log(this.totalRecords);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
