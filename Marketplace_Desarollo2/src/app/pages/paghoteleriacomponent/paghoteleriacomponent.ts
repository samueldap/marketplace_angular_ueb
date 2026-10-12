import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-paghoteleriacomponent',
  standalone: false,
  templateUrl: './paghoteleriacomponent.html',
  styleUrl: './paghoteleriacomponent.css'
})
export class Paghoteleriacomponent implements OnInit {
  private readonly flashKey = 'lumbre-alojamiento-guardado';

  alojamientos: Alojamiento[] = [];
  cargando = true;
  errorCarga = '';
  mensaje = '';
  error = '';
  guardando = false;

  tipos = ['Apartamento', 'Casa', 'Finca', 'Cabaña', 'Habitación', 'Hostal', 'Hotel'];
  form = this.formularioVacio();
  serviciosTexto = 'Wi-Fi, Cocina';
  reglasTexto = 'No fumar';
  imagenesTexto = '';

  constructor(private service: AlojamientoService) {}

  ngOnInit(): void {
    this.mostrarMensajePendiente();
    this.service.obtenerAlojamientosActivos().subscribe({
      next: a => { this.alojamientos = a; this.cargando = false; },
      error: () => { this.errorCarga = 'No se pudieron cargar los alojamientos.'; this.cargando = false; }
    });
  }

  irAAlojamientos(): void {
    document.getElementById('alojamientos')?.scrollIntoView({ behavior: 'smooth' });
  }

  precio(v: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v);
  }

  abrirFormulario(): void { this.error = ''; }

  guardar(): void {
    this.error = '';
    this.mensaje = '';
    const f = this.form;

    if (![f.nombre, f.descripcion, f.ciudad, f.ubicacion, f.imagenPrincipal].every(t => (t ?? '').toString().trim())) {
      this.error = 'Completa el nombre, la descripción, la ciudad, la ubicación y la imagen principal.';
      return;
    }
    if (!this.esUrl(f.imagenPrincipal.trim())) {
      this.error = 'La imagen principal debe ser una URL válida que empiece por http:// o https://.';
      return;
    }
    const enteros = [f.capacidad, f.habitaciones, f.camas, f.banos].map(Number);
    if (!enteros.every(Number.isInteger) || enteros[0] < 1 || enteros[1] < 0 || enteros[2] < 1 || enteros[3] < 1) {
      this.error = 'Capacidad, camas y baños deben ser enteros mayores que cero; las habitaciones no pueden ser negativas.';
      return;
    }
    if (!(Number(f.precioNoche) > 0) || !(Number(f.tarifaLimpieza) >= 0)) {
      this.error = 'El precio por noche debe ser mayor que cero y la tarifa de limpieza no puede ser negativa.';
      return;
    }

    const principal = f.imagenPrincipal.trim();
    const nuevo: Omit<Alojamiento, 'id'> = {
      nombre: f.nombre.trim(), descripcion: f.descripcion.trim(), ciudad: f.ciudad.trim(),
      ubicacion: f.ubicacion.trim(), tipo: f.tipo,
      capacidad: enteros[0], habitaciones: enteros[1], camas: enteros[2], banos: enteros[3],
      precioNoche: Number(f.precioNoche), tarifaLimpieza: Number(f.tarifaLimpieza),
      calificacion: 0, activo: true, imagenPrincipal: principal,
      imagenes: [...new Set([principal, ...this.lista(this.imagenesTexto).filter(u => this.esUrl(u))])],
      servicios: [...new Set(this.lista(this.serviciosTexto))],
      reglas: [...new Set(this.lista(this.reglasTexto))]
    };

    this.guardando = true;
    this.service.crear(nuevo).subscribe({
      next: creado => {
        this.guardando = false;
        this.alojamientos = [...this.alojamientos, creado];
        this.mensaje = `«${creado.nombre}» se guardó en marketplace-data.json.`;
        this.recordarMensaje(this.mensaje);
        this.reiniciarFormulario();
        this.cerrarModal();
      },
      error: (e: HttpErrorResponse) => {
        this.guardando = false;
        this.error = e.error?.error ||
          'No se pudo guardar. Comprueba que el servidor esté activo (npm run dev o npm run api).';
      }
    });
  }

  private formularioVacio() {
    return {
      nombre: '', descripcion: '', ciudad: '', ubicacion: '', tipo: 'Apartamento',
      capacidad: 2, habitaciones: 1, camas: 1, banos: 1, precioNoche: 150000,
      tarifaLimpieza: 0, imagenPrincipal: ''
    };
  }

  private reiniciarFormulario(): void {
    this.form = this.formularioVacio();
    this.serviciosTexto = 'Wi-Fi, Cocina';
    this.reglasTexto = 'No fumar';
    this.imagenesTexto = '';
  }

  private cerrarModal(): void {
    const el = document.getElementById('modalAlojamiento');
    const bootstrap = (window as unknown as { bootstrap?: { Modal: { getInstance(e: Element | null): { hide(): void } | null } } }).bootstrap;
    bootstrap?.Modal.getInstance(el)?.hide();
  }

  // El servidor de desarrollo recarga la página cuando cambia el JSON; el aviso sobrevive a esa recarga.
  private recordarMensaje(m: string): void {
    try { sessionStorage.setItem(this.flashKey, m); } catch { /* el aviso es opcional */ }
  }

  private mostrarMensajePendiente(): void {
    try {
      const m = sessionStorage.getItem(this.flashKey);
      if (m) { this.mensaje = m; sessionStorage.removeItem(this.flashKey); }
    } catch { /* el aviso es opcional */ }
  }

  private lista(texto: string): string[] {
    return texto.split(',').map(x => x.trim()).filter(Boolean);
  }

  private esUrl(valor: string): boolean {
    try { const u = new URL(valor); return u.protocol === 'http:' || u.protocol === 'https:'; } catch { return false; }
  }
}
