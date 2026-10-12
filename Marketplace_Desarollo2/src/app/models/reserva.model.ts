export interface Reserva {
  id: string; alojamientoId: number; alojamientoNombre: string; alojamientoImagen: string;
  ciudad: string; fechaLlegada: string; fechaSalida: string; huespedes: number; noches: number;
  subtotal: number; tarifaLimpieza: number; tarifaServicio: number; total: number;
  nombreHuesped: string; correoHuesped: string; estado: 'CONFIRMADA';
}