import type { Socavacion } from '../types/socavacion';

export const socavacionesMock: readonly Socavacion[] = [
  {
    id: 'demo-bello',
    ubicacion: 'Niquía, Bello',
    latitud: 6.3324,
    longitud: -75.5416,
    nivelRiesgo: 'leve',
    descripcion: 'Escenario simulado de una cavidad bajo una vía secundaria.',
  },
  {
    id: 'demo-moravia',
    ubicacion: 'Moravia, Medellín',
    latitud: 6.2773,
    longitud: -75.5668,
    nivelRiesgo: 'peligroso',
    descripcion: 'Escenario simulado de pérdida de soporte bajo un tramo urbano.',
  },
  {
    id: 'demo-regional',
    ubicacion: 'Avenida Regional, Medellín',
    latitud: 6.2574,
    longitud: -75.5796,
    nivelRiesgo: 'alto',
    descripcion: 'Escenario simulado de una cavidad bajo la calzada en el corredor de estudio.',
  },
  {
    id: 'demo-laureles',
    ubicacion: 'Laureles, Medellín',
    latitud: 6.245,
    longitud: -75.601,
    nivelRiesgo: 'leve',
    descripcion: 'Escenario simulado de un vacío localizado bajo el pavimento.',
  },
  {
    id: 'demo-envigado',
    ubicacion: 'Zona centro, Envigado',
    latitud: 6.1714,
    longitud: -75.5857,
    nivelRiesgo: 'peligroso',
    descripcion: 'Escenario simulado de erosión del terreno bajo una vía local.',
  },
  {
    id: 'demo-itagui',
    ubicacion: 'Zona industrial, Itagüí',
    latitud: 6.1867,
    longitud: -75.616,
    nivelRiesgo: 'alto',
    descripcion: 'Escenario simulado de pérdida de material bajo una calzada.',
  },
];
