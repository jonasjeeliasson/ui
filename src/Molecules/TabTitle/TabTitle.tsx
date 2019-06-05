import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-useless-path-segments
import Typography from '../../Atoms/Typography';
import { Props, Size } from './TabTitle.types';

const getHeight = (size?: Size) => (size === 'm' ? 11 : 8);
const StyledDiv = styled.div<Props>`
  vertical-align: middle;
  background: none;
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  height: ${p => p.theme.spacing.unit(getHeight(p.size))}px;
  position: relative;
  color: ${props => props.theme.color.text};
  :after {
    content: '';
    width: 100%;
    background: ${props => (props.active ? props.theme.color.borderActive : 'transparent')};
    height: 2px;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
const StyledTypography = styled(Typography)<any>`
  line-height: ${p => p.theme.spacing.unit(getHeight(p.size))}px;
`;
export const TabTitle: React.FC<Props> = ({ active = false, children, size = 's', className }) => {
  return (
    <StyledDiv size={size} active={active} className={className}>
      <StyledTypography
        type={size === 'm' ? 'primary' : 'secondary'}
        weight={active ? 'bold' : 'regular'}
        size={size}
      >
        {children}
      </StyledTypography>
    </StyledDiv>
  );
};
TabTitle.displayName = 'TabTitle';
