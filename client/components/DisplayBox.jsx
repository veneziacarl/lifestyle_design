import React from 'react';
import { RadioButton, RadioButtonGroup, RaisedButton } from 'material-ui';

import HabitForm from './HabitForm.jsx';


class DisplayBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
  }

  handleHabitSubmit (habit) {
    this.props.onHabitSubmit(habit)
  }

  render () {
    return (
      <div className="displayBox">
        <HabitForm onHabitSubmit={this.handleHabitSubmit} />
      </div>
    );
  }

}

export default DisplayBox;
