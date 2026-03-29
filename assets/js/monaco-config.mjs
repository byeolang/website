import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/+esm';
import { DoxygenAwesomeDarkModeToggle } from './doxygen-awesome-darkmode-toggle.mjs';
import { byeolLanguage } from './monaco-editor-byeol-language-min.mjs';
import { colors, monacoTokenPalette } from './monaco-palette.mjs';

monaco.languages.register({id: 'byeol'});
monaco.languages.setMonarchTokensProvider('byeol', byeolLanguage);

monaco.editor.defineTheme('byeolTheme-dark', {
  base: 'vs-dark',
  inherit: false,
  rules: [
    { token: "keyword", foreground: monacoTokenPalette.dark.keyword },
    { token: "comment", foreground: monacoTokenPalette.dark.comment },
    { token: "number", foreground: monacoTokenPalette.dark.number },
    { token: "string", foreground: monacoTokenPalette.dark.string },
    { token: "delimiter", foreground: monacoTokenPalette.dark.delimiter },
    { token: "operator", foreground: monacoTokenPalette.dark.operator },
    { token: "identifier", foreground: monacoTokenPalette.dark.identifier },
    { token: "type", foreground: monacoTokenPalette.dark.type },
  ],
  colors: {
    'editor.background': colors.night,
    "scrollbar.shadow": "#00000000",
    "scrollbarSlider.activeBackground": colors.point,
    "scrollbarSlider.background": colors.night2,
    "scrollbarSlider.hoverBackground": colors.point,
  }
});

monaco.editor.defineTheme('byeolTheme-light', {
  base: 'vs',
  inherit: false,
  rules: [
    { token: "keyword", foreground: monacoTokenPalette.light.keyword },
    { token: "comment", foreground: monacoTokenPalette.light.comment },
    { token: "number", foreground: monacoTokenPalette.light.number },
    { token: "string", foreground: monacoTokenPalette.light.string },
    { token: "delimiter", foreground: monacoTokenPalette.light.delimiter },
    { token: "operator", foreground: monacoTokenPalette.light.operator },
    { token: "identifier", foreground: monacoTokenPalette.light.identifier },
    { token: "type", foreground: monacoTokenPalette.light.type },
  ],
  colors: {
    'editor.background': colors.white,
    "scrollbar.shadow": "#00000000",
    "scrollbarSlider.activeBackground": colors.point,
    "scrollbarSlider.background": colors.white2,
    "scrollbarSlider.hoverBackground": colors.point,
  }
});

function getFontSize() {
  let width = window.innerWidth;
  if (width < 500) return 13;
  if (width < 900) return 17;
  return 20
}

export const editor = monaco.editor.create(document.getElementById('codepad'), {
  language: 'byeol',
  minimap: { enabled: false },
  renderLineHighlight: "none",
  automaticLayout: true,
  fontFamily: 'Galmuri9',
  fontSize: getFontSize(),
  wordWrap: 'on',
  scrollbar: {
    horizontal: 'hidden',
    verticalScrollbarSize: 20,
  }
});

DoxygenAwesomeDarkModeToggle.onDarkModeChange = function(isEnable) {
  if (isEnable) {
      monaco.editor.setTheme('byeolTheme-dark');
  } else {
      monaco.editor.setTheme('byeolTheme-light');
  }
}

export const model = editor.getModel();
