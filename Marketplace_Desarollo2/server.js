/**
 * API mínima (solo módulos de Node, sin dependencias) para guardar nuevos
 * alojamientos en src/assets/data/marketplace-data.json.
 *
 *   POST /api/alojamientos   agrega un alojamiento y responde 201 con el registro creado
 *   GET  /api/health         comprobación de que el servidor está activo
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.API_PORT) || 3000;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'src', 'assets', 'data', 'marketplace-data.json');
const MAX_BODY = 1024 * 1024;

function leerDatos() {
  const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '{}');
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    throw new Error('El archivo JSON debe contener un objeto con las listas "alojamientos" y "resenas".');
  }
  if (!Array.isArray(datos.alojamientos)) datos.alojamientos = [];
  if (!Array.isArray(datos.resenas)) datos.resenas = [];
  return datos;
}

function guardarDatos(datos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2) + '\n', 'utf8');
}

const texto = v => typeof v === 'string' && v.trim().length > 0;
const entero = v => Number.isInteger(Number(v)) && String(v).trim() !== '';
const urlValida = v => {
  try { const u = new URL(v); return u.protocol === 'http:' || u.protocol === 'https:'; } catch { return false; }
};
const lista = v => (Array.isArray(v) ? v : []).filter(texto).map(x => x.trim());

/** Devuelve { error } o { item } (sin id). */
function validar(b) {
  for (const campo of ['nombre', 'descripcion', 'ciudad', 'ubicacion', 'tipo', 'imagenPrincipal']) {
    if (!texto(b[campo])) return { error: `El campo «${campo}» es obligatorio.` };
  }
  if (!urlValida(b.imagenPrincipal.trim())) return { error: 'La imagen principal debe ser una URL http o https válida.' };
  if (!entero(b.capacidad) || Number(b.capacidad) < 1 || !entero(b.habitaciones) || Number(b.habitaciones) < 0 ||
      !entero(b.camas) || Number(b.camas) < 1 || !entero(b.banos) || Number(b.banos) < 1) {
    return { error: 'Capacidad, habitaciones, camas y baños deben ser números enteros válidos.' };
  }
  const precioNoche = Number(b.precioNoche);
  const tarifaLimpieza = Number(b.tarifaLimpieza ?? 0);
  if (!Number.isFinite(precioNoche) || precioNoche <= 0) return { error: 'El precio por noche debe ser mayor que cero.' };
  if (!Number.isFinite(tarifaLimpieza) || tarifaLimpieza < 0) return { error: 'La tarifa de limpieza no puede ser negativa.' };

  const principal = b.imagenPrincipal.trim();
  const extra = lista(b.imagenes).filter(urlValida);
  return {
    item: {
      nombre: b.nombre.trim(), descripcion: b.descripcion.trim(), ciudad: b.ciudad.trim(),
      ubicacion: b.ubicacion.trim(), tipo: b.tipo.trim(),
      capacidad: Number(b.capacidad), habitaciones: Number(b.habitaciones),
      camas: Number(b.camas), banos: Number(b.banos),
      precioNoche, tarifaLimpieza, calificacion: 0, activo: true,
      imagenPrincipal: principal,
      imagenes: [...new Set([principal, ...extra])],
      servicios: [...new Set(lista(b.servicios))],
      reglas: [...new Set(lista(b.reglas))]
    }
  };
}

function responder(res, status, cuerpo) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(cuerpo));
}

function leerCuerpo(req) {
  return new Promise((resolve, reject) => {
    let total = 0; const partes = [];
    req.on('data', c => {
      total += c.length;
      if (total > MAX_BODY) { reject(Object.assign(new Error('Cuerpo demasiado grande.'), { status: 413 })); req.destroy(); }
      else partes.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(partes).toString('utf8')));
    req.on('error', reject);
  });
}

const servidor = http.createServer(async (req, res) => {
  const ruta = (req.url || '').split('?')[0];
  try {
    if (req.method === 'GET' && ruta === '/api/health') return responder(res, 200, { ok: true, servicio: 'lumbre-alojamientos' });

    if (req.method === 'POST' && ruta === '/api/alojamientos') {
      let cuerpo;
      try { cuerpo = JSON.parse(await leerCuerpo(req) || '{}'); }
      catch (e) { return responder(res, e.status || 400, { error: e.status ? e.message : 'El cuerpo de la petición no es un JSON válido.' }); }
      if (!cuerpo || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) return responder(res, 400, { error: 'Datos de alojamiento no válidos.' });

      const { error, item } = validar(cuerpo);
      if (error) return responder(res, 400, { error });

      const datos = leerDatos();
      const id = datos.alojamientos.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0) + 1;
      const nuevo = { id, ...item };
      datos.alojamientos.push(nuevo);
      guardarDatos(datos);
      return responder(res, 201, nuevo);
    }

    responder(res, 404, { error: 'Ruta no encontrada.' });
  } catch (e) {
    console.error('Error en la API:', e);
    responder(res, 500, { error: 'No se pudo guardar el alojamiento. Revisa que marketplace-data.json sea un JSON válido y que tenga permisos de escritura.' });
  }
});

if (require.main === module) {
  servidor.listen(PORT, () => console.log(`API de alojamientos disponible en http://localhost:${PORT} (datos: ${DATA_FILE})`));
}
module.exports = { servidor, validar };
