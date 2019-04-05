import React from 'react';
import { shallow } from 'enzyme';
import { mockClasses } from 'nordnet-ui-kit';
import { Component as Tab, styles } from './Tab';

const classes = mockClasses(styles);

const defaultProps = {
  classes,
  children: 'label',
  selected: false,
  variant: 'primary',
  index: 0,
  setRef: () => null,
};

const renderComponent = props => shallow(<Tab {...defaultProps} {...props} />);

describe('<Tab />', () => {
  it('should render a li as container', () => {
    const wrapper = renderComponent();
    expect(wrapper.type()).toBe('li');
  });

  it('should give li role presentation', () => {
    const wrapper = renderComponent();
    const actual = wrapper.find('li').props().role;
    expect(actual).toBe('presentation');
  });

  it('should render a button', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should have role as tab', () => {
    const wrapper = renderComponent();
    const actual = wrapper.find('button').props().role;
    expect(actual).toBe('tab');
  });

  it('should have aria-selected set to true', () => {
    const wrapper = renderComponent({ selected: true });
    const actual = wrapper.find('button').props()['aria-selected'];
    expect(actual).toBe(true);
  });

  it('should have aria-selected set to false', () => {
    const wrapper = renderComponent({ selected: false });
    const actual = wrapper.find('button').props()['aria-selected'];
    expect(actual).toBe(false);
  });

  it('should render a id', () => {
    const wrapper = renderComponent({ index: 2 });
    const actual = wrapper.find('button').props().id;
    expect(actual).toBe('tabs-tab-2');
  });

  it('should have tabIndex -1 if not selected', () => {
    const wrapper = renderComponent({ selected: false });
    const actual = wrapper.find('button').props().tabIndex;
    expect(actual).toBe(-1);
  });

  it('should have tabIndex 0 if selected', () => {
    const wrapper = renderComponent({ selected: true });
    const actual = wrapper.find('button').props().tabIndex;
    expect(actual).toBe(0);
  });

  it('should have onClick callback', () => {
    const onClick = jest.fn();
    const wrapper = renderComponent({ onClick, index: 0 });

    wrapper.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledWith(0);
  });
});
