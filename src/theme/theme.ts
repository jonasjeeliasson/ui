import { assert } from '../common/utils'; // eslint-disable-line import/no-unresolved
import { ThemeConfig, Theme, RawColor } from './theme.types';

// Export from here for showing in story,
// but don't export from index.ts
export const rawColor = {
  // BRAND
  brandBlue: '#00C8F5',
  brandGreen: '#D2F500',
  brandPink: '#FF2B83',
  brandTurquoise: '#00F0E1',

  // COMPLEMENTARY BRAND COLOURS
  complementaryBlue1: '#385E9D',
  complementaryBlue2: '#131F4F',
  complementaryGreen1: '#3A913F',
  complementaryGreen2: '#023C00',
  complementaryPink1: '#AC135A',
  complementaryPink2: '#78013A',
  complementaryTurquoise1: '#009195',
  complementaryTurquoise2: '#01424C',

  // GRAYSCALE PALETTE
  black: '#000000',
  gray0: '#282823',
  gray1: '#4B4B46',
  gray2: '#6E6E69',
  gray3: '#A0A09B',
  gray4: '#BCBCB6',
  /** @deprecated  */ gray5: '#D7D7D2',
  gray6: '#EBEBE8',
  gray7: '#F5F5F5',
  white: '#FFFFFF',

  // FUNCTIONAL COLOURS FOR PRODUCT DEVELOPMENT
  cta: '#0046FF',
  positive: '#00D200',
  negative: '#FF1900',
  index: '#FFCF00',

  // ACCESSIBLE FUNCTIONAL COLORS
  a11yCta: '#2D67FF',
  a11yPositive: '#008A00',
  a11yNegative: '#E81700',
  a11yIndex: '#C15700',
} as RawColor;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTheme = (config: ThemeConfig = {}): Theme => {
  const { a11yColors = false } = config;
  const size: Theme['size'] = {
    xs: 360,
    sm: 768,
    md: 992,
    lg: 1440,
    xl: 1680,
  };

  const sizeValues = Object.values(size) as number[];

  const GUTTER = 5;
  const UNIT = 4;
  const unit = (times: number) => times * UNIT;
  unit.valueOf = () => UNIT;
  unit.toString = () => UNIT.toString();

  const spacing: Theme['spacing'] = {
    unit,
    gutter: GUTTER,
  };

  const theme: Theme = {
    animation: {
      easing: {},
      duration: {},
    },
    color: {
      background: rawColor.gray7,
      backgroundDark: rawColor.gray0,
      buttonSecondaryBackground: rawColor.white,
      buttonText: rawColor.white,
      buy: a11yColors ? rawColor.a11yCta : rawColor.cta,
      borderActive: a11yColors ? rawColor.a11yCta : rawColor.cta,
      card: rawColor.white,
      cta: a11yColors ? rawColor.a11yCta : rawColor.cta,
      disabled: rawColor.gray3,
      divider: rawColor.gray6,
      label: rawColor.gray2,
      module: rawColor.white,
      negative: a11yColors ? rawColor.a11yNegative : rawColor.negative,
      positive: a11yColors ? rawColor.a11yPositive : rawColor.positive,
      sell: a11yColors ? rawColor.a11yNegative : rawColor.negative,
      spinnerBlack: rawColor.black,
      spinnerWhite: rawColor.white,
      text: rawColor.gray0,
      textLight: rawColor.white, // FIXME: to be removed later
      warning: a11yColors ? rawColor.a11yIndex : rawColor.index,
      inputBorder: rawColor.gray4,
      inputBorderHover: rawColor.gray1,
      flagBorder: rawColor.gray6,
    },
    media: {
      between: (s1, s2) => {
        assert(sizeValues.includes(s1), `[theme.media] Unrecognized size value: ${s1}`);
        assert(sizeValues.includes(s2), `[theme.media] Unrecognized size value: ${s2}`);

        return `@media (min-width: ${s1}px) and (max-width: ${s2}px)`;
      },
      greaterThan: s => {
        assert(sizeValues.includes(s), `[theme.media] Unrecognized size value: ${s}`);
        return `@media (min-width: ${s}px)`;
      },
      lessThan: s => {
        assert(sizeValues.includes(s), `[theme.media] Unrecognized size value: ${s}`);
        return `@media (max-width: ${s}px)`;
      },
    },
    size,
    spacing,
  };
  return theme;
};
