import React from 'react';

class HabitLabelRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div>Habits</div>
        <div>{this.props.labels}</div>
      </div>
    );
  }
}
export default HabitLabelRow;
