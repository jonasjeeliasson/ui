import { storiesOf } from '@storybook/react';
import React from 'react';
import { Flexbox, ListItem, ListWithTitles } from '../..';

const ItemContainer: React.FunctionComponent = ({ children }) => (
  <Flexbox.Container justifyContent="space-between">{children}</Flexbox.Container>
);

storiesOf('Molecules | ListWithTitles', module)
  .add('Integration: ListWithTitles with left and right titles', () => {
    return (
      <ListWithTitles as="ol" leftTitle="title1" rightTitle="title2">
        <ListItem>
          <ItemContainer>
            <div>Left List Item 1</div>
            <div>Right List Item 1</div>
          </ItemContainer>
        </ListItem>
        <ListItem>
          <ItemContainer>
            <div>Left List Item 2</div>
            <div>Right List Item 2</div>
          </ItemContainer>
        </ListItem>
      </ListWithTitles>
    )
  }).add('Integration: ListWithTitles with left title', () => {
    return (
      <ListWithTitles as="ol" leftTitle="title1">
        <ListItem>
          <ItemContainer>
            <div>Left List Item 1</div>
            <div>Right List Item 1</div>
          </ItemContainer>
        </ListItem>
        <ListItem>
          <ItemContainer>
            <div>Left List Item 2</div>
            <div>Right List Item 2</div>
          </ItemContainer>
        </ListItem>
      </ListWithTitles>
    )
  }).add('Integration: ListWithTitles with right title', () => {
    return (
      <ListWithTitles as="ol" rightTitle="title1">
        <ListItem>
          <ItemContainer>
            <div>Left List Item 1</div>
            <div>Right List Item 1</div>
          </ItemContainer>
        </ListItem>
        <ListItem>
          <ItemContainer>
            <div>Left List Item 2</div>
            <div>Right List Item 2</div>
          </ItemContainer>
        </ListItem>
      </ListWithTitles>
    )
  }).add('Integration: ListWithTitles with no titles', () => {
    return (
      <ListWithTitles as="ol">
        <ListItem>
          <ItemContainer>
            <div>Left List Item 1</div>
            <div>Right List Item 1</div>
          </ItemContainer>
        </ListItem>
        <ListItem>
          <ItemContainer>
            <div>Left List Item 2</div>
            <div>Right List Item 2</div>
          </ItemContainer>
        </ListItem>
      </ListWithTitles>
    )
  });
