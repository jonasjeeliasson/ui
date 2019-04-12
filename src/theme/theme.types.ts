type MediaQuery = string;
/** Number of pixels */
export type ThemeConfig = {};
type Unit = {
  (times: number): number;
  toString: () => string;
  valueOf: () => number;
};
export type RawColor = {
  // BRAND
  brandBlue: '#00C8F5';
  brandGreen: '#D2F500';
  brandPink: '#FF2B83';
  brandTurquoise: '#00F0E1';

  // COMPLEMENTARY BRAND COLOURS
  complementaryBlue1: '#385E9D';
  complementaryBlue2: '#131F4F';
  complementaryGreen1: '#3A913F';
  complementaryGreen2: '#023C00';
  complementaryPink1: '#AC135A';
  complementaryPink2: '#78013A';
  complementaryTurquoise1: '#009195';
  complementaryTurquoise2: '#01424C';

  // GRAYSCALE PALETTE
  black: '#000000';
  gray0: '#282823';
  gray1: '#4B4B46';
  gray2: '#6E6E69';
  gray3: '#A0A09B';
  gray4: '#BCBCB6';
  gray5: '#D7D7D2';
  gray6: '#EBEBE8';
  gray7: '#F5F5F5';
  white: '#FFFFFF';

  // FUNCTIONAL COLOURS FOR PRODUCT DEVELOPMENT
  cta: '#0046FF';
  positive: '#00D200';
  negative: '#FF1900';
  index: '#FFCF00';
};

export type Theme = {
  /** Semantic names for the colors */
  color: {
    /** gray7 */
    background: RawColor['gray7'];
    /** gray0 */
    text: RawColor['gray0'];
    /** white */
    textLight: RawColor['white'];
    /** gray2 */
    label: RawColor['gray2'];
    /** cta */
    buy: RawColor['cta'];
    /** white */
    buttonText: RawColor['white'];
    /** cta */
    borderActive: RawColor['cta'];
    /** negative */
    sell: RawColor['negative'];
    /** cta */
    cta: RawColor['cta'];
    /** positive */
    positive: RawColor['positive'];
    /** negative */
    negative: RawColor['negative'];
    /** index */
    warning: RawColor['index'];
    /** white */
    card: RawColor['white'];
    /** gray6 */
    divider: RawColor['gray6'];
    /** gray0 */
    backgroundDark: RawColor['gray0'];
    /** gray5 */
    disabled: RawColor['gray5'];
    /** white */
    buttonSecondaryBackground: RawColor['white'];
    /** white */
    module: RawColor['white'];
    /** black */
    spinnerBlack: RawColor['black'];
    /** white */
    spinnerWhite: RawColor['white'];
  };

  spacing: {
    /**
     * One unit, all spacing should be handled with this
     * @example
     * margin: ${({ theme }) => theme.spacing.unit * 4}px;
     * @example
     * margin: ${({ theme }) => theme.spacing.unit(4)}px;
     */
    unit: Unit;
    /** Number of units in gutter */
    gutter: 5;
  };

  size: {
    /** Mobile */
    xs: 360;
    /** Tablet, mobile */
    sm: 768;
    /** Tablet, desktop */
    md: 992;
    /** Desktop */
    lg: 1440;
    /** Large desktop */
    xl: 1680;
  };
  media: {
    /**
     * @example
     * styled.div`
  ${({ theme }) => theme.media.lessThan(theme.size.tablet)} {
      }
`
     */
    lessThan: (/** One of theme.size */ size: number) => MediaQuery;
    greaterThan: (/** One of theme.size */ size: number) => MediaQuery;
    between: (
      /** One of theme.size */ size1: number,
      /** One of theme.size */ size2: number,
    ) => MediaQuery;
  };
  /** Some units for animation */
  animation: {
    duration: {};
    easing: {};
  };
};
