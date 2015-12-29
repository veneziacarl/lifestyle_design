import React from 'react';
import HabitDetails from './HabitDetails.jsx';
import HabitRow from './HabitRow.jsx';
import HabitLabelRow from './HabitLabelRow.jsx';


class HabitList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HabitRow habits={this.props.habits} />
      </div>
    );
  }
}

export default HabitList;
