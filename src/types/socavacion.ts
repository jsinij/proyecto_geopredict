export type NivelRiesgo = 'leve' | 'peligroso' | 'alto';

export interface Socavacion {
  id: string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  nivelRiesgo: NivelRiesgo;
  descripcion: string;
}

export const nivelesRiesgo = {
  leve: { etiqueta: 'Leve', color: 'var(--risk-low)', simbolo: '●' },
  peligroso: { etiqueta: 'Peligroso', color: 'var(--risk-danger)', simbolo: '▲' },
  alto: { etiqueta: 'Alto', color: 'var(--risk-high)', simbolo: '◆' },
} as const satisfies Record<NivelRiesgo, { etiqueta: string; color: string; simbolo: string }>;
