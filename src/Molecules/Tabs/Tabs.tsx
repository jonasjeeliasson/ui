import React, { Component, useState } from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import Tab from './Tab';
import TabPanel from './TabPanel';
import { useKeyboardNavigation } from './KeyboardNavigation';
import Separator from '../../Atoms/Separator';

type Props = {
  onChange?: (index: number) => void;
  items: { content: React.ReactNode, name: React.ReactText }[];
  padding?: number;
}

const TabsList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  margin-bottom: -1px;
  padding: ${props => props.padding ? `0 ${props.padding}px` : 0};
`

const Tabs: React.FC<Props> = ({ items, padding, onChange: onChangeFromProps = (_: number) => null }) => {
  const defaultSelected = items.findIndex(R.propEq('defaultSelected', true));
  const [selected, setSelected] = useState(defaultSelected === -1 ? 0 : defaultSelected);
  const onChange = (index: number) => {
    onChangeFromProps(index);
    setSelected(index)
  };
  const { setRef, onKeyDown } = useKeyboardNavigation({ itemsLength: items.length })

  return (
    <>
      <TabsList
        role="tablist"
        onKeyDown={onKeyDown}
        padding={padding}
      >
        {items.map((item, index) =>
          <Tab selected={selected === index} index={index} key={item.name} onClick={onChange} setRef={setRef(index)}>
            {item.name}
          </Tab>
        )}
      </TabsList>
      <Separator />
      {items.map((item, index) => 
      <TabPanel selected={selected === index} key={item.name} index={index}>{item.content}</TabPanel>
      )}
  </>
  );
}

export { Tabs };
