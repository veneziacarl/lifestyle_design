import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import HabitForm from './HabitForm.jsx';
import TimeTabs from './TimeTabs.jsx';

class HabitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      currentSelectedTimeType: '',
      filteredHabits: []
    };
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
    this.handleHabitDelete = this.handleHabitDelete.bind(this);
    this.handleHabitEdit = this.handleHabitEdit.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleOpenTab = this.handleOpenTab.bind(this);
  }

  handleHabitSubmit (habit) {
    $.ajax({
      url: '/api/v1/habits',
      dataType: 'json',
      type: 'POST',
      data: habit,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(habits) {
        var habitsArray = this.state.habits;
        habitsArray.unshift(habits.habit);
        this.setState({habits: habitsArray});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleHabitDelete (habitInfo) {
    $.ajax({
      url: '/api/v1/habits/' + habitInfo.id,
      method: 'delete',
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(habits) {
        var habitsArray = this.state.habits;
        for(var i = 0; i < habitsArray.length; i++) {
          if(habitsArray[i].id === habits.habit.id) {
             habitsArray.splice(i, 1);
          }
        }
        this.setState({habits: habitsArray});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleHabitEdit (habitInfo) {
    $.ajax({
      url: '/api/v1/habits/' + habitInfo.id,
      method: 'put',
      data: habitInfo,
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(updatedHabit) {
        var habitsArray = this.state.habits;
        for(var i = 0; i < habitsArray.length; i++) {
          var habit = habitsArray[i]
          if(habit.id === updatedHabit.habit.id) {
            [habit.id, habit.title, habit.description, habit.time_type] = [updatedHabit.habit.id, updatedHabit.habit.title, updatedHabit.habit.description, updatedHabit.habit.time_type]
          }
        }
        this.setState({habits: habitsArray});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleOpenTab (tab) {
    this.setState({currentSelectedTimeType: tab});
  }

  loadHabits () {
    $.ajax({
      url: '/api/v1/habits',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(habitInfo) {
        this.setState({habits: habitInfo.habits});
        this.handleOpenTab('daily');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount () {
    this.loadHabits();
  }

  handlePositionChange (habits) {
    this.setState({ habits: habits });
  }

  render () {
    const filteredHabits = this.state.habits.filter(habit => habit.time_type === this.state.currentSelectedTimeType)
    return (
      <div className="habitBox">
        <div>
          <TimeTabs
            filteredHabits={filteredHabits}
            labels={this.state.labels}
            onTabClick={this.handleOpenTab}
            onHabitDelete={this.handleHabitDelete}
            onHabitEdit={this.handleHabitEdit}
            onPositionChange={this.handlePositionChange}
          />
        </div>
        <div>
          <HabitForm onHabitSubmit={this.handleHabitSubmit} />
        </div>
      </div>
    );
  }
};

export default HabitBox;
