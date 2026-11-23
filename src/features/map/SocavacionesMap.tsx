import { useEffect, useState } from 'react';
import type { LatLngTuple, LeafletEventHandlerFnMap } from 'leaflet';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { getSocavaciones } from '../../services/socavacionesRepository';
import type { Socavacion } from '../../types/socavacion';
import SocavacionMarker from './SocavacionMarker';
import styles from './SocavacionesMap.module.css';

const centro: LatLngTuple = [6.2442, -75.5812];
const mapaBase = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  maxZoom: 19,
};

export default function SocavacionesMap() {
  const [puntos, setPuntos] = useState<readonly Socavacion[]>([]);
  const [estadoDatos, setEstadoDatos] = useState<'cargando' | 'listo' | 'error'>('cargando');
  const [errorTeselas, setErrorTeselas] = useState(false);

  useEffect(() => {
    let activo = true;

    getSocavaciones().then(
      (registros) => {
        if (activo) {
          setPuntos(registros);
          setEstadoDatos('listo');
        }
      },
      () => {
        if (activo) setEstadoDatos('error');
      },
    );

    return () => {
      activo = false;
    };
  }, []);

  const eventosTeselas: LeafletEventHandlerFnMap = {
    loading: () => setErrorTeselas(false),
    tileerror: () => setErrorTeselas(true),
  };

  return (
    <section className={styles.region} aria-label="Mapa interactivo de Medellín y el Área Metropolitana">
      <MapContainer
        center={centro}
        zoom={11.5}
        zoomSnap={0.5}
        className={styles.mapa}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer {...mapaBase} eventHandlers={eventosTeselas} />
        <ZoomControl position="topleft" zoomInTitle="Acercar" zoomOutTitle="Alejar" />
        {puntos.map((punto) => <SocavacionMarker key={punto.id} punto={punto} />)}
      </MapContainer>
      <div className={styles.estado} role="status">
        {errorTeselas && <p>El mapa base podría no estar disponible.</p>}
        {estadoDatos === 'cargando' && <p>Cargando ubicaciones de demostración…</p>}
        {estadoDatos === 'error' && <p>No se pudieron cargar las ubicaciones de demostración.</p>}
        {estadoDatos === 'listo' && puntos.length === 0 && (
          <p>No hay ubicaciones de demostración para mostrar.</p>
        )}
      </div>
    </section>
  );
}
