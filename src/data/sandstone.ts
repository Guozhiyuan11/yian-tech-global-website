import media from './sandstone-media.json';
import { site } from './site';
import type { Locale } from '../i18n/content';

export interface SandstoneImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
}

export interface SandstoneColour {
  id: string;
  name: Record<Locale, string>;
  images: SandstoneImage[];
}

export const sandstoneHero: SandstoneImage = media.hero;
export const sandstoneColours: SandstoneColour[] = media.colours;
export const sandstoneWork = media.work;

export const sandstoneBrief = (locale: Locale, colour = '') => locale === 'es'
  ? `Hola YIAN Tech Global:\r\n\r\nQuisiera consultar un pedido de arenisca a medida.\r\n\r\nColor / referencia: ${colour}\r\nDimensiones / espesor:\r\nPlanos / requisitos de forma o superficie:\r\nUso previsto:\r\nCantidad / unidad:\r\nDestino:\r\nPlazo deseado:\r\n\r\nNombre / empresa:\r\nCorreo de respuesta:`
  : `Hello YIAN Tech Global,\r\n\r\nI would like to discuss a custom sandstone order.\r\n\r\nColour / reference: ${colour}\r\nDimensions / thickness:\r\nDrawings / shape or surface requirements:\r\nIntended application:\r\nQuantity / unit:\r\nDestination:\r\nPreferred timing:\r\n\r\nName / company:\r\nReply email:`;

export const sandstoneEnquiry = (locale: Locale, colour = '') => {
  const subject = `${locale === 'es' ? 'Consulta de arenisca a medida' : 'Custom sandstone enquiry'}${colour ? `: ${colour}` : ''}`;
  return `${site.salesMailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(sandstoneBrief(locale, colour))}`;
};
