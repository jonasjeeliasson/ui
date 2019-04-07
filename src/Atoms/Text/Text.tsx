import React from 'react';
import styled from 'styled-components';
import { TextComponent, StyledTextProps } from './Text.types';

const WEIGHTS = {
  regular: 400,
  bold: 700,
  extrabold: 800,
};

const SMALL_DEVICE_BP = 'xs';

const StyledText = styled.span<StyledTextProps>`
  font-family: 'Nordnet Sans Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
  font-size: ${p => p.sizeMobile}px;
  color: ${p => {
    if (p.colorOrColorFn && typeof p.colorOrColorFn === 'function') {
      return p.colorOrColorFn(p.theme);
    }

    if (p.colorOrColorFn === 'inherit') {
      return 'inherit';
    }

    return p.theme.color.text;
  }};
  font-weight: ${p => WEIGHTS[p.weight] || WEIGHTS.regular};
  ${p => p.theme.media.greaterThan(p.theme.size[SMALL_DEVICE_BP])} {
    font-size: ${p => p.sizeDesktop}px;
  }
`;

const Primary: TextComponent['Primary'] = props => (
  <StyledText
    as={props.as}
    sizeMobile={14}
    sizeDesktop={16}
    colorOrColorFn={props.color}
    weight={props.weight || 'regular'}
  >
    {props.children}
  </StyledText>
);
Primary.displayName = 'Text.Primary';

const Secondary: TextComponent['Secondary'] = props => (
  <StyledText
    as={props.as}
    sizeMobile={12}
    sizeDesktop={14}
    colorOrColorFn={props.color}
    weight={props.weight || 'regular'}
  >
    {props.children}
  </StyledText>
);
Secondary.displayName = 'Text.Secondary';

const Tertiary: TextComponent['Tertiary'] = props => (
  <StyledText
    as={props.as}
    sizeMobile={10}
    sizeDesktop={12}
    colorOrColorFn={props.color}
    weight={props.weight || 'regular'}
  >
    {props.children}
  </StyledText>
);
Tertiary.displayName = 'Text.Tertiary';

const Title1: TextComponent['Title1'] = props => (
  <StyledText
    as={props.as}
    sizeMobile={30}
    sizeDesktop={32}
    colorOrColorFn={props.color}
    weight="extrabold"
  >
    {props.children}
  </StyledText>
);
Title1.displayName = 'Text.Title1';

const Title3: TextComponent['Title3'] = props => (
  <StyledText
    as={props.as}
    sizeMobile={18}
    sizeDesktop={20}
    colorOrColorFn={props.color}
    weight="extrabold"
  >
    {props.children}
  </StyledText>
);
Title3.displayName = 'Text.Title3';

export const Text: TextComponent = {
  Primary,
  Secondary,
  Tertiary,
  Title1,
  Title3,
};
