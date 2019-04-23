import React from 'react';
import styled from 'styled-components';
import R from 'ramda';
import { Typography, Card } from '../..';
import { CardWithTitleComponent, Props } from './CardWithTitle.types';

const StyledTitle = styled.div<Props>`
  margin-bottom: ${({ theme }) => theme.spacing.unit(4)}px;
`;

const omitProps = R.omit(['children', 'title']);

export const CardWithTitle: CardWithTitleComponent = props =>
  props.title ? (
    <Card {...omitProps(props)}>
      <StyledTitle>
        <Typography type="title3">{props.title}</Typography>
      </StyledTitle>
      {props.children}
    </Card>
  ) : (
    <Card {...omitProps(props)}>{props.children}</Card>
  );
CardWithTitle.displayName = 'CardWithTitle';
