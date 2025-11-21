// Client-side translation utility
export function getCurrentLanguage(): string {
  if (typeof window === 'undefined') return 'es';
  const stored = localStorage.getItem('language');
  if (stored && (stored === 'es' || stored === 'en' || stored === 'de')) {
    return stored;
  }
  return 'es';
}

export function updateTranslations() {
  const lang = getCurrentLanguage();
  const html = document.documentElement;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      const translation = getTranslation(key, lang);
      if (translation) {
        element.textContent = translation;
      }
    }
  });
  
  // Update all elements with data-i18n-html attribute (for HTML content)
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.getAttribute('data-i18n-html');
    if (key) {
      const translation = getTranslation(key, lang);
      if (translation) {
        element.innerHTML = translation;
      }
    }
  });
  
  // Update all elements with data-i18n-attr attribute (for attributes like placeholder, title, etc)
  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    const attrs = element.getAttribute('data-i18n-attr');
    if (attrs) {
      const attrPairs = attrs.split(',');
      attrPairs.forEach((pair) => {
        const [attr, key] = pair.trim().split(':');
        if (attr && key) {
          const translation = getTranslation(key.trim(), lang);
          if (translation) {
            element.setAttribute(attr.trim(), translation);
          }
        }
      });
    }
  });
}

function getTranslation(key: string, lang: string): string {
  // This will be populated by the translations loaded from the translations file
  const translations: Record<string, Record<string, string>> = (window as any).__TRANSLATIONS__ || {};
  return translations[lang]?.[key] || translations['es']?.[key] || key;
}

// Load translations into window object
export function loadTranslations(translations: any) {
  (window as any).__TRANSLATIONS__ = translations;
}

