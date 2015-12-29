import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import HabitForm from './components/HabitForm.jsx';
import HabitList from './components/HabitList.jsx';
import TimeTabs from './components/TimeTabs.jsx';

class HabitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: { daily: [], weekly: [], yearly: [] },
      labels: [
      "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"
      ]};
    this.handleHabitSubmit = this.handleHabitSubmit.bind(this);
    this.handleHabitDelete = this.handleHabitDelete.bind(this);
    this.handleHabitEdit = this.handleHabitEdit.bind(this);
  }


  handleHabitSubmit (habit) {
    $.ajax({
      url: '/habits.json',
      dataType: 'json',
      type: 'POST',
      data: habit,
      success: function(habits) {
        var habitsArray = this.state.habits.daily;
        var newHabits = habitsArray.concat(habits);
        this.setState({habits: {daily: newHabits}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleHabitDelete (habit) {
    $.ajax({
      url: '/habits',
      method: 'DELETE',
      data: habit.id,
      dataType: "json",
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
      url: '/habits.json',
      method: 'PUT',
      data: habitDetails,
      dataType: "json",
      cache: false,
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  }

  handleOpenTab (tab) {
    $.ajax({
      url: '/' + tab + '.json',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(habits) {
        this.setState({habits:{daily: habits}});
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

$(function() {
  if ($('#react_daily').length) {
    render(<HabitBox />, document.getElementById('react_daily'));
  }
});





// loadHabitsFromServer () {
//   $.ajax({
//     url: '/daily.json',
//     method: 'GET',
//     dataType: 'json',
//     cache: false,
//     success: function(habits) {
//       this.setState({habits: habits});
//     }.bind(this),
//     error: function(xhr, status, err) {
//       console.error(this.props, status, err.toString());
//     }.bind(this)
//   });
// }
