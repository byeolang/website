import * as ko from './lang-ko.mjs';
import * as en from './lang-en.mjs';
import { colors, monacoTokenPalette } from './monaco-palette.mjs';

class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || this.pickDefaultLang();
    this.translations = { "ko": ko.default, "en": en.default };
  }

  pickDefaultLang() {
    const lang = navigator.language;
    return lang == 'ko' || lang == 'ko-KR' ? 'ko' : 'en';
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

const csharpTokenPattern = /(?<comment>\/\/.*$)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<number>\b\d+(?:\.\d+)?\b)|(?<type>\b(?:bool|byte|char|decimal|double|float|int|long|object|short|string|var)\b)|(?<keyword>\b(?:class|public|private|protected|internal|new|return|void|static|using|namespace)\b)|(?<operator>=>|==|!=|<=|>=|&&|\|\||[=+\-*/%!<>?:]+)|(?<delimiter>[{}()[\].,;:])|(?<identifier>\b[A-Za-z_]\w*\b)/gm;
const byeolTokenPattern = /(?<comment>#.*$)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<number>\b\d+(?:\.\d+)?\b)|(?<type>\b(?:bool|int|float|string)\b)|(?<keyword>\b(?:def|let|print|if|else|elif|while|for|return|true|false)\b)|(?<operator>:=|==|!=|<=|>=|&&|\|\||[=+\-*/%!<>|]+)|(?<delimiter>[{}()[\].,;:])|(?<identifier>\b[A-Za-z_]\w*\b)/gm;
let scene1ThemeObserver = null;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "");
}

function highlightLine(line, pattern) {
  let html = "";
  let lastIndex = 0;
  pattern.lastIndex = 0;

  for (const match of line.matchAll(pattern)) {
    const groups = match.groups ?? {};
    const tokenType = Object.keys(groups).find((key) => groups[key] !== undefined);

    if (!tokenType || match.index === undefined) {
      continue;
    }

    html += escapeHtml(line.slice(lastIndex, match.index));
    html += `<span class="scene1-copy__code-token scene1-copy__code-token--${tokenType}">${escapeHtml(match[0])}</span>`;
    lastIndex = match.index + match[0].length;
  }

  html += escapeHtml(line.slice(lastIndex));
  return html || "&nbsp;";
}

function renderHighlightedCode(source, language) {
  const pattern = language === "csharp" ? csharpTokenPattern : byeolTokenPattern;
  return source
    .split("\n")
    .map((line) => `<span class="scene1-copy__code-line">${highlightLine(line, pattern)}</span>`)
    .join("");
}

function applyScene1CopyTheme() {
  const root = document.documentElement;
  const palette = root.classList.contains("dark-mode") ? monacoTokenPalette.dark : monacoTokenPalette.light;

  root.style.setProperty("--scene1-copy-token-keyword", palette.keyword);
  root.style.setProperty("--scene1-copy-token-comment", palette.comment);
  root.style.setProperty("--scene1-copy-token-number", palette.number);
  root.style.setProperty("--scene1-copy-token-string", palette.string);
  root.style.setProperty("--scene1-copy-token-delimiter", palette.delimiter);
  root.style.setProperty("--scene1-copy-token-operator", palette.operator);
  root.style.setProperty("--scene1-copy-token-identifier", palette.identifier);
  root.style.setProperty("--scene1-copy-token-type", palette.type);
  root.style.setProperty("--scene1-copy-accent-point", colors.point);
  root.style.setProperty("--scene1-copy-accent-grass", colors.grass);
  root.style.setProperty("--scene1-copy-accent-moon", colors.moon);
  root.style.setProperty("--scene1-copy-accent-nebular", colors.nebular);
  root.style.setProperty("--scene1-copy-emphasis-color", palette.identifier);
}

function installScene1ThemeObserver() {
  if (scene1ThemeObserver) {
    return;
  }

  scene1ThemeObserver = new MutationObserver(() => {
    applyScene1CopyTheme();
  });

  scene1ThemeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function emphasizeScene1Description(source, language) {
  const phrases = language === "ko"
    ? ["적은 문법 요소", "문법", "아이디어"]
    : ["fewer grammar elements", "syntax", "ideas"];

  return phrases.reduce((result, phrase) => {
    const expression = new RegExp(escapeRegExp(phrase), "g");
    return result.replace(expression, `<strong>${phrase}</strong>`);
  }, source);
}

function renderScene1Description() {
  const descriptionElement = document.querySelector(".scene1-copy__description");

  if (!descriptionElement) {
    return;
  }

  const emphasizedSource = emphasizeScene1Description(i18n.t("scene1-desc"), i18n.getLang());
  const lines = emphasizedSource
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  descriptionElement.dataset.splitSourceHtml = lines.join("\n");
  descriptionElement.dataset.splitSource = stripTags(lines.join("\n"));
  descriptionElement.innerHTML = lines
    .map((line) => `<span class="scene1-copy__description-line">${line}</span>`)
    .join("");
}

function renderHighlightedCodeBlocks(selector) {
  document.querySelectorAll(selector).forEach((element) => {
    const language = element.dataset.codeLanguage;
    const source = i18n.t(element.getAttribute("data-lang"));
    element.innerHTML = renderHighlightedCode(source, language);
  });
}

function renderScene1CodeBlocks() {
  renderHighlightedCodeBlocks(".scene1-copy__code-block[data-code-language]");
}

function renderScene3CodeBlocks() {
  renderHighlightedCodeBlocks(".scene3-copy__code-block[data-code-language]");
}

function renderScene1RichCopy() {
  if (!document.querySelector("#scene1-copy")) {
    return;
  }

  renderScene1Description();
  renderScene1CodeBlocks();
  applyScene1CopyTheme();
  installScene1ThemeObserver();
}

function renderScene3RichCopy() {
  if (!document.querySelector("#scene3-copy")) {
    return;
  }

  renderScene3CodeBlocks();
  applyScene1CopyTheme();
  installScene1ThemeObserver();
}

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

  renderScene1RichCopy();
  renderScene3RichCopy();
});
