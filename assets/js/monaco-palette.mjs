export const colors = {
  white: "#FFFFFF",
  white2: "#E9EBF2",
  white3: "#CCCCCC",
  night: "#0B1C26",
  night2: "#112A40",
  night3: "#2E4559",
  grass: "#6AB04B",
  point: "#4189A6",
  moon: "#E0B88D",
  nebular: "#CA5FA4",
  nebular2: "#F2B6D7",
};

export const monacoTokenPalette = {
  dark: {
    keyword: colors.point,
    comment: colors.night3,
    number: colors.white2,
    string: colors.nebular,
    delimiter: colors.night3,
    operator: colors.night3,
    identifier: colors.moon,
    type: colors.grass,
  },
  light: {
    keyword: colors.point,
    comment: colors.white3,
    number: colors.night3,
    string: colors.nebular,
    delimiter: colors.white3,
    operator: colors.white3,
    identifier: colors.moon,
    type: colors.grass,
  },
};
