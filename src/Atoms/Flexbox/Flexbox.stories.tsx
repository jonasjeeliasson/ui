import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Flexbox } from '../..';

const StyledContent = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
  background-color: #eee;
  height: 100%;
`;
const Content = ({ children }: any) => <StyledContent>{children}</StyledContent>;

storiesOf('Atoms | Flexbox', module)
  .add('Default', () => (
    <Flexbox container>
      <Flexbox item>
        <Content>Col 1</Content>
      </Flexbox>
      <Flexbox item>
        <Content>Col 2</Content>
      </Flexbox>
      <Flexbox item>
        <Content>Col 3</Content>
      </Flexbox>
    </Flexbox>
  ))
  .add('Column sized flexboxes', () => (
    <Flexbox container>
      <Flexbox item size={3}>
        <Content>Col 1</Content>
      </Flexbox>
      <Flexbox item size={6}>
        <Content>Col 2</Content>
      </Flexbox>
      <Flexbox item size={3}>
        <Content>Col 3</Content>
      </Flexbox>
    </Flexbox>
  ))
  .add('Flexbox with custom gutter', () => (
    <Flexbox container gutter={5}>
      <Flexbox item size={6}>
        <Content>Col 1</Content>
      </Flexbox>
      <Flexbox item size={6}>
        <Content>Col 2</Content>
      </Flexbox>
    </Flexbox>
  ))
  .add('Flexbox with direction: column', () => (
    <Flexbox container direction="column">
      <Flexbox item order={2}>
        <Content>Col 1</Content>
      </Flexbox>
      <Flexbox item order={1}>
        <Content>Col 2</Content>
      </Flexbox>
      <Flexbox item order={3}>
        <Content>Col 3</Content>
      </Flexbox>
    </Flexbox>
  ))
  .add('Flexbox with conditionally hidden flex item', () => {
    const showFirstItem = false;
    return (
      <Flexbox container>
        {showFirstItem && (
          <Flexbox item order={2}>
            <Content>Col 1</Content>
          </Flexbox>
        )}
        <Flexbox item order={1}>
          <Content>Col 2</Content>
        </Flexbox>
      </Flexbox>
    );
  })
  .add('Flexbox with conditionally visible flex item', () => {
    const showFirstItem = true;
    return (
      <Flexbox container>
        {showFirstItem && (
          <Flexbox item order={2}>
            <Content>Col 1</Content>
          </Flexbox>
        )}
        <Flexbox item order={1}>
          <Content>Col 2</Content>
        </Flexbox>
      </Flexbox>
    );
  })
  .add('Flexbox container item', () => {
    return (
      <Flexbox container gutter={5}>
        <Flexbox container item direction="column" gutter={5}>
          <Flexbox item>
            <Content>First element here</Content>
          </Flexbox>
          <Flexbox item>
            <Content>Second element here</Content>
          </Flexbox>
        </Flexbox>
        <Flexbox item>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus neque in venenatis
            faucibus. Fusce vitae maximus diam. Ut placerat lacus id porttitor tristique. Mauris in
            neque tempus, venenatis metus vitae, pellentesque massa. Etiam blandit lacus diam,
            dignissim posuere massa semper maximus. In pretium commodo nisl sed ultrices. Duis
            gravida diam ac nisl sodales mollis. Quisque iaculis semper mi, eu interdum elit
            molestie quis. Vivamus rutrum cursus interdum. Suspendisse vehicula quam mi, a efficitur
            ante egestas eget.
          </Content>
        </Flexbox>
      </Flexbox>
    );
  })
  .add('Flexbox depending on screen size', () => {
    return (
      <Flexbox container gutter={0} direction="column" md={{ gutter: 10, direction: 'row' }}>
        <Flexbox item>
          <Content>First element here</Content>
        </Flexbox>
        <Flexbox item>
          <Content>Second element here</Content>
        </Flexbox>
        <Flexbox item>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus neque in venenatis
            faucibus. Fusce vitae maximus diam. Ut placerat lacus id porttitor tristique. Mauris in
            neque tempus, venenatis metus vitae, pellentesque massa. Etiam blandit lacus diam,
            dignissim posuere massa semper maximus. In pretium commodo nisl sed ultrices. Duis
            gravida diam ac nisl sodales mollis. Quisque iaculis semper mi, eu interdum elit
            molestie quis. Vivamus rutrum cursus interdum. Suspendisse vehicula quam mi, a efficitur
            ante egestas eget.
          </Content>
        </Flexbox>
      </Flexbox>
    );
  });
