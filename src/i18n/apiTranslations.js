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
 * @returns {string} - Valor sin traducir (valor original)
 */
export const translateApiValue = (value) => {
  // Los datos de la API NO se traducen, se devuelven como vienen
  return value;
};

/**
 * Función para traducir propiedades de objetos de la API
 * @param {object} item - Objeto de la API
 * @param {array} properties - Propiedades a traducir
 * @returns {object} - Objeto sin traducir (valores originales de API)
 */
export const translateApiObject = (item, properties = []) => {
  // Los datos de la API NO se traducen, se devuelve el objeto como viene
  return item;
};

/**
 * Función para traducir palabras dentro de un nombre de item
 * Por ejemplo: "Ash Prime" → "Ash Prime" (sin cambios, datos de API no se traducen)
 * @param {string} itemName - Nombre del item de la API
 * @returns {string} - Nombre sin traducir (valor original)
 */
export const translateItemName = (itemName) => {
  // Los datos de la API NO se traducen, se devuelven como vienen
  return itemName;
};
