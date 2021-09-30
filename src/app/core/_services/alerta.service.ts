import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AlertasService {

    constructor(
        public msj: MessageService
    ) { }

    info(texto: any) {
        this.msj.add({ key: 'tc', severity: 'info', summary: 'Aviso: ', detail: texto ,  life: 10000 });
    }

    alerta(texto: any) {
        this.msj.add({ key: 'tc', severity: 'warn', summary: 'Advertencia: ', detail: texto ,  life: 10000 });
    }

    error(texto: any) {
        this.msj.add({ key: 'tc', severity: 'error', summary: 'Error: ', detail: texto ,  life: 10000});
    }

    limpiar() {
        this.msj.clear();
    }

}
