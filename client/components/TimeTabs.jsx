var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import { Tabs, Tab } from 'material-ui';
import React from 'react';
import $ from 'jquery';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import HabitRows from './HabitRows.jsx';


class TimeTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.moveHabit = this.moveHabit.bind(this)
  }

  handleChange (e) {
    e.preventDefault();
    var tab = e.target.textContent;
    this.props.onTabClick(tab);
  }

  moveHabit(dragIndex, hoverIndex) {
    const habits = this.props.habits;
    const dragHabit = habits[dragIndex];

    habits.splice(dragIndex, 1)
    habits.splice(hoverIndex, 0, dragHabit)
    this.props.onPositionChange(habits)
  }

  handleDelete (id) {
    this.props.onHabitDelete({id});
  }

  handleEdit (updatedInfo) {
    this.props.onHabitEdit(updatedInfo);
  }

  render() {
    return (
      <div className="timetabs small-12 medium-6 large-4 columns">
        <Tabs>
          <Tab label="daily" onClick={this.handleChange.bind(this)}>
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
          <Tab label="weekly" onClick={this.handleChange.bind(this)}>
            <HabitRows
              filteredHabits={this.props.filteredHabits}
              tabType={this.props.currentSelectedTimeType}
              onHabitDelete={this.handleDelete}
              onHabitEdit={this.handleEdit}
              moveHabit={this.moveHabit}
            />
          </Tab>
          <Tab label="monthly" onClick={this.handleChange.bind(this)}>
            (tab content..)
          </Tab>
          <Tab label="yearly" onClick={this.handleChange.bind(this)}>
            (tab content..)
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(TimeTabs);
