var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import { Tabs, Tab, Paper } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import HabitList from './HabitList.jsx';
import { colors } from './colors.jsx';


const propTypes = {
  onMount: PropTypes.func.isRequired
};

export class HabitTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.moveHabit = this.moveHabit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleMiss = this.handleMiss.bind(this);
  }

  componentDidMount() {
    this.props.onMount();
  }

  handleChange (e) {
    e.preventDefault();
    var tab = e.target.tabIndex + 1;
    this.props.onTabClick(tab);
  }

  moveHabit(dragIndex, hoverIndex) {
    const habits = this.props.filteredSchedules;
    const dragHabit = habits[dragIndex];
    habits.splice(dragIndex, 1)
    habits.splice(hoverIndex, 0, dragHabit)
    this.props.onPositionChange(habits, dragIndex, hoverIndex)
  }

  handleDelete (scheduleInfo) {
    this.props.onScheduleDelete(scheduleInfo);
  }

  handleEdit (habitInfo) {
    this.props.onHabitEdit(habitInfo);
  }

  handleComplete (scheduleInfo) {
    this.props.onScheduleComplete(scheduleInfo);
  }

  handleMiss (scheduleInfo) {
    this.props.onScheduleMiss(scheduleInfo);
  }

  getStyles (day) {
    const styles = {
      backgroundColor: '#FEFEFE',
      color: 'black',
      fontWeight: 'bold',
      fontSize: '20'
    }
    var today = (new Date).getDay()

    if (today == day) {
      styles.color = colors.red;
    } else if (today < day) {
      styles.color = colors.orange;
    } else {
      styles.color = colors.lightBlue;
    }

    return styles;
  }

  renderTabCategory (label, day) {
    return (
      <Tab label={label} day={day} style={this.getStyles(day)} onClick={this.handleChange.bind(this)}>
        <div>
          <HabitList
            filteredSchedules={this.props.filteredSchedules}
            tab={this.props.currentSelectedTab}
            onScheduleDelete={this.handleDelete}
            onHabitEdit={this.handleEdit}
            moveHabit={this.moveHabit}
            onMount={() => {}}
            onScheduleComplete={this.handleComplete}
            onScheduleMiss={this.handleMiss}
          />
        </div>
      </Tab>
    )
  }

  render() {
    return (
      <div className="habitTabs small-12 medium-6 large-4 columns">
         <Tabs initialSelectedIndex={this.props.initialSelectedIndex} >
           {this.renderTabCategory('M', 1)}
           {this.renderTabCategory('T', 2)}
           {this.renderTabCategory('W', 3)}
           {this.renderTabCategory('Th', 4)}
           {this.renderTabCategory('F', 5)}
           {this.renderTabCategory('S', 6)}
           {this.renderTabCategory('Su', 7)}
         </Tabs>
      </div>
    );
  }
}

HabitTabs.propTypes = propTypes;
export default DragDropContext(HTML5Backend)(HabitTabs);
