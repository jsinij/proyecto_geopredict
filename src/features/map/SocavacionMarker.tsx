import { divIcon, type PopupEvent } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { nivelesRiesgo, type Socavacion } from '../../types/socavacion';
import styles from './SocavacionesMap.module.css';

const iconos = {
  leve: crearIcono(nivelesRiesgo.leve),
  peligroso: crearIcono(nivelesRiesgo.peligroso),
  alto: crearIcono(nivelesRiesgo.alto),
};

const eventosMarcador = {
  popupopen: ({ popup }: PopupEvent) => {
    popup.getElement()?.querySelector('.leaflet-popup-close-button')
      ?.setAttribute('aria-label', 'Cerrar ventana de información');
  },
};

function crearIcono({ color, simbolo }: (typeof nivelesRiesgo)[keyof typeof nivelesRiesgo]) {
  const pin = document.createElement('span');
  pin.style.backgroundColor = color;
  pin.setAttribute('aria-hidden', 'true');
  pin.textContent = simbolo;

  return divIcon({
    className: styles.marcador,
    // Leaflet reutiliza la configuración del icono; la cadena permite un nodo por marcador.
    html: pin.outerHTML,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -15],
  });
}

export default function SocavacionMarker({ punto }: { punto: Socavacion }) {
  const riesgo = nivelesRiesgo[punto.nivelRiesgo];

  return (
    <Marker
      position={[punto.latitud, punto.longitud]}
      icon={iconos[punto.nivelRiesgo]}
      eventHandlers={eventosMarcador}
      title={`${punto.ubicacion}. Nivel de riesgo: ${riesgo.etiqueta}. Escenario simulado.`}
    >
      <Popup maxWidth={210} minWidth={155} autoPanPadding={[16, 16]}>
        <div className={styles.popup}>
          <h3>{punto.ubicacion}</h3>
          <p><span>Nivel de riesgo </span><strong style={{ color: riesgo.color }}>{riesgo.etiqueta}</strong></p>
          <p>{punto.descripcion}</p>
        </div>
      </Popup>
    </Marker>
  );
}
