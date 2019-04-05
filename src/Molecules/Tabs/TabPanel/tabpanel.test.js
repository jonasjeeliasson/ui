import React from 'react';
import { shallow } from 'enzyme';
import { mockClasses } from 'nordnet-ui-kit';
import { Component as Tabpanel, styles } from './tabpanel';

const classes = mockClasses(styles);

const defaultProps = {
  classes,
  children: 'label',
  selected: false,
  index: 0,
};

const renderComponent = props => shallow(<Tabpanel {...defaultProps} {...props} />);

describe('<Tabpanel />', () => {
  it('should render section as container', () => {
    const wrapper = renderComponent();
    const actual = wrapper.type();
    const expected = 'section';

    expect(actual).toBe(expected);
  });

  it('should role tabpanel', () => {
    const wrapper = renderComponent({ index: 0 });
    const actual = wrapper.props().role;
    const expected = 'tabpanel';

    expect(actual).toBe(expected);
  });

  it('should render a default id', () => {
    const wrapper = renderComponent({ index: 3 });
    const actual = wrapper.props().id;
    const expected = 'tabs-tabpanel-3';

    expect(actual).toBe(expected);
  });

  it('should have attribute aria-labelledby', () => {
    const wrapper = renderComponent({ index: 2 });
    const actual = wrapper.props()['aria-labelledby'];
    const expected = 'tabs-tab-2';

    expect(actual).toBe(expected);
  });

  it('should have hidden attribute', () => {
    const wrapper = renderComponent({ index: 2, selected: false });
    const actual = wrapper.props().hidden;
    const expected = true;

    expect(actual).toBe(expected);
  });

  it('should not have hidden attribute', () => {
    const wrapper = renderComponent({ index: 2, selected: true });
    const actual = wrapper.props().hidden;
    const expected = false;

    expect(actual).toBe(expected);
  });

  it('should render content', () => {
    const wrapper = renderComponent({ index: 1, children: 'test content' });
    const actual = wrapper.childAt(0).text();
    const expected = 'test content';

    expect(actual).toBe(expected);
  });
});
