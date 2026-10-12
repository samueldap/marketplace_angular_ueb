import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Alojamiento } from '../../models/alojamiento.model';
import { Resena } from '../../models/resena.model';
import { Cotizacion } from '../../models/cotizacion.model';
import { Reserva } from '../../models/reserva.model';
import { AlojamientoService } from '../../services/alojamiento.service';
import { CotizacionService } from '../../services/cotizacion.service';
import { ReservaService } from '../../services/reserva.service';
@Component({ standalone: false, selector:'app-detalle-alojamiento',templateUrl:'./detalle-alojamiento.component.html' })
export class DetalleAlojamientoComponent implements OnInit,OnDestroy {
  alojamiento?:Alojamiento; resenas:Resena[]=[]; cargando=true; noEncontrado=false;
  llegada=''; salida=''; huespedes=1; nombre=''; correo=''; cotizacion?:Cotizacion; reserva?:Reserva;
  error=''; minFecha=''; private sub?:Subscription;
  constructor(private route:ActivatedRoute,private alojamientos:AlojamientoService,private cotizador:CotizacionService,private reservas:ReservaService){}
  ngOnInit():void {this.minFecha=this.cotizador.fechaMinima();this.sub=this.route.paramMap.pipe(switchMap(p=>this.alojamientos.obtenerPorId(Number(p.get('id'))))).subscribe({
    next:a=>{this.alojamiento=a;this.cargando=false;this.noEncontrado=!a;this.cotizacion=undefined;this.reserva=undefined;this.error='';if(a){this.huespedes=1;this.alojamientos.obtenerResenas(a.id).subscribe({next:r=>this.resenas=r,error:()=>this.resenas=[]});}},
    error:()=>{this.cargando=false;this.noEncontrado=true;}
  });}
  ngOnDestroy():void{this.sub?.unsubscribe();}
  invalidarCotizacion():void{this.cotizacion=undefined;this.reserva=undefined;this.error='';}
  cotizar():void{this.error='';this.cotizacion=undefined;this.reserva=undefined;if(!this.alojamiento)return;try{this.cotizacion=this.cotizador.calcular(this.alojamiento,this.llegada,this.salida,Number(this.huespedes));}catch(e){this.error=e instanceof Error?e.message:'No fue posible calcular la cotización.';}}
  reservar():void{this.error='';if(!this.alojamiento||!this.cotizacion){this.error='Primero genera una cotización válida.';return;}try{const cotizacionActual=this.cotizador.calcular(this.alojamiento,this.llegada,this.salida,Number(this.huespedes));this.reserva=this.reservas.crear(this.alojamiento,cotizacionActual,this.nombre,this.correo);this.cotizacion=undefined;this.nombre='';this.correo='';}catch(e){this.error=e instanceof Error?e.message:'No fue posible crear la reserva.';}}
  precio(v:number):string{return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(v);}
}