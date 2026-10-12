import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
@Component({ standalone: false,selector:'app-mis-reservas',templateUrl:'./mis-reservas.component.html'})
export class MisReservasComponent implements OnInit {
  reservas:Reserva[]=[]; mensajeError='';
  constructor(private service:ReservaService){}
  ngOnInit():void{this.recargar();}
  recargar():void{this.reservas=this.service.obtenerTodas();}
  precio(v:number):string{return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(v);}
  fecha(v:string):string{return new Date(v+'T12:00:00').toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'});}
  eliminar(id:string):void{if(window.confirm('¿Eliminar esta reserva de la lista local?')){try{this.service.eliminar(id);this.mensajeError='';this.recargar();}catch(e){this.mensajeError=e instanceof Error?e.message:'No se pudo eliminar la reserva.';}}}
}