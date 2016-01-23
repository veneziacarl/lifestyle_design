import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import HabitBox from './components/HabitBox.jsx';

$(function() {
  if ($('#habit_box').length) {
    render(<HabitBox pollInterval={10000} />, document.getElementById('habit_box'));
  }
});
