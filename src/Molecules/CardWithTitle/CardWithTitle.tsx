import React from 'react';
import styled from 'styled-components';
import R from 'ramda';
import { Typography, Card } from '../..';
import { CardWithTitleComponent, Props } from './CardWithTitle.types';

const StyledCard = styled(Card)``;
const StyledTitle = styled.div<Props>`
  margin-bottom: ${({ theme }) => theme.spacing.unit(4)}px;
`;

const omitProps = R.omit(['children', 'title']);

export const CardWithTitle: CardWithTitleComponent = props =>
  props.title ? (
    <StyledCard {...omitProps(props)}>
      <StyledTitle>
        <Typography type="title3">{props.title}</Typography>
      </StyledTitle>
      {props.children}
    </StyledCard>
  ) : (
    <StyledCard {...omitProps(props)}>{props.children}</StyledCard>
  );
CardWithTitle.displayName = 'CardWithTitle';
