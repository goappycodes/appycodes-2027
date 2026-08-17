/* Sector classification for the project register.
 *
 * Copy to domain-rules.js and fill in. That file is gitignored on purpose: the
 * rules match on client names, which makes the completed table a client list —
 * and this repository is public.
 *
 * Order matters, first match wins. Anything unmatched lands in "Other", which
 * is honest and is what the atlas page says it is. Resist the urge to widen a
 * pattern until nothing is left over; a wrong bucket is worse than "Other".
 *
 * Check your coverage with:  node scripts/build-portfolio-data.js --other
 */
module.exports = [
  ["Consumer apps & marketplaces", /some-client|another-client/i],
  ["Commerce & retail", /shopify|ecommerce|woo|store|retail/i],
  ["Education & training", /lms|school|tutor|tuition|educat/i],
  ["Financial services", /wallet|remittance|payments|invoice|payroll/i],
  ["Supply chain & logistics", /inventory|delivery|logistic|courier|warehouse/i],
  ["Events & ticketing", /ticket|event|venue/i],
  ["Health & care", /health|medic|clinic|patient|dental/i],
  ["Property, legal & professional", /solicitor|legal|probate|property|estate|consult/i],
  ["Media & publishing", /press|news|media|publish|radio/i],
  ["Sport & fitness", /cricket|football|sport|fitness/i],
  ["Travel & hospitality", /travel|tour|holiday|hotel|hospitality/i],
  ["Industrial, energy & trade", /energy|boiler|hvac|motors|industrial/i],
  ["Agencies & partners", /agency|white.label/i],
  ["Public sector & non-profit", /government|council|charity|ngo/i],
  ["AI & internal products", /\bai\b|chatbot|copilot|automation/i],
];
