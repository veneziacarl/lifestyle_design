var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import { Tabs, Tab } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import HabitRows from './HabitRows.jsx';


const propTypes = {
  onMount: PropTypes.func.isRequired
};

export class TimeTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.moveHabit = this.moveHabit.bind(this)
  }

  componentDidMount() {
    this.props.onMount();
  }

  handleChange (e) {
    e.preventDefault();
    var tab = e.target.textContent;
    this.props.onTabClick(tab);
  }

  moveHabit(dragIndex, hoverIndex) {
    const habits = this.props.filteredHabits;
    const dragHabit = habits[dragIndex];

    habits.splice(dragIndex, 1)
    habits.splice(hoverIndex, 0, dragHabit)
    this.props.onPositionChange(habits)
  }

  handleDelete (habitInfo) {
    this.props.onHabitDelete(habitInfo);
  }

  handleEdit (habitInfo) {
    this.props.onHabitEdit(habitInfo);
  }

  renderTabCategory (label) {

    const styles = {
      height: '100%',
      background: '#333'
    }

    return (
      <Tab label={label} style={styles} onClick={this.handleChange.bind(this)}>
        <div>
          <HabitRows
            filteredHabits={this.props.filteredHabits}
            tabType={this.props.currentSelectedTimeType}
            onHabitDelete={this.handleDelete}
            onHabitEdit={this.handleEdit}
            moveHabit={this.moveHabit}
          />
        </div>
      </Tab>
    )
  }

  render() {
    return (
      <div className="timetabs small-12 medium-6 large-4 columns">
       <Tabs>
         {this.renderTabCategory('daily')}
         {this.renderTabCategory('weekly')}
         {this.renderTabCategory('monthly')}
         {this.renderTabCategory('yearly')}
       </Tabs>
      </div>
    );
  }
}

TimeTabs.propTypes = propTypes;
export default DragDropContext(HTML5Backend)(TimeTabs);
