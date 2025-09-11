import { i18n } from './lang-toggle.mjs'

document.addEventListener('DOMContentLoaded', function() {
  const iframe = document.getElementById('generated');
  iframe.src = `../../guide/generated/${i18n.getLang()}/index.html`
});