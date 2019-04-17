import React, { useContext } from 'react';
// @ts-ignore
import { matchPath, __RouterContext } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flexbox, Typography, Separator, TabTitle } from '../..';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from '../StatefulTabs/useKeyboardNavigation';
import { ItemProps, TitleProps } from './NavTabs.types';

const Item: React.FC<ItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

const StyledLink = styled(Link)`
  text-decoration: none;
  &:active {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
`;

const Title = ({ active, children, setRef, to, onKeyDown }: TitleProps) => {
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

const Container: React.FC = ({ children }) => {
  const { location } = useContext(__RouterContext);
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles: React.ReactNode[] = [];
  const contents: React.ReactNode[] = [];

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

      if (isIndexActive) contents.push(<section>{c}</section>);
    }
  });

  return (
    <div>
      <Flexbox.Container direction="row" gutter={4} as={StyledUl}>
        {titles}
      </Flexbox.Container>
      <Separator />

      <div>{contents}</div>
    </div>
  );
};

export default { Item, Container };
