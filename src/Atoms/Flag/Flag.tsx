import React from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import flags from './flags';
import { FlagComponent, InternalProps } from './Flag.types';
import { assert } from '../../common/utils';

const CleanSvg: React.FC<Partial<React.SVGProps<any>>> = ({
  className,
  children,
  focusable,
  role,
  viewBox,
}) => <svg {...{ className, children, focusable, role, viewBox }} />;

const VIEWBOX_HEIGHT = 480;
const VIEWBOX_WIDTH = 640;
const StyledSvg = styled(CleanSvg)<InternalProps>`
  height: ${p => p.theme.spacing.unit(p.height)}px;
  ${p => (p.grayBorder ? `border: 1px solid ${p.theme.color.flagBorder};` : '')} 
  box-sizing: border-box;
  display: ${p => (p.inline ? 'inline-block' : 'block')};
  ${p =>
    p.inline
      ? `
  vertical-align: middle;
  position: relative;
  bottom: 1px;
  `
      : ''};
  ${/** IE11 fixes below */ ''}
  width: ${p => (p.theme.spacing.unit(p.height) * VIEWBOX_WIDTH) / VIEWBOX_HEIGHT}px;
  overflow: hidden;
`;

const FLAGS_WITH_WHITE_BACKGROUND = ['fi', 'jp', 'ru'];

export const Flag: FlagComponent = ({ country, height, inline }) => {
  assert(Boolean(country), 'Flag: You need to supply a country code');
  const FlagPathComponent = country ? flags[country.toLowerCase()] : null;

  if (!FlagPathComponent) {
    return null;
  }

  const grayBorder = FLAGS_WITH_WHITE_BACKGROUND.some(R.equals(country.toLowerCase()));

  return (
    <StyledSvg
      inline={inline}
      focusable="false"
      role="img"
      height={height || 5} // units
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      grayBorder={grayBorder}
    >
      <FlagPathComponent />
    </StyledSvg>
  );
};
