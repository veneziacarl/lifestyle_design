import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {
  describeWithDOM,
  mount,
  spyLifecycle
} from 'enzyme';

import { HabitList } from '../../client/components/HabitList';
import { HabitCard } from '../../client/components/HabitTabs';

describe('(Component) HabitTabs', () => {
  describe('with shallow rendering...', () => {
    const props = {
      onMount: sinon.spy(),
      filteredSchedules: [{
        "id":5,"habit":{
          "id":5,"title":"Habit 5","description":"Habit Description 5","created_at":"2016-01-18T20:53:45.932Z","updated_at":"2016-01-18T20:53:45.932Z","goal_id":5,"active":true
        },
        "date":"2016-01-18T20:53:45.829Z","status":"do","frequency":"day","repeat":true,"created_at":"2016-01-18T20:53:45Z","updated_at":"2016-01-18T20:53:45Z"
      }],
      moveHabit: () => {},
      handleDelete: () => {},
      handleEdit: () => {}
    }

    const wrapper = shallow(<HabitList {...props} />);

    it('renders as a <div> with classes and styling', () => {
      const expectedStyles = {
        height: '100%',
        background: '#333'
      };

      expect(wrapper.type()).to.eql('div');
      expect(wrapper.prop('style')).to.eql(expectedStyles);
    });

    it('renders 1 <Card /> component for each filteredSchedule prop', () => {
      expect(wrapper.find('div').children()).to.have.length(1);
    });
  });
  //
  // describe('lifecycle methods...', () => {
  //   it('calls componentDidMount', () => {
  //     const props = {
  //       onMount: sinon.spy(),
  //       filteredSchedules: [{
  //         "id":5,"habit":{
  //           "id":5,"title":"Habit 5","description":"Habit Description 5","created_at":"2016-01-18T20:53:45.932Z","updated_at":"2016-01-18T20:53:45.932Z","goal_id":5,"active":true
  //         },
  //         "date":"2016-01-18T20:53:45.829Z","status":"do","frequency":"day","repeat":true,"created_at":"2016-01-18T20:53:45Z","updated_at":"2016-01-18T20:53:45Z"
  //       }]
  //     }
  //
  //     spyLifecycle(HabitList);
  //
  //     mount(<HabitList {...props} />);
  //
  //     expect(
  //       HabitList.prototype.componentDidMount.calledOnce
  //     ).to.be.true;
  //   });
  //
  //   it('calls onMount prop once it mounts', () => {
  //     const props = {
  //       onMount: sinon.spy(),
  //       filteredSchedules: [{
  //         "id":5,"habit":{
  //           "id":5,"title":"Habit 5","description":"Habit Description 5","created_at":"2016-01-18T20:53:45.932Z","updated_at":"2016-01-18T20:53:45.932Z","goal_id":5,"active":true
  //         },
  //         "date":"2016-01-18T20:53:45.829Z","status":"do","frequency":"day","repeat":true,"created_at":"2016-01-18T20:53:45Z","updated_at":"2016-01-18T20:53:45Z"
  //       }]
  //     }
  //     mount(<HabitList {...props} />);
  //
  //     expect(props.onMount.calledOnce).to.be.true;
  //   });
  // });
});
