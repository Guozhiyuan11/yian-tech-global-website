import sourceImages from './source-images.json';
import type { Locale } from '../i18n/content';

export type CategoryKey =
  | 'stainless-tube'
  | 'coil-strip'
  | 'rail'
  | 'construction'
  | 'profiles'
  | 'custom-fabrication'
  | 'tanks-containers'
  | 'metal-products'
  | 'sheet-metal'
  | 'fasteners';

type LocalizedText = Record<Locale, string>;

interface CatalogueCopy {
  name: LocalizedText;
  process: LocalizedText;
  detail: LocalizedText;
  category: CategoryKey;
  custom: boolean;
}

export const catalogCategories: Array<{ key: CategoryKey; label: LocalizedText }> = [
  { key: 'stainless-tube', label: { en: 'Stainless tube & pipe', es: 'Tubos de acero inoxidable' } },
  { key: 'coil-strip', label: { en: 'Coil, strip & sheet', es: 'Bobina, fleje y chapa' } },
  { key: 'rail', label: { en: 'Railway rail', es: 'Riel ferroviario' } },
  { key: 'construction', label: { en: 'Construction steel', es: 'Acero para construcción' } },
  { key: 'profiles', label: { en: 'Profiles & formed sections', es: 'Perfiles y secciones conformadas' } },
  { key: 'custom-fabrication', label: { en: 'Custom fabrication', es: 'Fabricación a medida' } },
  { key: 'tanks-containers', label: { en: 'Tanks & containers', es: 'Tanques y contenedores' } },
  { key: 'metal-products', label: { en: 'Finished metal products', es: 'Productos metálicos terminados' } },
  { key: 'sheet-metal', label: { en: 'Sheet-metal products', es: 'Productos de chapa' } },
  { key: 'fasteners', label: { en: 'Fasteners & brackets', es: 'Fijaciones y soportes' } },
];

const copyById: Record<number, CatalogueCopy> = {
  1: {
    category: 'custom-fabrication', custom: true,
    name: { en: 'Stainless reducers & formed components', es: 'Reducciones y componentes conformados inoxidables' },
    process: { en: 'Stainless steel · spinning · forming · welding', es: 'Acero inoxidable · repulsado · conformado · soldadura' },
    detail: { en: 'Conical, curved and reducing forms. Final application and acceptance criteria are confirmed from the drawing.', es: 'Formas cónicas, curvas y reductoras. La aplicación y los criterios de aceptación se confirman mediante plano.' },
  },
  2: {
    category: 'stainless-tube', custom: true,
    name: { en: 'Stainless tube range', es: 'Gama de tubos de acero inoxidable' },
    process: { en: 'Round · square · rectangular · special-section tube', es: 'Tubo redondo · cuadrado · rectangular · sección especial' },
    detail: { en: 'A multi-format tube route for enquiries defined by grade, section, wall thickness, finish and length.', es: 'Una ruta multiformato definida por grado, sección, espesor, acabado y longitud.' },
  },
  3: {
    category: 'coil-strip', custom: false,
    name: { en: 'Stainless steel coil', es: 'Bobina de acero inoxidable' },
    process: { en: 'Coil supply', es: 'Suministro de bobina' },
    detail: { en: 'Workshop and stock context for coil enquiries. Grade, finish, thickness, width and coil weight remain order-specific.', es: 'Contexto de taller e inventario. Grado, acabado, espesor, ancho y peso se confirman por pedido.' },
  },
  4: {
    category: 'stainless-tube', custom: true,
    name: { en: 'Stainless tube production line', es: 'Línea de producción de tubos inoxidables' },
    process: { en: 'Tube forming and production', es: 'Conformado y producción de tubos' },
    detail: { en: 'Production-capability reference used to discuss tube geometry, weld condition, finish and batch requirements.', es: 'Referencia de capacidad para tratar geometría, condición de soldadura, acabado y requisitos de lote.' },
  },
  5: {
    category: 'coil-strip', custom: true,
    name: { en: 'Stainless coil & strip', es: 'Bobina y fleje de acero inoxidable' },
    process: { en: 'Coil and strip processing', es: 'Procesamiento de bobina y fleje' },
    detail: { en: 'Coil and strip can be reviewed together with downstream width, finish and processing requirements.', es: 'La bobina y el fleje se revisan junto con requisitos posteriores de ancho, acabado y proceso.' },
  },
  6: {
    category: 'stainless-tube', custom: false,
    name: { en: 'Stainless round tube', es: 'Tubo redondo de acero inoxidable' },
    process: { en: 'Finished stainless tube', es: 'Tubo inoxidable terminado' },
    detail: { en: 'Finished round tube. Confirm grade, outside diameter, wall, length, surface and dimensional standard.', es: 'Tubo redondo terminado. Confirmar grado, diámetro exterior, espesor, longitud, superficie y norma dimensional.' },
  },
  7: {
    category: 'coil-strip', custom: true,
    name: { en: 'Sheet & strip processing', es: 'Procesamiento de chapa y fleje' },
    process: { en: 'Decoiling · sheet and strip processing', es: 'Desbobinado · procesamiento de chapa y fleje' },
    detail: { en: 'Process reference for decoiling and downstream flat-product work, subject to confirmed input material and tolerances.', es: 'Referencia de proceso para desbobinado y trabajo posterior, según material y tolerancias confirmados.' },
  },
  8: {
    category: 'stainless-tube', custom: false,
    name: { en: 'Finished stainless tube stock', es: 'Inventario de tubos inoxidables terminados' },
    process: { en: 'Batch tube storage', es: 'Almacenamiento de tubos por lote' },
    detail: { en: 'Supply-capability reference for finished tubes. Live size and quantity availability is confirmed at enquiry.', es: 'Referencia de suministro de tubos terminados. Medidas y cantidades disponibles se confirman al consultar.' },
  },
  9: {
    category: 'rail', custom: false,
    name: { en: '60N / 60-series railway rail', es: 'Riel ferroviario serie 60N / 60' },
    process: { en: 'Rail product and stock reference', es: 'Referencia de producto e inventario ferroviario' },
    detail: { en: 'Visible markings support initial identification; profile, standard, grade, length and inspection basis must be confirmed.', es: 'Las marcas visibles apoyan la identificación inicial; deben confirmarse perfil, norma, grado, longitud e inspección.' },
  },
  10: {
    category: 'rail', custom: false,
    name: { en: 'Railway rail inventory', es: 'Inventario de rieles ferroviarios' },
    process: { en: 'Rail storage and supply', es: 'Almacenamiento y suministro de rieles' },
    detail: { en: 'Rail supply context only. Current stock, origin and project compliance are verified per quotation.', es: 'Contexto de suministro. Inventario, origen y cumplimiento del proyecto se verifican en cada cotización.' },
  },
  11: {
    category: 'rail', custom: false,
    name: { en: 'Long-length rail storage', es: 'Almacenamiento de rieles largos' },
    process: { en: 'Rail yard · gantry handling', es: 'Patio de rieles · manipulación con pórtico' },
    detail: { en: 'Storage and handling reference for long products; packing and shipment method are matched to destination.', es: 'Referencia de almacenamiento y manipulación; embalaje y envío se adaptan al destino.' },
  },
  12: {
    category: 'rail', custom: false,
    name: { en: 'Finished railway rail', es: 'Riel ferroviario terminado' },
    process: { en: 'Rail long product', es: 'Producto largo ferroviario' },
    detail: { en: 'Clear product-form reference for rail enquiries requiring profile, mass per metre, grade, length and testing.', es: 'Referencia clara para consultas que requieren perfil, masa por metro, grado, longitud y ensayos.' },
  },
  13: {
    category: 'metal-products', custom: true,
    name: { en: 'Stainless steel stool', es: 'Taburete de acero inoxidable' },
    process: { en: 'Welded stainless finished product', es: 'Producto inoxidable soldado' },
    detail: { en: 'Example of a finished stainless product that can be reviewed for dimensions, finish and packaging.', es: 'Ejemplo de producto terminado revisable por dimensiones, acabado y embalaje.' },
  },
  14: {
    category: 'metal-products', custom: true,
    name: { en: 'Batch stainless steel stools', es: 'Lote de taburetes inoxidables' },
    process: { en: 'Batch welding and finished-product supply', es: 'Soldadura por lote y suministro de producto terminado' },
    detail: { en: 'Batch-production and supply reference for repeatable welded stainless products.', es: 'Referencia de producción por lotes para productos inoxidables soldados repetitivos.' },
  },
  15: {
    category: 'custom-fabrication', custom: true,
    name: { en: 'Large welded cylinder / pipe section', es: 'Cilindro soldado / virola de tubería de gran diámetro' },
    process: { en: 'Plate rolling and welding', es: 'Cilindrado de chapa y soldadura' },
    detail: { en: 'Large rolled-and-welded component. Material and end use cannot be confirmed from the photograph alone.', es: 'Componente cilindrado y soldado. El material y uso final no se confirman solo por la fotografía.' },
  },
  16: {
    category: 'tanks-containers', custom: true,
    name: { en: 'Cylindrical tank / material container', es: 'Tanque cilíndrico / contenedor de material' },
    process: { en: 'Cylinder forming · reinforcing rings', es: 'Conformado cilíndrico · anillos de refuerzo' },
    detail: { en: 'Formed-container reference. Medium, pressure duty and applicable design code require project confirmation.', es: 'Referencia de contenedor conformado. Medio, presión y código de diseño requieren confirmación.' },
  },
  17: {
    category: 'profiles', custom: true,
    name: { en: 'Cold-formed special section', es: 'Perfil especial conformado en frío' },
    process: { en: 'Sheet cold forming', es: 'Conformado en frío de chapa' },
    detail: { en: 'Channel-like special section suitable for a drawing-led review of geometry, thickness and tolerances.', es: 'Sección especial tipo canal para revisar geometría, espesor y tolerancias mediante plano.' },
  },
  18: {
    category: 'coil-strip', custom: false,
    name: { en: 'Stainless coil & strip stock', es: 'Inventario de bobina y fleje inoxidable' },
    process: { en: 'Coil inventory', es: 'Inventario de bobinas' },
    detail: { en: 'Additional coil-supply reference. Live grade, finish and size availability is confirmed before offer.', es: 'Referencia adicional de suministro. Grado, acabado y medida se confirman antes de ofertar.' },
  },
  19: {
    category: 'sheet-metal', custom: true,
    name: { en: 'Box-form sheet-metal component', es: 'Componente de chapa tipo caja' },
    process: { en: 'Cutting · bending · assembly', es: 'Corte · plegado · montaje' },
    detail: { en: 'Finished formed component; function, branding requirements and acceptance details must come from the order.', es: 'Componente conformado terminado; función, marca y aceptación deben definirse en el pedido.' },
  },
  20: {
    category: 'profiles', custom: true,
    name: { en: 'Large rectangular tube / welded box section', es: 'Tubo rectangular grande / sección cajón soldada' },
    process: { en: 'Rectangular hollow or fabricated box construction', es: 'Sección hueca rectangular o cajón fabricado' },
    detail: { en: 'The photograph supports either a large hollow section or a custom welded box; final definition follows the drawing.', es: 'La imagen puede corresponder a una sección hueca o cajón soldado; la definición final depende del plano.' },
  },
  21: {
    category: 'profiles', custom: true,
    name: { en: 'Bulk loading of rectangular components', es: 'Carga por lote de componentes rectangulares' },
    process: { en: 'Batch loading and delivery preparation', es: 'Carga por lote y preparación de entrega' },
    detail: { en: 'Delivery-capability reference connected to large rectangular components; load plan and securing are project-specific.', es: 'Referencia de entrega de componentes rectangulares; plan de carga y sujeción son específicos del proyecto.' },
  },
  22: {
    category: 'custom-fabrication', custom: true,
    name: { en: 'Curved perforated plate / segmented flange', es: 'Placa curva perforada / segmento de brida' },
    process: { en: 'Cutting · drilling · bending', es: 'Corte · perforado · curvado' },
    detail: { en: 'Custom machined and formed part. Hole pattern, radius, material and end use require a controlled drawing.', es: 'Pieza mecanizada y conformada. Patrón, radio, material y uso requieren plano controlado.' },
  },
  23: {
    category: 'metal-products', custom: true,
    name: { en: 'Metal railing / decorative guard', es: 'Barandilla metálica / protección decorativa' },
    process: { en: 'Square-tube welding', es: 'Soldadura de tubo cuadrado' },
    detail: { en: 'Geometric railing example for dimensions, finish, connection detail and local-code review.', es: 'Ejemplo de barandilla para revisar dimensiones, acabado, uniones y normativa local.' },
  },
  24: {
    category: 'metal-products', custom: true,
    name: { en: 'Framed mesh panel', es: 'Panel de malla con marco' },
    process: { en: 'Welded frame and wire mesh', es: 'Marco soldado y malla metálica' },
    detail: { en: 'May serve fencing, separation or enclosure uses; final application and finish are confirmed per order.', es: 'Puede servir para cercado, separación o cerramiento; uso y acabado se confirman por pedido.' },
  },
  25: {
    category: 'tanks-containers', custom: true,
    name: { en: 'Large steel hopper / cone-bottom tank', es: 'Tolva de acero / tanque de fondo cónico' },
    process: { en: 'Large plate rolling and welding', es: 'Cilindrado y soldadura de chapa de gran formato' },
    detail: { en: 'Large fabricated container. It is not presented as a pressure vessel without verified design and certification.', es: 'Contenedor fabricado de gran tamaño. No se presenta como recipiente a presión sin diseño y certificación verificados.' },
  },
  26: {
    category: 'custom-fabrication', custom: true,
    name: { en: 'Large-diameter fabricated elbow', es: 'Codo fabricado de gran diámetro' },
    process: { en: 'Segmented plate rolling and welding', es: 'Cilindrado segmentado y soldadura' },
    detail: { en: 'Demonstrates large-form rolling and welding; radius, wall, material and weld acceptance follow the drawing.', es: 'Demuestra cilindrado y soldadura de gran formato; radio, espesor, material y aceptación siguen el plano.' },
  },
  27: {
    category: 'sheet-metal', custom: true,
    name: { en: 'Metal tray / shallow bent component', es: 'Bandeja metálica / pieza plegada poco profunda' },
    process: { en: 'Sheet bending', es: 'Plegado de chapa' },
    detail: { en: 'Repeatable bent sheet-metal form; exact use, gauge, corner detail and finish require confirmation.', es: 'Forma repetible de chapa plegada; uso, espesor, esquinas y acabado requieren confirmación.' },
  },
  28: {
    category: 'custom-fabrication', custom: true,
    name: { en: 'Welded bend & flanged pipe assembly', es: 'Conjunto de tubería curvada y bridada soldada' },
    process: { en: 'Pipe · elbow · flange welding', es: 'Soldadura de tubo · codo · brida' },
    detail: { en: 'Custom industrial pipe assembly reviewed against drawing, material, flange specification and weld requirements.', es: 'Conjunto industrial revisado según plano, material, especificación de brida y requisitos de soldadura.' },
  },
  29: {
    category: 'fasteners', custom: true,
    name: { en: 'Double-ended threaded rod / tie rod', es: 'Varilla roscada doble / tirante' },
    process: { en: 'End threading of bar products', es: 'Roscado de extremos de barras' },
    detail: { en: 'Final designation depends on use. Confirm steel grade, diameter, thread, length, coating and mechanical requirements.', es: 'La designación depende del uso. Confirmar grado, diámetro, rosca, longitud, recubrimiento y requisitos mecánicos.' },
  },
  30: {
    category: 'fasteners', custom: true,
    name: { en: 'Punched angle bracket / custom connector', es: 'Escuadra perforada / conector a medida' },
    process: { en: 'Cutting · punching · bending', es: 'Corte · punzonado · plegado' },
    detail: { en: 'Batch custom connector suitable for drawing-controlled hole pattern, angle, material and finish.', es: 'Conector por lote para controlar por plano patrón de agujeros, ángulo, material y acabado.' },
  },
  31: {
    category: 'construction', custom: true,
    name: { en: 'Deformed rebar & processing feedstock', es: 'Barra corrugada y material para procesamiento' },
    process: { en: 'Straight rebar and bent components', es: 'Barra recta y componentes doblados' },
    detail: { en: 'Construction-steel supply and processing reference; grade, diameter, standard and bending schedule are confirmed.', es: 'Referencia de suministro y proceso; se confirman grado, diámetro, norma y programa de doblado.' },
  },
  32: {
    category: 'stainless-tube', custom: true,
    name: { en: 'Brushed stainless square tube', es: 'Tubo cuadrado inoxidable cepillado' },
    process: { en: 'Brushed surface finish', es: 'Acabado superficial cepillado' },
    detail: { en: 'Detail reference for brushed square tube. Specify section, wall, grain direction, finish sample and protection.', es: 'Referencia de tubo cuadrado cepillado. Especificar sección, espesor, dirección, muestra y protección.' },
  },
  33: {
    category: 'stainless-tube', custom: true,
    name: { en: 'Satin-finished stainless round tube', es: 'Tubo redondo inoxidable satinado' },
    process: { en: 'Satin / sanded surface treatment', es: 'Tratamiento satinado / lijado' },
    detail: { en: 'Surface-detail reference. Finish consistency, grade, diameter, wall and packaging are agreed per order.', es: 'Referencia de acabado. Uniformidad, grado, diámetro, espesor y embalaje se acuerdan por pedido.' },
  },
  34: {
    category: 'profiles', custom: true,
    name: { en: 'Special-section formed tube', es: 'Tubo conformado de sección especial' },
    process: { en: 'Special-section forming', es: 'Conformado de sección especial' },
    detail: { en: 'Flanged or locating geometry visible; exact interface, tolerances and function must be drawing-defined.', es: 'Geometría con pestaña o encaje visible; interfaz, tolerancias y función deben definirse por plano.' },
  },
  35: {
    category: 'custom-fabrication', custom: true,
    name: { en: 'Large custom welded pipe assembly', es: 'Conjunto de tubería soldada de gran tamaño' },
    process: { en: 'Round pipe · segmented elbow · box welding', es: 'Tubo redondo · codo segmentado · soldadura de caja' },
    detail: { en: 'Large non-standard assembly for drawing-based review of material, geometry, welds, supports and inspection.', es: 'Conjunto no estándar para revisar por plano material, geometría, soldaduras, soportes e inspección.' },
  },
  36: {
    category: 'construction', custom: true,
    name: { en: 'Bent rebar / U-bars / stirrups', es: 'Armadura doblada / barras U / estribos' },
    process: { en: 'Rebar bending and forming', es: 'Doblado y conformado de armaduras' },
    detail: { en: 'Reinforcement fabrication reference. Bend schedule, diameter, grade, mandrel and tolerances are confirmed.', es: 'Referencia de fabricación. Se confirman programa, diámetro, grado, mandril y tolerancias.' },
  },
  37: {
    category: 'profiles', custom: true,
    name: { en: 'Curved channel / rolled profile', es: 'Canal curvado / perfil cilindrado' },
    process: { en: 'Profile bending', es: 'Curvado de perfiles' },
    detail: { en: 'Curved channel-form section for enquiries defined by profile, radius, arc length and dimensional checks.', es: 'Sección canal curvada definida por perfil, radio, longitud de arco y controles dimensionales.' },
  },
  38: {
    category: 'metal-products', custom: true,
    name: { en: 'Framed isolation / fence panel', es: 'Panel de aislamiento / cercado con marco' },
    process: { en: 'Rectangular-tube frame and metal mesh', es: 'Marco de tubo rectangular y malla metálica' },
    detail: { en: 'Bright-finish framed mesh panel; exact material, coating and use are confirmed with the order.', es: 'Panel de malla con acabado brillante; material, recubrimiento y uso se confirman con el pedido.' },
  },
  39: {
    category: 'stainless-tube', custom: false,
    name: { en: 'Multi-size stainless tube inventory', es: 'Inventario de tubos inoxidables de múltiples medidas' },
    process: { en: 'Finished-tube batch storage', es: 'Almacenamiento por lotes de tubo terminado' },
    detail: { en: 'Supply-capability reference across multiple tube sizes; live stock and specification remain subject to confirmation.', es: 'Referencia de suministro en varias medidas; inventario y especificación se confirman en cada consulta.' },
  },
  40: {
    category: 'construction', custom: false,
    name: { en: 'Coiled and straight deformed rebar', es: 'Armadura corrugada en rollo y barra recta' },
    process: { en: 'Coiled rebar and straight bar', es: 'Armadura en rollo y barra recta' },
    detail: { en: 'Two product forms shown together. Confirm grade, nominal diameter, standard, coil or bar length and quantity.', es: 'Dos formatos presentados juntos. Confirmar grado, diámetro nominal, norma, longitud y cantidad.' },
  },
};

export const catalogProducts = sourceImages.map((source) => {
  const copy = copyById[source.id];
  if (!copy) throw new Error(`Missing catalogue copy for source image ${source.id}`);
  return { ...source, ...copy };
});

export function localizeProduct(product: (typeof catalogProducts)[number], locale: Locale) {
  return {
    ...product,
    name: product.name[locale],
    process: product.process[locale],
    detail: product.detail[locale],
    categoryLabel: catalogCategories.find((category) => category.key === product.category)?.label[locale] ?? product.category,
  };
}

