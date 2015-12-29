import React from 'react';
import HabitRow from './HabitRow.jsx';


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
