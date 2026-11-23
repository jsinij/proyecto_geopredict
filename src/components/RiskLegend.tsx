import { nivelesRiesgo } from '../types/socavacion';
import styles from './RiskLegend.module.css';

export default function RiskLegend() {
  return (
    <aside className={styles.leyenda} aria-labelledby="titulo-leyenda">
      <h2 id="titulo-leyenda">Niveles de riesgo</h2>
      <ul>
        {Object.entries(nivelesRiesgo).map(([nivel, riesgo]) => (
          <li key={nivel}>
            <span className={styles.simbolo} style={{ backgroundColor: riesgo.color }} aria-hidden="true">
              {riesgo.simbolo}
            </span>
            {riesgo.etiqueta}
          </li>
        ))}
      </ul>
      <p>Selecciona un marcador para ver el escenario simulado.</p>
    </aside>
  );
}
