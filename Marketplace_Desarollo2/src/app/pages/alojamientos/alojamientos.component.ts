import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';
@Component({ standalone: false, selector: 'app-alojamientos', templateUrl: './alojamientos.component.html' })
export class AlojamientosComponent implements OnInit {
  alojamientos: Alojamiento[]=[]; ciudades:string[]=[]; tipos:string[]=[];
  ciudad=''; tipo=''; huespedes:number|null=null; precioMaximo:number|null=null; cargando=true; error='';
  constructor(private service:AlojamientoService,private route:ActivatedRoute){}
  ngOnInit():void { this.service.obtenerAlojamientosActivos().subscribe({
    next:a=>{this.alojamientos=a;this.ciudades=[...new Set(a.map(x=>x.ciudad))].sort();this.tipos=[...new Set(a.map(x=>x.tipo))].sort();this.aplicarBusqueda();this.cargando=false;},
    error:()=>{this.error='No se pudieron cargar los alojamientos. Revisa la ruta del JSON.';this.cargando=false;}
  });}
  private aplicarBusqueda():void{
    const q=this.route.snapshot.queryParamMap;
    const normal=(t:string)=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
    const c=q.get('ciudad');
    if(c){this.ciudad=this.ciudades.find(x=>normal(x)===normal(c))??c;}
    const h=Number(q.get('huespedes'));
    if(Number.isInteger(h)&&h>0){this.huespedes=h;}
  }
  get filtrados():Alojamiento[]{return this.alojamientos.filter(a=>
    (!this.ciudad||a.ciudad===this.ciudad)&&(!this.tipo||a.tipo===this.tipo)&&
    (this.huespedes==null||this.huespedes<=0||a.capacidad>=this.huespedes)&&
    (this.precioMaximo==null||this.precioMaximo<=0||a.precioNoche<=this.precioMaximo));}
  limpiar():void{this.ciudad='';this.tipo='';this.huespedes=null;this.precioMaximo=null;}
  precio(v:number):string{return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(v);}
}