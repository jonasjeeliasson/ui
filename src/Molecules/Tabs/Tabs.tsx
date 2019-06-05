import React, { useState } from 'react';
import styled from 'styled-components';
import { Flexbox, Typography, Separator, TabTitle, List } from '../..';
import NormalizedElements from '../../common/NormalizedElements/index';
import { assert } from '../../common/utils';
import { useKeyboardNavigation } from './useKeyboardNavigation';

import { ContainerComponent, ItemComponent, TitleComponent, ItemProps } from './Tabs.types';

const Item: ItemComponent = ({ children }) => {
  return <>{children}</>;
};
Item.displayName = 'Tabs.Content';

const StyledButton = styled(NormalizedElements.Button)`
  background: none;
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const Title: TitleComponent = ({
  active: activeFromProps,
  children,
  onClick,
  onKeyDown,
  index,
  setRef,
}) => {
  const active = activeFromProps;

  return (
    <Typography type="secondary" weight={active ? 'bold' : 'regular'}>
      <StyledButton
        ref={setRef}
        type="button"
        onClick={onClick}
        onKeyDown={onKeyDown}
        aria-selected={active}
        role="tab"
        id={`tabs-tab-${index}`}
        tabIndex={active ? 0 : -1}
      >
        <TabTitle active={active}>{children}</TabTitle>
      </StyledButton>
    </Typography>
  );
};
Title.displayName = 'Tabs.Title';

const StyledUl = styled(List)`
  /** @todo check this out */
  margin-bottom: -1px;
`;

const isItemElement = (x: any): x is { type: typeof Item; props: ItemProps } =>
  x != null && typeof x === 'object' && Object.hasOwnProperty.call(x, 'type'); // FIXME: && x.type === Item;

const Tabs: ContainerComponent = ({
  children,
  initialActiveTabIndex = 0,
  activeTabIndex,
  className,
}) => {
  // eslint-disable-next-line prefer-const
  let [active, setActive] = useState(initialActiveTabIndex);
  const isControlled = typeof activeTabIndex !== 'undefined';
  if (isControlled) active = activeTabIndex!;
  const handleTitleClick = (i: number, handler?: React.MouseEventHandler) => (
    e: React.MouseEvent,
  ) => {
    if (handler) handler(e);
    if (!isControlled) setActive(i);
  };
  const { setRef, onKeyDown } = useKeyboardNavigation({
    itemsLength: React.Children.count(children),
  });
  const titles: React.ReactElement<any>[] = [];
  let contents: React.ReactElement<any> | null = null;

  React.Children.forEach(children, (c, i) => {
    const isActive = i === active;

    if (!isItemElement(c)) {
      assert(false, 'There should be only <Tabs.Tab> children inside of <Tabs> component');
    } else {
      titles.push(
        // eslint-disable-next-line react/no-array-index-key
        <Flexbox item as="li" role="presentation" key={`tabs-${i}`}>
          <Title
            active={isActive}
            index={i}
            onClick={handleTitleClick(i, c.props.onTitleClick)}
            onKeyDown={onKeyDown}
            setRef={setRef(i)}
          >
            <Typography as="div" type="secondary" weight={active === i ? 'bold' : 'regular'}>
              {c.props.title}
            </Typography>
          </Title>
        </Flexbox>,
      );

      if (isActive) {
        contents = (
          <section
            id={`tabs-tabpanel-${i}`}
            role="tabpanel"
            aria-labelledby={`tabs-tab-${i}`}
            hidden={!isActive}
          >
            {c}
          </section>
        );
      }
    }
  });

  return (
    <div>
      <Flexbox
        container
        direction="row"
        gutter={4}
        as={StyledUl}
        role="tablist"
        className={className}
      >
        {titles}
      </Flexbox>
      <Separator />

      <div>{contents}</div>
    </div>
  );
};
Tabs.displayName = 'Tabs';
Tabs.Tab = Item;

export default Tabs;
