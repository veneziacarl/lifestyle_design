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
      date: new Date,
      goals: []
    };
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
    this.handleScheduleDelete = this.handleScheduleDelete.bind(this);
    this.handleScheduleUpdate = this.handleScheduleUpdate.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleScheduleComplete = this.handleScheduleComplete.bind(this);
    this.handleScheduleMiss = this.handleScheduleMiss.bind(this);
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
    if (day == 0) {
      day = day + 7
    }
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

  handleHabitSubmit (habit) {
    $.ajax({
      url: '/api/v1/habits',
      dataType: 'json',
      type: 'POST',
      data: habit,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(info) {
        var schedulesArray = this.state.schedules;
        for(var i = 0; i < info.schedules.length; i++) {
           schedulesArray.unshift(info.schedules[i]);
        }
        this.setState({schedules: schedulesArray});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleScheduleDelete (scheduleInfo) {
    $.ajax({
      url: '/api/v1/schedules/' + scheduleInfo.id,
      method: 'delete',
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(info) {
        var schedulesArray = this.state.schedules;
        for(var i = 0; i < schedulesArray.length; i++) {
          if(schedulesArray[i].id === info.schedule.id) {
             schedulesArray.splice(i, 1);
          }
        }
        this.setState({schedules: schedulesArray});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleScheduleUpdate (scheduleInfo) {
    $.ajax({
      url: '/api/v1/schedules/' + scheduleInfo.id,
      method: 'put',
      data: scheduleInfo,
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(info) {
        var schedulesArray = this.state.schedules;
        for(var i = 0; i < schedulesArray.length; i++) {
          if(schedulesArray[i].id === info.schedule.id) {
             schedulesArray.splice(i, 1, info.schedule);
          }
        }
        this.setState({schedules: schedulesArray});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleScheduleComplete (scheduleId) {
    $.ajax({
      url: '/api/v1/completed/' + scheduleId,
      method: 'put',
      data: scheduleId,
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(info) {
        var schedulesArray = this.state.schedules;
        for(var i = 0; i < schedulesArray.length; i++) {
          if(schedulesArray[i].id === info.schedule.id) {
             schedulesArray.splice(i, 1);
          }
        }
        this.setState({schedules: schedulesArray});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleScheduleMiss (scheduleId) {
    $.ajax({
      url: '/api/v1/missed/' + scheduleId,
      method: 'put',
      data: scheduleId,
      dataType: "json",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      cache: false,
      success: function(info) {
        var schedulesArray = this.state.schedules;
        for(var i = 0; i < schedulesArray.length; i++) {
          if(schedulesArray[i].id === info.schedule.id) {
             schedulesArray.splice(i, 1);
          }
        }
        this.setState({schedules: schedulesArray});
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

  loadGoals () {
    $.ajax({
      url: '/api/v1/goals',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(info) {
        this.setState({ goals: info.goals });
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
    this.loadGoals();
    this.loadHabits();
  }

  handlePositionChange (schedules, dragIndex, hoverIndex) {
    var schedulesArray = this.state.schedules;
    var insert_position = schedulesArray.indexOf(schedules[hoverIndex]);
      for(var i = 0; i < schedulesArray.length; i++) {
        if(schedulesArray[i].id === schedules[dragIndex].id) {
           schedulesArray[i] = schedulesArray.splice(insert_position, 1, schedules[dragIndex])[0];
        }
      }
    this.setState({schedules: schedulesArray});
  }

  render () {
    const styles = {
      height: '100%'
    }
    const filteredSchedules = this.state.schedules.filter(schedule => this.createDay(schedule) === this.state.currentSelectedTab)
    return (
      <div className="habitBox" style={styles}>
        <div>
          <HabitTabs
            filteredSchedules={filteredSchedules}
            onTabClick={this.handleOpenTab}
            onScheduleDelete={this.handleScheduleDelete}
            onHabitEdit={this.handleScheduleUpdate}
            onPositionChange={this.handlePositionChange}
            onMount={() => {}}
            addDays={this.addDays}
            initialSelectedIndex={this.state.currentSelectedTab}
            onScheduleComplete={this.handleScheduleComplete}
            onScheduleMiss={this.handleScheduleMiss}
          />
        </div>
        <div>
          <HabitForm goals={this.state.goals} onHabitSubmit={this.handleHabitSubmit} filteredSchedules={filteredSchedules} findDayInWeek={this.findDayInWeek} />
        </div>
      </div>
    );
  }
};

HabitTabs.propTypes = propTypes;
export default HabitBox;
