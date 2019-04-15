import React, { createContext, useState, useContext } from 'react';
import { Route, matchPath, __RouterContext } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Flexbox, Typography } from '../../index';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from '../Tabs/useKeyboardNavigation';

const TabContext = createContext(undefined);
const Item: React.FC = ({ children, title }) => {
  const context = useContext(TabContext);
  assert(
    typeof context !== 'undefined',
    `Please don't use <Tabs.Item/> outside of <Tabs.Container />`,
  );
  const { active } = context;
  return <div>{active ? children : null}</div>;
};

const styles = css`
  background: none;
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  padding-bottom: ${props => props.theme.spacing.unit(1)}px;
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

const Title = ({ active, children, index, setRef, to }) => {
  return (
    <li role="presentation">
      <Typography type="secondary" weight={active ? 'bold' : 'regular'}>
        <div>
          <StyledLink
            to={to}
            role="tab"
            tabIndex={active ? 0 : -1}
            innerRef={setRef}
            active={active}
          >
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
const Container: React.FC = ({ children }) => {
  const { location } = useContext(__RouterContext);
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles = [];
  const contents = [];

  React.Children.forEach(children, (c, i) => {
    assert(c.type === Item, 'Children type of <Tabs.Container> should be only <Tabs.Item>');
    const isIndexActive = Boolean(matchPath(location.pathname, c.props.to));

    titles.push(
      <Flexbox.Item>
        <Title active={isIndexActive} index={i} setRef={setRef(i)} to={c.props.to}>
          {c.props.title}
        </Title>
      </Flexbox.Item>,
    );

    if (isIndexActive)
      contents.push(
        <TabContext.Provider value={{ active: isIndexActive }}>
          <section id={`tabs-tabpanel-${i}`}>{c}</section>
        </TabContext.Provider>,
      );
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
