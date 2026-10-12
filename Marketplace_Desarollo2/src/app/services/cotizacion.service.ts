import { Injectable } from '@angular/core';
import { Alojamiento } from '../models/alojamiento.model';
import { Cotizacion } from '../models/cotizacion.model';

@Injectable({ providedIn: 'root' })
export class CotizacionService {
  calcular(a: Alojamiento, llegada: string, salida: string, huespedes: number): Cotizacion {
    if (!llegada || !salida) throw new Error('Selecciona la fecha de llegada y la de salida.');
    if (!this.esFechaValida(llegada) || !this.esFechaValida(salida)) throw new Error('Selecciona fechas válidas.');

    const inicio = this.fechaLocal(llegada);
    const fin = this.fechaLocal(salida);
    const hoy = this.fechaLocal(this.fechaMinima());
    const noches = Math.round((fin.getTime() - inicio.getTime()) / 86400000);

    if (inicio.getTime() < hoy.getTime()) throw new Error('La llegada no puede ser anterior a hoy.');
    if (noches <= 0) throw new Error('La salida debe ser posterior a la llegada.');
    if (!Number.isInteger(huespedes) || huespedes < 1) throw new Error('Los huéspedes deben ser un número entero mayor que cero.');
    if (huespedes > a.capacidad) throw new Error(`Este alojamiento admite máximo ${a.capacidad} huéspedes.`);
    if (!Number.isFinite(a.precioNoche) || a.precioNoche <= 0) throw new Error('El precio por noche no es válido.');
    if (!Number.isFinite(a.tarifaLimpieza) || a.tarifaLimpieza < 0) throw new Error('La tarifa de limpieza no es válida.');

    const subtotal = noches * a.precioNoche;
    const tarifaServicio = Math.round(subtotal * 0.10);
    const tarifaLimpieza = a.tarifaLimpieza;
    return {
      fechaLlegada: llegada, fechaSalida: salida, huespedes, noches,
      subtotal, tarifaLimpieza, tarifaServicio,
      total: subtotal + tarifaLimpieza + tarifaServicio
    };
  }

  fechaMinima(): string {
    const hoy = new Date();
    return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  }

  private esFechaValida(valor: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
    const fecha = this.fechaLocal(valor);
    return Number.isFinite(fecha.getTime()) && this.formatoFecha(fecha) === valor;
  }

  private fechaLocal(valor: string): Date {
    const [anio, mes, dia] = valor.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  }

  private formatoFecha(fecha: Date): string {
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }
}
