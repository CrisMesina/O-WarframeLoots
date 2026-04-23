import i18n from './i18n';

/**
 * Mapeo de valores de API a claves de traducción
 * Agrega aquí todos los valores que retorna tu API de Warframe
 */
const apiValueMap = {
  // Rarezas
  'common': 'rarity_common',
  'uncommon': 'rarity_uncommon',
  'rare': 'rarity_rare',
  'legendary': 'rarity_legendary',

  // Tipos de elementos
  'relic': 'itemType_relic',
  'credit': 'itemType_credit',
  'blueprint': 'itemType_blueprint',
  'arcane': 'itemType_arcane',
  'credits': 'itemType_credit',
  'mod': 'itemType_mod',

  // Componentes Prime
  'neuroptics': 'itemType_neuroptics',
  'chasis': 'itemType_chasis',
  'systems': 'itemType_systems',
};

/**
 * Función para traducir valores de la API
 * @param {string} value - Valor que retorna la API
 * @returns {string} - Valor traducido
 */
export const translateApiValue = (value) => {
  if (!value) return value;

  const key = apiValueMap[value.toLowerCase()];
  return key ? i18n.t(key) : value; // Si no existe la clave, retorna el valor original
};

/**
 * Función para traducir propiedades de objetos de la API
 * @param {object} item - Objeto de la API
 * @param {array} properties - Propiedades a traducir
 * @returns {object} - Objeto con propiedades traducidas
 */
export const translateApiObject = (item, properties = []) => {
  const translatedItem = { ...item };

  properties.forEach(prop => {
    if (translatedItem[prop]) {
      translatedItem[prop] = translateApiValue(translatedItem[prop]);
    }
  });

  return translatedItem;
};

/**
 * Función para traducir palabras dentro de un nombre de item
 * Por ejemplo: "Credit A" → "Crédito A"
 * @param {string} itemName - Nombre del item de la API
 * @returns {string} - Nombre traducido
 */
export const translateItemName = (itemName) => {
  if (!itemName) return itemName;

  let translatedName = itemName;

  // Buscar cada palabra mapeada en el nombre y reemplazarla
  Object.keys(apiValueMap).forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi'); // Busca la palabra exacta (no importa mayúsculas)
    if (regex.test(translatedName)) {
      const translationKey = apiValueMap[key.toLowerCase()];
      const translatedWord = i18n.t(translationKey);
      translatedName = translatedName.replace(regex, translatedWord);
    }
  });

  return translatedName;
};
