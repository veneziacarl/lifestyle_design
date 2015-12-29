import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import HabitForm from './HabitForm.jsx';
import TimeTabs from './TimeTabs.jsx';

class HabitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: { daily: [], weekly: [], yearly: [] }
    };
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
    this.handleHabitDelete = this.handleHabitDelete.bind(this);
    this.handleHabitEdit = this.handleHabitEdit.bind(this);
  }


  handleHabitSubmit (habit) {
    $.ajax({
      url: '/api/v1/habits',
      dataType: 'json',
      type: 'POST',
      data: habit,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(habits) {
        var habitsArray = this.state.habits.daily;
        var newHabits = habitsArray.concat(habits.habit);
        debugger;
        this.setState({habits: {daily: newHabits}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleHabitDelete (habit) {
    $.ajax({
      url: '/api/v1/habits/' + habit.id.id,
      method: 'delete',
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(habits) {
        var habitsArray = this.state.habits.daily;
        for(var i = 0; i < habitsArray.length; i++) {
          if(habitsArray[i].id === habit.id.id) {
             habitsArray.splice(i, 1);
          }
        }
        this.setState({habits: {daily: habitsArray}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleHabitEdit (habitDetails) {
    $.ajax({
      url: '/api/v1/habits/' + habitDetails.id,
      method: 'put',
      data: habitDetails,
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(habitInfo) {
        var habitsArray = this.state.habits.daily;
        debugger;
        for(var i = 0; i < habitsArray.length; i++) {
          var habit = habitsArray[i]
          if(habit.id === habitInfo.id) {
            habit.id, habit.title, habit.description, habit.time_type = [habitInfo.id, HabitInfo.title, HabitInfo.description, HabitInfo.time_type]
          }
        }
        this.setState({habits: {daily: habitsArray}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleOpenTab (tab) {
    $.ajax({
      url: '/api/v1/habits',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(habitInfo) {
        this.setState({habits:{daily: habitInfo.habits}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount () {
    this.handleOpenTab('daily');
  }

  render () {
    return (
      <div className="habitBox">
        <div>
          <p>Add New Habit:</p>
          <HabitForm onHabitSubmit={this.handleHabitSubmit} />
        </div>
        <div>
          <TimeTabs
            habits={this.state.habits}
            labels={this.state.labels}
            onTabClick={this.handleOpenTab}
            onHabitDelete={this.handleHabitDelete}
            onHabitEdit={this.handleHabitEdit}>
          </TimeTabs>
        </div>
      </div>
    );
  }
};

export default HabitBox;
