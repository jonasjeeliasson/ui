import styled from 'styled-components';
import React from 'react';
import { Flexbox, Typography, List } from '../..';
import { ListWithTitlesComponent } from './ListWithTitles.types';

const TitleContainer = styled.div`
  margin-bottom: ${p => p.theme.spacing.unit(1)}px;
`;

export const ListWithTitles: ListWithTitlesComponent = props => {
  const { leftTitle, rightTitle, className, ...restProps } = props;
  return leftTitle || rightTitle ? (
    <div className={className}>
      <TitleContainer>
        <Flexbox.Container gutter={0} justifyContent="space-between">
          <Flexbox.Item>
            <Typography type="secondary">{leftTitle}</Typography>
          </Flexbox.Item>
          <Flexbox.Item>
            <Typography type="secondary">{rightTitle}</Typography>
          </Flexbox.Item>
        </Flexbox.Container>
      </TitleContainer>
      <List {...restProps} />
    </div>
  ) : (
    <List className={className} {...restProps} />
  );
};

ListWithTitles.displayName = 'ListWithTitles';
