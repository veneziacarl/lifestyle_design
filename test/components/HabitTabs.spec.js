import React from 'react';
import {
  describeWithDOM,
  mount,
  spyLifecycle
} from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import TimeTabs from '../../client/components/TimeTabs';
import HabitBox from '../../client/components/HabitBox';

describe('(Component) TimeTabs', () => {
  describe('with shallow rendering...', () => {
    const props = {
      onMount: () => sinon.spy(),
      filteredHabits: [],
      habits: []
    }

    const wrapper = shallow(<TimeTabs {...props} />);

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

  describe('lifecycle methods...', () => {
    const props = {
      onMount: () => sinon.spy(),
      filteredHabits: [],
      habits: []
    }

    it('calls componentDidMount', () => {
      spyLifecycle(TimeTabs);

      mount(<TimeTabs {...props} />);

      expect(
          TimeTabs.prototype.componentDidMount.calledOnce
        ).to.be.true;
      });

    it('calls onMount prop once it mounts', () => {
      mount(<TimeTabs {...props} />);

      expect(props.onMount.calledOnce).to.be.true;
    });
  });
});
