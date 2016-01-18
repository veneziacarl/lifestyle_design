import React from 'react';
import HabitBox from '../../client/components/HabitBox';
import HabitForm from '../../client/components/HabitForm';
import HabitTabs from '../../client/components/HabitTabs';


describe('(Container) HabitBox', () => {
  const wrapper = shallow(<HabitBox />);

  it('renders as a <div>', () => {
    expect(wrapper.type()).to.eql('div');
  });

  it('has style with height 100%', () => {
    const expectedStyles = {
      height: '100%',
      background: '#333'
    };
    expect(wrapper.prop('style')).to.eql(expectedStyles);
  });

  it('renders 1 <HabitForm /> component', () => {
    expect(wrapper.find(HabitForm)).to.have.length(1);
  });

  it('renders 1 <HabitTabs /> component', () => {
    expect(wrapper.find(HabitTabs)).to.have.length(1);
  });
});
