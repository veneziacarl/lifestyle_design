import React from 'react';
import {
  describeWithDOM,
  mount,
  spyLifecycle
} from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import { TimeTabs } from '../../client/components/TimeTabs';
import HabitBox from '../../client/components/HabitBox';

describe('(Component) TimeTabs', () => {
  describe('with shallow rendering...', () => {
    const props = {
      onMount: sinon.spy(),
      filteredHabits: [],
      habits: []
    }

    const wrapper = shallow(<TimeTabs {...props} />);

    it('renders as a <div> with classes', () => {
      expect(wrapper.type()).to.eql('div');
      expect(wrapper.find('.timetabs')).to.have.length(1);
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
        filteredHabits: [],
        habits: []
      }

      spyLifecycle(TimeTabs);

      mount(<TimeTabs {...props} />);

      expect(
          TimeTabs.prototype.componentDidMount.calledOnce
        ).to.be.true;
      });

    it('calls onMount prop once it mounts', () => {
      const props = {
        onMount: sinon.spy(),
        filteredHabits: [],
        habits: []
      }
      mount(<TimeTabs {...props} />);

      expect(props.onMount.calledOnce).to.be.true;
    });
  });
});
