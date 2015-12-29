import React from 'react';

class HabitDelete extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="habitDelete">
        <input type="button" value="delete"></input>
      </div>
    );
  }
}

export default HabitDelete;
