import React, { useContext } from 'react';
// @ts-ignore
import { matchPath, __RouterContext } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flexbox, Typography, TabTitle } from '../..';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from '../TabsWithState/useKeyboardNavigation';
import { ItemComponent, ItemProps, TitleComponent, Component } from './TabsNav.types';

const Item: ItemComponent = ({ children }) => {
  return <div>{children}</div>;
};
Item.displayName = 'TabsNav.Item';

const StyledLink = styled(Link)`
  text-decoration: none;
  &:active {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
`;

const Title: TitleComponent = ({ active, children, setRef, to, onKeyDown }) => {
  return (
    <Typography type="secondary" weight={active ? 'bold' : 'regular'}>
      <div>
        <StyledLink to={to} innerRef={setRef} aria-current={active && 'page'} onKeyDown={onKeyDown}>
          <TabTitle active={active}>{children}</TabTitle>
        </StyledLink>
      </div>
    </Typography>
  );
};
Title.displayName = 'TabsNav.Title';

const StyledUl = styled.ul`
  margin-top: 0;
  list-style: none;
  display: flex;
  /** @todo reconsider spacing */
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  /** @todo check this out */
  margin-bottom: -1px;
`;
const isItemElement = (x: any): x is { type: typeof Item; props: ItemProps } =>
  x != null && typeof x === 'object' && Object.hasOwnProperty.call(x, 'type');

const TabsNav: Component = ({ children }) => {
  const { location } = useContext(__RouterContext);
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles: React.ReactNode[] = [];

  React.Children.forEach(children, (c, i) => {
    if (!isItemElement(c)) {
      assert(false, 'Children type of <Tabs.Container> should be only <Tabs.Item>');
    } else {
      const isIndexActive = Boolean(matchPath(location.pathname, c.props.to));

      titles.push(
        <Flexbox.Item as="li" role="presentation">
          <Title active={isIndexActive} setRef={setRef(i)} to={c.props.to} onKeyDown={onKeyDown}>
            {c.props.title}
          </Title>
        </Flexbox.Item>,
      );
    }
  });

  return (
    <Flexbox.Container direction="row" gutter={4} as={StyledUl}>
      {titles}
    </Flexbox.Container>
  );
};
TabsNav.displayName = 'TabsNav';
TabsNav.Tab = Item;

export default TabsNav;
