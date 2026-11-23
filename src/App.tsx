import Header from './components/Header';
import RiskLegend from './components/RiskLegend';
import SocavacionesMap from './features/map/SocavacionesMap';
import styles from './App.module.css';

export default function App() {
  return (
    <>
      <Header />
      <main className={styles.contenido}>
        <div className={styles.introduccion}>
          <p className={styles.territorio}>Medellín y el Área Metropolitana</p>
          <h1>Mapa de socavaciones</h1>
        </div>

        <aside className={styles.aviso} aria-label="Aviso de demostración">
          <span className={styles.info} aria-hidden="true">i</span>
          <p><strong>Datos simulados para demostración.</strong> No representan reportes reales de riesgo.</p>
        </aside>

        <div className={styles.panel}>
          <SocavacionesMap />
          <RiskLegend />
        </div>
      </main>
    </>
  );
}
