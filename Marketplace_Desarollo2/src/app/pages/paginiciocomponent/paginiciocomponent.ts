import { Component, OnInit } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-paginiciocomponent',
  standalone: false,
  styleUrl: './paginiciocomponent.css',
  templateUrl: './paginiciocomponent.html',
})
export class Paginiciocomponent implements OnInit {
  destacados: Alojamiento[] = [];
  cargandoAlojamientos = true;
  errorAlojamientos = '';

  constructor(private alojamientos: AlojamientoService) {}

  ngOnInit(): void {
    this.alojamientos.obtenerAlojamientosActivos().subscribe({
      next: datos => {
        this.destacados = [...datos].sort((a, b) => b.calificacion - a.calificacion).slice(0, 3);
        this.cargandoAlojamientos = false;
      },
      error: () => {
        this.errorAlojamientos = 'No se pudieron cargar los alojamientos. Comprueba que el servidor esté iniciado.';
        this.cargandoAlojamientos = false;
      }
    });
  }

  precio(valor: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor);
  }
}
