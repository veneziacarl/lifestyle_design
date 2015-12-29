import React from 'react';

class HabitDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default HabitDetails;


        // {this.props.title}
        // {this.props.description}
        // <div className="status">
        //   {this.props.children}
        // </div>
