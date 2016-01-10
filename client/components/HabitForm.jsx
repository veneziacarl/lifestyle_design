import React from 'react';
import { RadioButton, RadioButtonGroup, RaisedButton } from 'material-ui';

class HabitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: '', time_type: ''};
  }

  handleTitleChange (e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange (e) {
    this.setState({description: e.target.value});
  }

  handleTypeChange (e) {
    this.setState({time_type: e.target.value});
  }

  handleSubmit (e) {
    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var time_type = this.state.time_type.trim();
    if (!title || !description || !time_type) {
      return;
    };
    this.props.onHabitSubmit({title: title, description: description, time_type: time_type});
    this.setState({title: '', description: '', time_type: ''});
  }

  render() {
    return (
      <div className="habitForm small-12 medium-6 large-4 columns">
        <form className="habitForm" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Habit Title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
          <input type="text" placeholder="Habit Description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
          <RadioButtonGroup name="addHabit" onChange={this.handleTypeChange.bind(this)}>
            <RadioButton
              value="daily"
              label="Daily"
              style={{marginBottom:16}}
            />
            <RadioButton
              value="weekly"
              label="Weekly"
              style={{marginBottom:16}}
            />
            <RadioButton
              value="monthly"
              label="Monthly"
              style={{marginBottom:16}}
            />
            <RadioButton
              value="yearly"
              label="Yearly"
              style={{marginBottom:16}}
            />
          </RadioButtonGroup>
          <RaisedButton
            secondary={true}
            label="Add Habit"
            style={{
              height: '30px',
              width: '20px'
            }}
            onClick={this.handleSubmit.bind(this)}
          />
        </form>
      </div>
    );
  }
}

export default HabitForm;
