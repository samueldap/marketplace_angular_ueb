import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, shareReplay, tap } from 'rxjs';
import { Alojamiento } from '../models/alojamiento.model';
import { Resena } from '../models/resena.model';
import { MarketplaceData } from '../models/marketplace-data.model';

@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  private readonly url = 'assets/data/marketplace-data.json';
  private readonly apiUrl = '/api/alojamientos';
  private datos$?: Observable<MarketplaceData>;
  private cache?: MarketplaceData;

  constructor(private http: HttpClient) {}

  private cargar(): Observable<MarketplaceData> {
    if (this.cache) return of(this.cache);
    if (!this.datos$) {
      this.datos$ = this.http.get<MarketplaceData>(`${this.url}?v=${Date.now()}`).pipe(
        map(d => ({
          alojamientos: Array.isArray(d?.alojamientos) ? d.alojamientos.map(a => this.normalizar(a)) : [],
          resenas: Array.isArray(d?.resenas) ? d.resenas : []
        })),
        tap(d => this.cache = d),
        shareReplay(1)
      );
    }
    return this.datos$;
  }

  /** Envía el alojamiento al servidor (que lo guarda en marketplace-data.json) y lo añade a los datos en memoria. */
  crear(alojamiento: Omit<Alojamiento, 'id'>): Observable<Alojamiento> {
    return this.http.post<Alojamiento>(this.apiUrl, alojamiento).pipe(
      map(a => this.normalizar(a)),
      tap(nuevo => {
        if (this.cache) this.cache = { ...this.cache, alojamientos: [...this.cache.alojamientos, nuevo] };
      })
    );
  }

  obtenerDatos(): Observable<Alojamiento[]> {
    return this.cargar().pipe(map(d => d.alojamientos));
  }

  obtenerAlojamientosActivos(): Observable<Alojamiento[]> {
    return this.obtenerDatos().pipe(map(alojamientos => alojamientos.filter(a => a.activo)));
  }

  obtenerPorId(id: number): Observable<Alojamiento | undefined> {
    return this.obtenerAlojamientosActivos().pipe(map(alojamientos => alojamientos.find(a => a.id === id)));
  }

  obtenerResenas(alojamientoId: number): Observable<Resena[]> {
    return this.cargar().pipe(map(d => d.resenas.filter(r => Number(r.alojamientoId) === alojamientoId)));
  }

  private normalizar(a: Alojamiento): Alojamiento {
    return {
      ...a,
      id: Number(a.id),
      capacidad: Number(a.capacidad) || 1,
      habitaciones: Number(a.habitaciones) || 0,
      camas: Number(a.camas) || 1,
      banos: Number(a.banos) || 1,
      precioNoche: Number(a.precioNoche) || 0,
      tarifaLimpieza: Number(a.tarifaLimpieza) || 0,
      calificacion: Number(a.calificacion) || 0,
      activo: a.activo === true,
      imagenes: Array.isArray(a.imagenes) ? a.imagenes : [],
      servicios: Array.isArray(a.servicios) ? a.servicios : [],
      reglas: Array.isArray(a.reglas) ? a.reglas : []
    };
  }
}
