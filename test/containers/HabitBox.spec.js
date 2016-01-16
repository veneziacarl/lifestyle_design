import React from 'react';
import HabitBox from '../../client/components/HabitBox';

describe('(Container) HabitBox', () => {
  const wrapper = shallow(<HabitBox />);

  it('renders as a <div>', () => {
    expect(wrapper.type()).to.eql('div');
  });

  it('has style with height 100%', () => {
    const expectedStyles = {
      height: '100%',
      background: '#333'
    }
    expect(wrapper.prop('style')).to.eql(expectedStyles);
  });
});
