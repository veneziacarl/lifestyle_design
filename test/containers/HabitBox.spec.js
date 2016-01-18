import React from 'react';
import {
  describeWithDOM,
  mount,
  spyLifecycle
} from 'enzyme';

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

  it('allows us to set state', () => {
    var schedules =
      [{
        "id":5,"habit":
        {
        "id":5,"title":"Habit 5","description":"Habit Description 5","created_at":"2016-01-18T20:53:45.932Z","updated_at":"2016-01-18T20:53:45.932Z","goal_id":5,"active":true
        },
        "date":"2016-01-18T20:53:45.829Z","status":"do","frequency":"day","repeat":true,"created_at":"2016-01-18T20:53:45Z","updated_at":"2016-01-18T20:53:45Z"
      }]
    const wrapper = mount(<HabitBox />);
    wrapper.setState({ schedules: schedules });
    expect(wrapper.state().schedules.date).to.equal(schedules.date);
    expect(wrapper.state().schedules.habit).to.equal(schedules.habit);
    expect(wrapper.state().schedules.status).to.equal(schedules.status);
    expect(wrapper.state().schedules.frequency).to.equal(schedules.frequency);
    expect(wrapper.state().schedules.repeat).to.equal(schedules.repeat);
  });
});
