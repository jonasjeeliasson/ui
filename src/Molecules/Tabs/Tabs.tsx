import React, { createContext, useState, useContext, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { Flexbox, Typography, Separator } from '../..';
import NormalizedElements from '../../common/NormalizedElements';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from './useKeyboardNavigation';

const TabContext = createContext<undefined | boolean>(undefined);

type ItemProps = {
  title: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
};

const Item: React.FC<ItemProps> = ({ children }) => {
  const isItemActive = useContext(TabContext);
  assert(
    typeof isItemActive !== 'undefined',
    `Please don't use <Tabs.Item/> outside of <Tabs.Container />`,
  );
  return <div>{isItemActive ? children : null}</div>;
};

const styles = css<{ active: boolean }>`
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

type TitleProps = {
  active: boolean;
  onTitleClick: MouseEventHandler<HTMLButtonElement>;
  index: number;
  setRef: (el: HTMLButtonElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
};
const Title: React.FC<TitleProps> = ({
  active: activeFromProps,
  children,
  onTitleClick,
  onKeyDown,
  index,
  setRef,
}) => {
  const active = activeFromProps;

  return (
    <li role="presentation">
      <Typography type="secondary" weight={active ? 'bold' : 'regular'}>
        <StyledButton
          ref={setRef}
          type="button"
          onClick={onTitleClick}
          onKeyDown={onKeyDown}
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
  padding-inline-start: unset;
  margin-block-start: unset;
  margin-block-end: unset;
  margin-inline-start: unset;
  margin-inline-end: unset;
  list-style: none;
  display: flex;
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  /** @todo check this out */
  margin-bottom: -1px;
`;

type ContainerProps = {
  initialActiveTabId?: number;
  children: React.ReactNode;
};
const isItemElement = (x: any): x is { type: typeof Item; props: ItemProps } =>
  x != null && typeof x === 'object' && Object.hasOwnProperty.call(x, 'type');

const Container: React.FC<ContainerProps> = ({ children, initialActiveTabId = 0 }) => {
  const [active, setActive] = useState(initialActiveTabId);
  const handleTitleClick = (i: number) => () => setActive(i);
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles: React.ReactElement<any>[] = [];
  let contents: React.ReactElement<any> | null = null;
  React.Children.forEach(children, (c, i) => {
    const isActive = i === active;
    if (!isItemElement(c)) {
      assert(false, 'Children type of <Tabs.Container> should be only <Tabs.Item>');
    } else {
      titles.push(
        <Flexbox.Item>
          <Title active={isActive} index={i} onTitleClick={handleTitleClick(i)} onKeyDown={onKeyDown} setRef={setRef(i)}>
            <Typography type="secondary" weight={active === i ? 'bold' : 'regular'}>
              {c.props.title}
            </Typography>
          </Title>
        </Flexbox.Item>,
      );

      if (isActive) {
        contents = (
          <TabContext.Provider value={isActive}>
            <section
              id={`tabs-tabpanel-${i}`}
              role="tabpanel"
              aria-labelledby={`tabs-tab-${i}`}
              hidden={!isActive}
            >
              {c}
            </section>
          </TabContext.Provider>
        );
      }
    }
  });

  return (
    <div>
      <Flexbox.Container direction="row" gutter={2} as={StyledUl} role="tablist">
        {titles}
      </Flexbox.Container>
      <Separator />

      <div>{contents}</div>
    </div>
  );
};

export default { Item, Container };
