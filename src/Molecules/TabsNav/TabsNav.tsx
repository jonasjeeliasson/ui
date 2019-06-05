import React from 'react';
// @ts-ignore
import { matchPath, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flexbox, TabTitle, List, Box } from '../..';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from '../Tabs/useKeyboardNavigation';
import { ItemComponent, ItemProps, TitleComponent, Component } from './TabsNav.types';

const Item: ItemComponent = ({ children }) => {
  return <div>{children}</div>;
};
Item.displayName = 'TabsNav.Tab';

const StyledLink = styled(Link)`
  text-decoration: none;
  &:active {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
`;

const Title: TitleComponent = ({ active, children, setRef, to, onKeyDown, onClick, size }) => {
  return (
    <StyledLink
      to={to}
      innerRef={setRef}
      aria-current={active && 'page'}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      <TabTitle active={active} size={size}>
        {children}
      </TabTitle>
    </StyledLink>
  );
};
Title.displayName = 'TabsNav.Title';

const StyledUl = styled(List)`
  height: 100%;
`;

const isItemElement = (x: any): x is { type: typeof Item; props: ItemProps } =>
  x != null && typeof x === 'object' && Object.hasOwnProperty.call(x, 'type'); // FIXME: && x.type === Item;

const StyledBox = styled(Box)<{ size: 's' | 'm' }>`
  height: ${p =>
    p.size === 'm' ? `${p.theme.spacing.unit(11)}px` : `${p.theme.spacing.unit(7.5)}px`};
`;
const TabsNav: Component = (withRouter<any>(({ children, location, size = 's' }) => {
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles: React.ReactNode[] = [];

  React.Children.forEach(children, (c, i) => {
    if (!isItemElement(c)) {
      assert(false, 'There should be only <TabsNav.Tab> children inside of <TabsNav> component');
    } else {
      const isIndexActive = Boolean(
        matchPath(location.pathname, { path: c.props.to, exact: Boolean(c.props.exact) }),
      );

      titles.push(
        <Flexbox container item key={c.props.to} alignItems="center">
          <Title
            active={isIndexActive}
            onClick={c.props.onTitleClick}
            setRef={setRef(i)}
            to={c.props.to}
            onKeyDown={onKeyDown}
            size={size}
          >
            {c.props.title}
          </Title>
        </Flexbox>,
      );
    }
  });

  return (
    <StyledBox size={size}>
      <Flexbox container direction="row" gutter={4} as={StyledUl} size={size}>
        {titles}
      </Flexbox>
    </StyledBox>
  );
}) as unknown) as Component;
TabsNav.displayName = 'TabsNav';
TabsNav.Tab = Item;

export default TabsNav;
