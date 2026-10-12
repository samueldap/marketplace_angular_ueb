import { Injectable } from '@angular/core';
import { Alojamiento } from '../models/alojamiento.model';
import { Cotizacion } from '../models/cotizacion.model';
import { Reserva } from '../models/reserva.model';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly key = 'marketplace-alojamientos-reservas';

  obtenerTodas(): Reserva[] {
    try {
      const datos: unknown = JSON.parse(localStorage.getItem(this.key) || '[]');
      return Array.isArray(datos) ? (datos as Reserva[]) : [];
    } catch {
      return [];
    }
  }

  crear(a: Alojamiento, c: Cotizacion, nombre: string, correo: string): Reserva {
    const n = nombre.trim();
    const e = correo.trim();
    if (n.length < 2) throw new Error('Ingresa el nombre del huésped (mínimo 2 caracteres).');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error('Ingresa un correo válido.');
    if (!c || !Number.isFinite(c.total) || c.total <= 0 || c.noches < 1) throw new Error('Genera una cotización válida antes de reservar.');

    const r: Reserva = {
      id: `RES-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      alojamientoId: a.id, alojamientoNombre: a.nombre, alojamientoImagen: a.imagenPrincipal,
      ciudad: a.ciudad, fechaLlegada: c.fechaLlegada, fechaSalida: c.fechaSalida,
      huespedes: c.huespedes, noches: c.noches, subtotal: c.subtotal,
      tarifaLimpieza: c.tarifaLimpieza, tarifaServicio: c.tarifaServicio,
      total: c.total, nombreHuesped: n, correoHuesped: e, estado: 'CONFIRMADA'
    };

    try {
      const reservas = this.obtenerTodas();
      reservas.unshift(r);
      localStorage.setItem(this.key, JSON.stringify(reservas));
      return r;
    } catch {
      throw new Error('El navegador no pudo guardar la reserva. Revisa el almacenamiento local.');
    }
  }

  eliminar(id: string): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.obtenerTodas().filter(r => r.id !== id)));
    } catch {
      throw new Error('No se pudo eliminar la reserva del almacenamiento local.');
    }
  }
}
