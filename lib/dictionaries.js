import 'server-only'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  pt: () => import('../dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
  const loader = dictionaries[locale] || dictionaries.en; // Fallback to English
  return loader();
}; 