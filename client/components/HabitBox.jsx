import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import HabitForm from './HabitForm.jsx';
import HabitTabs from './HabitTabs.jsx';


const propTypes = {
  onMount: PropTypes.func.isRequired
};

export class HabitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      currentSelectedTab: '',
      date: new Date
    };
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
    this.handleHabitDelete = this.handleHabitDelete.bind(this);
    this.handleHabitEdit = this.handleHabitEdit.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleOpenTab = this.handleOpenTab.bind(this);
    this.addDays = this.addDays.bind(this);
  }

  addDays (days) {
    var new_date = new Date(this.state.date);
    new_date.setDate(new_date.getDate() + days);
    return new_date;
  }

  createDay (schedule) {
    var date = new Date(schedule.date)
    var day = date.getDay()
    return day
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
    if (tab == 'today') {
      var today_tab = this.state.date.getDay()
      this.setState({ currentSelectedTab: today_tab })
    } else {
      this.setState({ currentSelectedTab: tab });
    };
  }

  loadHabits () {
    $.ajax({
      url: '/api/v1/schedules',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(info) {
        this.setState({ schedules: info.schedules });
        this.handleOpenTab('today');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  onMount () {
  }

  componentDidMount () {
    this.loadHabits();
  }

  handlePositionChange (schedules) {
    this.setState({ schedules: schedules });
  }

  render () {
    const styles = {
      height: '100%',
      background: '#333'
    }
    const filteredSchedules = this.state.schedules.filter(schedule => this.createDay(schedule) === this.state.currentSelectedTab)
    return (
      <div className="habitBox" style={styles}>
        <div>
          <HabitTabs
            filteredSchedules={filteredSchedules}
            labels={this.state.labels}
            onTabClick={this.handleOpenTab}
            onHabitDelete={this.handleHabitDelete}
            onHabitEdit={this.handleHabitEdit}
            onPositionChange={this.handlePositionChange}
            onMount={() => {}}
            addDays={this.addDays}
          />
        </div>
        <div>
          <HabitForm onHabitSubmit={this.handleHabitSubmit} />
        </div>
      </div>
    );
  }
};

HabitTabs.propTypes = propTypes;
export default HabitBox;
