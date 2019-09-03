import React from 'react';
// @ts-ignore
import { matchPath, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flexbox, Typography, TabTitle } from '../..';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from '../Tabs/useKeyboardNavigation';
import { ItemComponent, ItemProps, TitleComponent, Component } from './TabsNav.types';

const Item: ItemComponent = ({ children }) => {
  return <div>{children}</div>;
};
Item.displayName = 'TabsNav.Tab';

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
`;

const Title: TitleComponent = ({ active, children, setRef, to, onKeyDown, onClick, height }) => {
  return (
    <Typography type="primary" weight={active ? 'bold' : 'regular'}>
      <StyledLink
        to={to}
        innerRef={setRef}
        aria-current={active && 'page'}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        <TabTitle active={active} height={height}>
          {children}
        </TabTitle>
      </StyledLink>
    </Typography>
  );
};
Title.displayName = 'TabsNav.Title';

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
`;

const isItemOrUndefined = (x: any): x is { type: typeof Item; props: ItemProps } => {
  if (x == null || typeof x === 'undefined') {
    return true;
  }

  return typeof x === 'object' && Object.hasOwnProperty.call(x, 'type'); // FIXME: && x.type === Item;
};

// TODO: fix ts issue with height prop
// @ts-ignore
const TabsNav: Component = (withRouter(({ children, location, height = 11, className }) => {
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles: React.ReactNode[] = [];

  React.Children.forEach(children, (c, i) => {
    if (!isItemOrUndefined(c)) {
      assert(false, 'There should be only <TabsNav.Tab> children inside of <TabsNav> component');
    } else if (c) {
      const isIndexActive = Boolean(
        matchPath(location.pathname, { path: c.props.to, exact: Boolean(c.props.exact) }),
      );

      titles.push(
        <Flexbox item as="li" key={c.props.to}>
          <Title
            active={isIndexActive}
            onClick={c.props.onTitleClick}
            setRef={setRef(i)}
            to={c.props.to}
            onKeyDown={onKeyDown}
            height={height}
            className={c.props.className}
          >
            {c.props.title}
          </Title>
        </Flexbox>,
      );
    }
  });

  return (
    <Flexbox
      className={className}
      container
      direction="row"
      gutter={4}
      as={StyledUl}
      sm={{ gutter: 8 }}
    >
      {titles}
    </Flexbox>
  );
}) as unknown) as Component;

TabsNav.displayName = 'TabsNav';
TabsNav.Tab = Item;

export default TabsNav;
