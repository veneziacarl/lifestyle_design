import React from 'react';

class HabitDayStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {complete: false, skip: false};
  }

  handleClick (event) {
    this.setState({complete: !this.state.complete });
  }

  render () {
    var symbol = this.state.completed ? 'check' : 'X';
    return (
      <a type="button" className="secondary button" onClick={this.handleClick} >{symbol}</a>
    );
  }
}

export default HabitDayStatus;
