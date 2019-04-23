import React, { useState } from 'react';
import styled from 'styled-components';
import { Flexbox, Typography, Separator, TabTitle } from '../..';
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
  x != null && typeof x === 'object' && Object.hasOwnProperty.call(x, 'type') && x.type === Item;

const Tabs: ContainerComponent = ({ children, initialActiveTabId = 0 }) => {
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
      assert(false, 'There should be only <Tabs.Tab> children inside of <Tabs> component');
    } else {
      titles.push(
        // eslint-disable-next-line react/no-array-index-key
        <Flexbox.Item as="li" role="presentation" key={`tabs-${i}`}>
          <Title
            active={isActive}
            index={i}
            onClick={handleTitleClick(i)}
            onKeyDown={onKeyDown}
            setRef={setRef(i)}
          >
            <Typography type="secondary" weight={active === i ? 'bold' : 'regular'}>
              {c.props.title}
            </Typography>
          </Title>
        </Flexbox.Item>,
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
      <Flexbox.Container direction="row" gutter={4} as={StyledUl} role="tablist">
        {titles}
      </Flexbox.Container>
      <Separator />

      <div>{contents}</div>
    </div>
  );
};
Tabs.displayName = 'Tabs';
Tabs.Tab = Item;

export default Tabs;
