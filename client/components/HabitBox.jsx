import React, { Component, PropTypes } from 'react';
import { Snackbar, LeftNav, MenuItem, RaisedButton } from 'material-ui';
import {render} from 'react-dom';
import $ from 'jquery';

import HabitForm from './HabitForm.jsx';
import HabitTabs from './HabitTabs.jsx';
import HabitDisplay from './HabitDisplay.jsx';


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
      goals: [],
      autoHideDuration: 5000,
      message: 'Added habit and schedules',
      snackbarOpen: false,
      todayStats: '',
      weekStats: '',
      open: false
    };
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleScheduleDelete = this.handleScheduleDelete.bind(this);
    this.handleScheduleUpdate = this.handleScheduleUpdate.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleScheduleComplete = this.handleScheduleComplete.bind(this);
    this.handleScheduleMiss = this.handleScheduleMiss.bind(this);
    this.checkScheduleDates = this.checkScheduleDates.bind(this);
    this.handleOpenTab = this.handleOpenTab.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
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

  handleToggle (){
    this.setState({open: !this.state.open});
  }

  handleClose () {
    this.setState({open: false});
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
        this.setState({message: 'Created habit and schedules'});
        this.setState({snackbarOpen: true });
        this.loadGoals();
        this.loadStats();
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
        this.setState({message: 'Deleted schedule'})
        this.setState({snackbarOpen: true })
        this.loadStats();
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
        this.setState({message: 'Updated schedule'})
        this.setState({snackbarOpen: true })
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
        this.setState({message: 'Habit completed. Good work!'});
        this.setState({snackbarOpen: true });
        this.loadStats();
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
        this.setState({message: 'Habit marked as missed' });
        this.setState({snackbarOpen: true });
        this.loadStats();
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

  handleRequestClose () {
    this.setState({
      snackbarOpen: false,
    });
  };

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

  loadStats () {
    $.ajax({
      url: '/api/v1/stats/today',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(info) {
        this.setState({todayStats: info.schedules[0]})
        this.setState({weekStats: info.schedules[1]})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  onMount () {
  }

  checkScheduleDates () {
    var schedulesArray = this.state.schedules;
    var date = new Date;
    date.setHours(0,0,0,0);
    for(var i = 0; i < schedulesArray.length; i++) {
      var schedule = schedulesArray[i]
      var scheduleDate = (new Date(schedule.date))
      if(scheduleDate < date) {
        schedulesArray.splice(i, 1)
        this.handleScheduleMiss(schedule.id)
        this.setState({schedules: schedulesArray});
      }
    }
  }

  componentDidMount () {
    this.setTodayTab();
    this.loadGoals();
    this.loadHabits();
    this.loadStats();
    setInterval(this.checkScheduleDates, this.props.pollInterval);
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
    const filteredSchedules = this.state.schedules.filter(schedule => this.createDay(schedule) === this.state.currentSelectedTab)
    return (
      <div className="habitBox row">
        <div>
          <RaisedButton
           label="Controlled LeftNav That Opens From Right"
           onTouchTap={this.handleToggle} />
          <LeftNav
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
          </LeftNav>
        </div>
        <div className="small-6 small-centered columns">
          <HabitForm
            goals={this.state.goals}
            onHabitSubmit={this.handleHabitSubmit}
            filteredSchedules={filteredSchedules}
            findDayInWeek={this.findDayInWeek}
            />
        </div>
        <div className="row">
          <div className="small-12 medium-5 columns">
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
          <div className="small-12 medium-7 columns">
            <HabitDisplay
              goals={this.state.goals}
              todayStats={this.state.todayStats}
              weekStats={this.state.weekStats}
            />
          </div>
        </div>
        <div>
          <Snackbar
            style={{textAlign: 'center'}}
            open={this.state.snackbarOpen}
            message={this.state.message}
            autoHideDuration={this.state.autoHideDuration}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </div>
    );
  }
};

HabitTabs.propTypes = propTypes;
export default HabitBox;
