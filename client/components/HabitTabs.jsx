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

export class HabitTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.moveHabit = this.moveHabit.bind(this);
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
    this.props.onPositionChange(habits)
  }

  handleDelete (habitInfo) {
    this.props.onHabitDelete(habitInfo);
  }

  handleEdit (habitInfo) {
    this.props.onHabitEdit(habitInfo);
  }

  renderTabCategory (label, day) {
    return (
      <Tab label={label} day={day} passed={false} onClick={this.handleChange.bind(this)}>
        <div>
          <HabitRows
            filteredSchedules={this.props.filteredSchedules}
            tab={this.props.currentSelectedTab}
            onHabitDelete={this.handleDelete}
            onHabitEdit={this.handleEdit}
            moveHabit={this.moveHabit}
            onMount={() => {}}
          />
        </div>
      </Tab>
    )
  }

  render() {
    return (
      <div className="habittabs small-12 medium-6 large-4 columns">
       <Tabs>
         {this.renderTabCategory('M', 1)}
         {this.renderTabCategory('T', 2)}
         {this.renderTabCategory('W', 3)}
         {this.renderTabCategory('Th', 4)}
         {this.renderTabCategory('F', 5)}
         {this.renderTabCategory('Sa', 6)}
         {this.renderTabCategory('Sn', 7)}
       </Tabs>
      </div>
    );
  }
}

HabitTabs.propTypes = propTypes;
export default DragDropContext(HTML5Backend)(HabitTabs);
