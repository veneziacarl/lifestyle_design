import React from 'react';
import { RadioButton, RadioButtonGroup, RaisedButton, FlatButton, Dialog, Checkbox, Toggle, SelectField, MenuItem } from 'material-ui';

export class HabitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      dates: [],
      frequency: 'day',
      status: 'do',
      repeat: true,
      goal: 'choose the related goal',
      open: false
    };
  }

  handleTitleChange (e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange (e) {
    this.setState({description: e.target.value});
  }

  handleGoalChange (e) {
    this.setState({goal: e.target.innerHTML});
  }

  handleDateChange (e) {
    var dates = this.state.dates;
    if (dates.length > 0) {
      for(var i = 0; i < dates.length; i++) {
        var date = dates[i]
        if((new Date(date)).getDate() == (new Date(e.target.value)).getDate()) {
          dates.splice(i, 1);
        }
      }
    }
    // the `false` used here for the target's react internal component means that the toggle is true
    if (e.target._reactInternalComponent._currentElement.props.switched == false) {
      dates.push(e.target.value);
    }
    this.setState({dates: dates});
  }

  handleRepeat (e) {
    this.setState({repeat: e.target.checked})
  }

  handleSubmit (e) {
    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var dates = this.state.dates;
    var frequency = this.state.frequency;
    var status = this.state.status;
    var repeat = this.state.repeat;
    var goal = this.state.goal.trim();
    if (title == "" || dates.length == 0 || goal == "" || goal == "choose the related goal") {
      alert("Title, goal, and schedule are required as input");
      return;
    }
    for(var i = 0; i < dates.length; i++) {
      this.props.onHabitSubmit({title: title, description: description, date: dates[i], frequency: frequency, status: status, repeat: repeat, goal: goal});
    }
    this.setState({title: '', description: '', dates: [], status: 'do', repeat: true, goal: 'choose the related goal'});
    this.handleClose();
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  renderDayOption (label, day) {
    return (
      <Toggle
        value={this.props.findDayInWeek(day)}
        label={label}
        style={{marginBottom:16}}
        onToggle={this.handleDateChange.bind(this)}
      />
    );
  }


  render() {
    const goals = this.props.goals.map ( (goal, i) => {
      return (
        <MenuItem value={goal.title} primaryText={goal.title} key={i} />
      );
    })
    const actions = [
        <input type="text" name="title" placeholder="Habit Title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />,
        <input type="text" name="description" placeholder="Habit Description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />,
        <SelectField id="goal" value={this.state.goal} onChange={this.handleGoalChange.bind(this)}>
          <MenuItem value="choose the related goal" primaryText="choose the related goal"/>
          {goals}
        </SelectField>,
        <div>
          {this.renderDayOption('M', 1)}
          {this.renderDayOption('T', 2)}
          {this.renderDayOption('W', 3)}
          {this.renderDayOption('Th', 4)}
          {this.renderDayOption('F', 5)}
          {this.renderDayOption('Sa', 6)}
          {this.renderDayOption('S', 7)}
        </div>,
        <Checkbox
          name="repeat"
          value="repeat"
          label="Repeat This Schedule Weekly?"
          defaultChecked={true}
          onCheck={this.handleRepeat.bind(this)}
        />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Add Habit"
        primary={true}
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
