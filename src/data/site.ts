const salesEmails = [
  'z.yuan.guo@yiantechglobal.com',
  's.uribe.camus@yiantechglobal.com',
] as const;

export const site = {
  name: 'YIAN Tech Global',
  legalNameZh: '奕安聚合科技公司',
  description:
    'Steel products, custom sandstone and international project supply coordination.',
  salesEmails,
  salesMailto: `mailto:${salesEmails.join(',')}`,
  whatsappDisplay: '+61 0410 983 877',
  whatsappHref: 'https://wa.me/61410983877',
  domain: 'yiantechglobal.com',
} as const;
