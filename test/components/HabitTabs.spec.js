import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {
  describeWithDOM,
  mount,
  spyLifecycle
} from 'enzyme';

import { HabitTabs } from '../../client/components/HabitTabs';

describe('(Component) HabitTabs', () => {
  describe('with shallow rendering...', () => {
    const props = {
      onMount: sinon.spy(),
      filteredHabits: [],
      habits: []
    }

    const wrapper = shallow(<HabitTabs {...props} />);

    it('renders as a <div> with classes', () => {
      expect(wrapper.type()).to.eql('div');
      expect(wrapper.find('.habittabs')).to.have.length(1);
      expect(wrapper.find('.small-12')).to.have.length(1);
      expect(wrapper.find('.medium-6')).to.have.length(1);
      expect(wrapper.find('.large-4')).to.have.length(1);
      expect(wrapper.find('.columns')).to.have.length(1);
    });
  });

  describe('lifecycle methods...', () => {
    it('calls componentDidMount', () => {
      const props = {
        onMount: sinon.spy(),
        filteredSchedules: []
      }

      spyLifecycle(HabitTabs);

      mount(<HabitTabs {...props} />);

      expect(
          HabitTabs.prototype.componentDidMount.calledOnce
        ).to.be.true;
      });

    it('calls onMount prop once it mounts', () => {
      const props = {
        onMount: sinon.spy(),
        filteredSchedules: []
      }
      mount(<HabitTabs {...props} />);

      expect(props.onMount.calledOnce).to.be.true;
    });
  });
});
