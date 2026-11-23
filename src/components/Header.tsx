import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.barra}>
      <div className={styles.contenido}>
        <span className={styles.marca} aria-hidden="true"><span /></span>
        <span className={styles.nombre}>GEOPREDICT</span>
      </div>
    </header>
  );
}
