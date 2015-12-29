import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import HabitBox from './components/HabitBox.jsx';

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
