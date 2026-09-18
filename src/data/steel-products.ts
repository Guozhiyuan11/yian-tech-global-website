import type { MediaSlotId } from './media-manifest';
import type { Locale } from '../i18n/content';

export type BusinessGroup =
  | 'Stainless Steel'
  | 'Rail & Construction Steel'
  | 'Engineered Fabrication'
  | 'Processing & Supply';

export interface SteelProduct {
  id: string;
  index: string;
  businessGroup: BusinessGroup;
  businessGroupEs: string;
  subcategory: string;
  subcategoryEs: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  assetType: 'product' | 'capability';
  materialProcess: string;
  confidence: 'high' | 'medium';
  mediaSlot: MediaSlotId;
  featured: boolean;
  heroEligible: boolean;
}

export const steelProducts: SteelProduct[] = [
  {
    id: 'stainless-tube-pipe',
    index: '01',
    businessGroup: 'Stainless Steel',
    businessGroupEs: 'Acero inoxidable',
    subcategory: 'Tube & pipe',
    subcategoryEs: 'Tubos',
    title: 'Stainless tube & pipe',
    titleEs: 'Tubos de acero inoxidable',
    description: 'Round, square, rectangular and special-section stainless tube ranges, organised for specification review.',
    descriptionEs: 'Tubos inoxidables redondos, cuadrados, rectangulares y especiales, organizados para la revisión de especificaciones.',
    assetType: 'product',
    materialProcess: 'Formed and welded tube products',
    confidence: 'high',
    mediaSlot: 'featured_stainless_tube',
    featured: true,
    heroEligible: true,
  },
  {
    id: 'coil-strip',
    index: '02',
    businessGroup: 'Stainless Steel',
    businessGroupEs: 'Acero inoxidable',
    subcategory: 'Flat products',
    subcategoryEs: 'Productos planos',
    title: 'Coil & strip',
    titleEs: 'Bobina y fleje',
    description: 'Stainless coil and strip supported by stock, workshop and downstream processing imagery from the supplied portfolio.',
    descriptionEs: 'Bobina y fleje inoxidable respaldados por imágenes de inventario, taller y procesamiento del portafolio suministrado.',
    assetType: 'product',
    materialProcess: 'Coil and strip processing',
    confidence: 'high',
    mediaSlot: 'featured_coil_strip',
    featured: true,
    heroEligible: true,
  },
  {
    id: 'railway-rail',
    index: '03',
    businessGroup: 'Rail & Construction Steel',
    businessGroupEs: 'Rieles y acero para construcción',
    subcategory: 'Rail',
    subcategoryEs: 'Ferrocarril',
    title: 'Railway rail',
    titleEs: 'Riel ferroviario',
    description: 'Rail products, long-length storage and supply context presented for standards, grade and project confirmation.',
    descriptionEs: 'Rieles, almacenamiento de gran longitud y contexto de suministro para confirmar norma, grado y proyecto.',
    assetType: 'product',
    materialProcess: 'Long steel products',
    confidence: 'high',
    mediaSlot: 'featured_rail',
    featured: true,
    heroEligible: true,
  },
  {
    id: 'profiles-construction',
    index: '04',
    businessGroup: 'Rail & Construction Steel',
    businessGroupEs: 'Rieles y acero para construcción',
    subcategory: 'Reinforcement steel',
    subcategoryEs: 'Acero de refuerzo',
    title: 'Construction steel & rebar',
    titleEs: 'Acero para construcción y armaduras',
    description: 'Straight, coiled and bent reinforcement products matched to confirmed grade, standard and processing scope.',
    descriptionEs: 'Armaduras rectas, en rollo y dobladas según grado, norma y alcance de procesamiento confirmados.',
    assetType: 'product',
    materialProcess: 'Section and reinforcement products',
    confidence: 'high',
    mediaSlot: 'featured_profiles',
    featured: true,
    heroEligible: false,
  },
  {
    id: 'engineered-fabrication',
    index: '05',
    businessGroup: 'Engineered Fabrication',
    businessGroupEs: 'Fabricación a medida',
    subcategory: 'Custom components',
    subcategoryEs: 'Componentes personalizados',
    title: 'Engineered fabrication',
    titleEs: 'Fabricación de ingeniería',
    description: 'Formed, rolled and welded assemblies for custom requirements, with final use confirmed against project drawings.',
    descriptionEs: 'Conjuntos conformados, cilindrados y soldados para requisitos a medida, con uso final confirmado mediante planos.',
    assetType: 'capability',
    materialProcess: 'Forming, welding and fabrication',
    confidence: 'medium',
    mediaSlot: 'featured_fabrication',
    featured: true,
    heroEligible: true,
  },
];

export function getFeaturedProducts(locale: Locale) {
  return steelProducts.map((product) => ({
    ...product,
    businessGroupLabel: locale === 'es' ? product.businessGroupEs : product.businessGroup,
    subcategoryLabel: locale === 'es' ? product.subcategoryEs : product.subcategory,
    titleLabel: locale === 'es' ? product.titleEs : product.title,
    descriptionLabel: locale === 'es' ? product.descriptionEs : product.description,
  }));
}

export const businessGroups = [
  {
    number: '01',
    title: 'Stainless Steel',
    description: 'Tube, pipe, coil and strip organised around the buyer’s specification path.',
  },
  {
    number: '02',
    title: 'Rail & Construction Steel',
    description: 'Rail and structural products for infrastructure and construction requirements.',
  },
  {
    number: '03',
    title: 'Engineered Fabrication',
    description: 'Formed and welded components described without overstating unverified end use.',
  },
  {
    number: '04',
    title: 'Processing & Supply',
    description: 'Technical confirmation, processing coordination, inspection and project delivery support.',
  },
] as const;
