import React, { createContext, useState, useContext } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Flexbox, Typography } from '../..';
import NormalizedElements from '../../common/NormalizedElements';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from './useKeyboardNavigation';

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

const StyledButton = styled(NormalizedElements.Button)`
  ${styles}
`;

const Title = ({ active: activeFromProps, children, onTitleClick, index, setRef }) => {
  const active = activeFromProps;

  return (
    <li role="presentation">
      <Typography type="secondary" weight={active ? 'bold' : 'regular'}>
        <StyledButton
          ref={setRef}
          type="button"
          onClick={onTitleClick}
          aria-selected={active}
          role="tab"
          id={`tabs-tab-${index}`}
          tabIndex={active ? 0 : -1}
          active={active}
        >
          {children}
        </StyledButton>
      </Typography>
    </li>
  );
};

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  /** @todo check this out */
  margin-bottom: -1px;
  padding: ${props => (props.padding ? `0 ${props.padding}px` : 0)};
`;
const Container: React.FC = ({ children, initialActiveTabId = 0 }) => {
  const [active, setActive] = useState(initialActiveTabId);
  const handleTitleClick = i => () => setActive(i);
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  return (
    <div onKeyDown={onKeyDown}>
      <Flexbox.Container direction="row" gutter={2} as={StyledUl}>
        {React.Children.map(children, (c: any, i) => {
          if (c.type !== Item) {
            return null;
          }

          return (
            <Flexbox.Item>
              <Title
                active={active === i}
                index={i}
                onTitleClick={handleTitleClick(i)}
                setRef={setRef(i)}
                to={console.log({ c }) || c.props.to}
              >
                {c.props.title}
              </Title>
            </Flexbox.Item>
          );
        })}
      </Flexbox.Container>

      <div>
        {React.Children.map(children, (c, i) => {
          assert(c.type === Item, 'Children type of <Tabs.Container> should be only <Tabs.Item>');
          const childrenIsActive = active === i;
          return (
            <TabContext.Provider value={{ active: childrenIsActive }}>
              <section
                id={`tabs-tabpanel-${i}`}
                role="tabpanel"
                aria-labelledby={`tabs-tab-${i}`}
                hidden={!childrenIsActive}
              >
                {c}
              </section>
            </TabContext.Provider>
          );
        })}
      </div>
    </div>
  );
};

export default { Item, Container };
