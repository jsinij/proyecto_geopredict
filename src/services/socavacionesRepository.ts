import { socavacionesMock } from '../data/socavaciones.mock';
import { nivelesRiesgo, type Socavacion } from '../types/socavacion';

export async function getSocavaciones(): Promise<readonly Socavacion[]> {
  const ids = new Set<string>();

  // Omitir registros inválidos permite mostrar el mapa y los demás puntos.
  return socavacionesMock.filter((punto) => {
    if (
      !punto ||
      typeof punto.id !== 'string' || !punto.id.trim() || ids.has(punto.id) ||
      typeof punto.ubicacion !== 'string' || !punto.ubicacion.trim() ||
      typeof punto.descripcion !== 'string' || !punto.descripcion.trim() ||
      !Object.hasOwn(nivelesRiesgo, punto.nivelRiesgo) ||
      !Number.isFinite(punto.latitud) || Math.abs(punto.latitud) > 90 ||
      !Number.isFinite(punto.longitud) || Math.abs(punto.longitud) > 180
    ) {
      return false;
    }

    ids.add(punto.id);
    return true;
  });
}
