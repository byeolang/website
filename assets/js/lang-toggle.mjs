import * as ko from './lang-ko.mjs';
import * as en from './lang-en.mjs';

class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = { "ko": ko.default, "en": en.default };
  }

  t(key, defaultValue = key) {
    const translation = this.translations[this.currentLanguage];
    return translation && translation[key] ? translation[key] : defaultValue;
  }

  getLang() {
    return this.currentLanguage;
  }

  toggleLang() {
    const newLang = this.currentLanguage === 'ko' ? 'en' : 'ko';
    this.currentLanguage = newLang;
    localStorage.setItem('language', newLang);
    this.updateLanguageFlag(newLang);

    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  updateLanguageFlag(lang) {
    const flagImg = document.getElementById('lang-icon');
    if (flagImg) {
      flagImg.src = `/assets/images/${lang}.png`;
    }
  }

  init() {
    console.log("i18n.init()");
    this.updateTooltips();
    this.updateLanguageFlag(this.currentLanguage);
  }

  updateTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
      const originalKey = element.dataset.originalTooltip || element.getAttribute('data-tooltip');
      if (!element.dataset.originalTooltip) {
        element.dataset.originalTooltip = originalKey;
      }
      const translation = this.t(originalKey);
      element.setAttribute('data-tooltip', translation);
    });
  }
}

export const i18n = new I18n();
i18n.init();

document.addEventListener('DOMContentLoaded', async () => {

  const toggleButton = document.getElementById('language-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      i18n.toggleLang();
    });
  }

  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    const translation = i18n.t(key);
    if(translation)
      element.textContent = translation;
  });
});