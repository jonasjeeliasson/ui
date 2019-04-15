import React, { createContext, useContext, ReactNode, ReactChildren } from 'react';
import { matchPath, __RouterContext } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Flexbox, Typography } from '../../index';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from '../Tabs/useKeyboardNavigation';

type ItemProps = {
  children: ReactChildren;
  to: string;
  title: ReactNode;
};
const Item: React.FC<ItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

const styles = css<TitleProps>`
  background: none;
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  padding-bottom: ${props => props.theme.spacing.unit(1)}px;
  color: ${props => props.theme.color.text};
  border-bottom: 2px solid
    ${props => (props.active ? props.theme.color.borderActive : 'transparent')};
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

type TitleProps = {
  active: boolean;
  children: React.ReactChildren;
  setRef: (ref: HTMLElement) => void;
  to: string;
};

const Title = ({ active, children, setRef, to }: TitleProps) => {
  return (
    <li role="presentation">
      <Typography type="secondary" weight={active ? 'bold' : 'regular'}>
        <div>
          <StyledLink to={to} role="tab" innerRef={setRef} active={active}>
            {children}
          </StyledLink>
        </div>
      </Typography>
    </li>
  );
};

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  /** @todo check this out */
  margin-bottom: -1px;
`;
const isItemElement = (x: any): x is { type: typeof Item; props: ItemProps } =>
  x != null && typeof x === 'object' && x.hasOwnProperty('type');

const Container: React.FC = ({ children }) => {
  const { location } = useContext(__RouterContext);
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles: ReactNode[] = [];
  const contents: ReactNode[] = [];

  React.Children.forEach(children, (c, i) => {
    if (!isItemElement(c)) {
      assert(false, 'Children type of <Tabs.Container> should be only <Tabs.Item>');
    } else {
      const isIndexActive = Boolean(matchPath(location.pathname, c.props.to));

      titles.push(
        <Flexbox.Item>
          <Title active={isIndexActive} index={i} setRef={setRef(i)} to={c.props.to}>
            {c.props.title}
          </Title>
        </Flexbox.Item>,
      );

      if (isIndexActive) contents.push(<section>{c}</section>);
    }
  });

  return (
    <div onKeyDown={onKeyDown}>
      <Flexbox.Container direction="row" gutter={2} as={StyledUl}>
        {titles}
      </Flexbox.Container>

      <div>{contents}</div>
    </div>
  );
};

export default { Item, Container };
