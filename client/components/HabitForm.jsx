import React from 'react';
import { RadioButton, RadioButtonGroup, RaisedButton, FlatButton, Dialog } from 'material-ui';

export class HabitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      time_type: '',
      open: false
    };
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
    this.setState({title: '', description: ''});
    this.handleClose()
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  render() {
    const actions = [
        <input type="text" placeholder="Habit Title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />,
        <input type="text" placeholder="Habit Description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />,
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
        </RadioButtonGroup>,
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Add Habit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit.bind(this)}
      />
    ];

    return (
      <div className="habitForm small-12 medium-6 large-4 columns">
        <RaisedButton label="Create New" onTouchTap={this.handleOpen.bind(this)} />
        <Dialog
          title="Create New Habit Or Goal"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <p>This is filler text in the dialog popover</p>
        </Dialog>
      </div>
    );
  }
}

export default HabitForm;
