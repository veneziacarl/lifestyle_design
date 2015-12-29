import React from 'react';

class HabitUpdate extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="habitUpdate">
        <input type="button" value="update"></input>
      </div>
    );
  }
}

export default HabitUpdate;
