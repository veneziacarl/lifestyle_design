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
      currentSelectedTab: ((new Date).getDay() - 1),
      date: new Date
    };
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
    this.handleHabitDelete = this.handleHabitDelete.bind(this);
    this.handleHabitEdit = this.handleHabitEdit.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleOpenTab = this.handleOpenTab.bind(this);
    this.addDays = this.addDays.bind(this);
    this.findDayInWeek = this.findDayInWeek.bind(this);
  }

  addDays (date, days) {
    var new_date = new Date(date);
    new_date.setDate(new_date.getDate() + days);
    return new_date;
  }

  createDay (schedule) {
    var date = new Date(schedule.date);
    var day = date.getDay();
    return day;
  }

  findDayInWeek (day) {
    var today = new Date(this.state.date);
    if (day >= today.getDay()) {
      var monday = today.setDate(today.getDate() - today.getDay() + 1);
      var foundDay = this.addDays(monday, (day - 1));
      return foundDay.toString();
    } else if (day < today.getDay()) {
      var monday = today.setDate(today.getDate() - today.getDay() + 1);
      var foundDay = this.addDays(monday, (day + 6));
      return foundDay.toString();
    }
  }

  handleHabitSubmit (schedules) {
    $.ajax({
      url: '/api/v1/schedules',
      dataType: 'json',
      type: 'POST',
      data: schedules,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(info) {
        var schedulesArray = this.state.schedules;
        schedulesArray.unshift(info.schedule);
        this.setState({schedules: schedulesArray});
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
    var tabInt = parseInt(tab)
    this.setState({ currentSelectedTab: tabInt });
  }

  setTodayTab () {
    var today_tab = this.state.date.getDay()
    this.handleOpenTab(today_tab)
  }

  loadHabits () {
    $.ajax({
      url: '/api/v1/schedules',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(info) {
        this.setState({ schedules: info.schedules });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  onMount () {
  }

  componentDidMount () {
    this.setTodayTab();
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
            onTabClick={this.handleOpenTab}
            onHabitDelete={this.handleHabitDelete}
            onHabitEdit={this.handleHabitEdit}
            onPositionChange={this.handlePositionChange}
            onMount={() => {}}
            addDays={this.addDays}
            initialSelectedIndex={this.state.currentSelectedTab}
          />
        </div>
        <div>
          <HabitForm onHabitSubmit={this.handleHabitSubmit} findDayInWeek={this.findDayInWeek} />
        </div>
      </div>
    );
  }
};

HabitTabs.propTypes = propTypes;
export default HabitBox;
