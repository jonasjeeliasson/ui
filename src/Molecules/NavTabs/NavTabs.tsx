import React, { useContext } from 'react';
// @ts-ignore
import { matchPath, __RouterContext } from 'react-router';
import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Flexbox, Typography, Separator } from '../../index';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from '../Tabs/useKeyboardNavigation';
import { ItemProps, TitleProps } from './NavTabs.types';

const Item: React.FC<ItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

const styles = css<LinkProps & { active: string }>`
  background: none;
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  padding-bottom: ${props => props.theme.spacing.unit(1)}px;
  color: ${props => props.theme.color.text};
  border-bottom: 2px solid
    ${props => (props.active === 'true' ? props.theme.color.borderActive : 'transparent')};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:active {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  ${styles}
`;

const Title = ({ active, children, setRef, to, onKeyDown }: TitleProps) => {
  return (
    <li role="presentation">
      <Typography type="secondary" weight={active ? 'bold' : 'regular'}>
        <div>
          <StyledLink to={to} innerRef={setRef} active={`${active}`} onKeyDown={onKeyDown}>
            {children}
          </StyledLink>
        </div>
      </Typography>
    </li>
  );
};

const StyledUl = styled.ul`
  padding-inline-start: unset;
  margin-block-start: unset;
  margin-block-end: unset;
  margin-inline-start: unset;
  margin-inline-end: unset;
  list-style: none;
  display: flex;
  /** @todo reconsider spacing */
  padding-left: ${p => p.theme.spacing.unit(4)}px;
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
        <Flexbox.Item>
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
      <Flexbox.Container direction="row" gutter={2} as={StyledUl}>
        {titles}
      </Flexbox.Container>
      <Separator />

      <div>{contents}</div>
    </div>
  );
};

export default { Item, Container };
