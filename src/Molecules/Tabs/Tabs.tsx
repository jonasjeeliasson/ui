import React, { Component, useState } from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import Tab from '../../Atoms/Tab';
import TabPanel from '../../Atoms/TabPanel';
import { useKeyboardNavigation } from './KeyboardNavigation';
import Separator from '../../Atoms/Separator';

type Props = {
  onChange?: (index: number) => void;
  items: { content: React.ReactNode, name: React.ReactText }[];
  renderTab?: (props: any) => React.ReactNode;
  renderTabpanel?: (props: any) => React.ReactNode;

}

const TabsList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  margin-bottom: -1px;
  padding: 0;
`

const Tabs: React.FC<Props> = ({ items, onChange: onChangeFromProps = (_: number) => null, renderTab = props => <Tab {...props} />, renderTabpanel = props => <TabPanel {...props} /> }) => {
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
      >
        {items.map((item, index) =>
          renderTab({
            children: item.name,
            selected: selected === index,
            index,
            key: item.name,
            onClick: onChange,
            setRef: setRef(index),
          }),
        )}
      </TabsList>
      <Separator />
      {items.map((item, index) => 
        renderTabpanel({
          children: item.content,
          selected: selected === index,
          key: item.name,
          index,
        }),
      )}
  </>
  );
}

export { Tabs };
