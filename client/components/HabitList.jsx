import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardText, FlatButton, RaisedButton } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/function/flow';

import { ItemTypes } from './ItemTypes.jsx';
import { colors } from './colors.jsx';
import EditableText from './EditableText.jsx';
import HabitCard from './HabitCard.jsx';


const propTypes = {
  onMount: PropTypes.func.isRequired
}

export class HabitList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onMount();
  }

  handleScheduleDelete (scheduleInfo) {
    this.props.onScheduleDelete(scheduleInfo);
  }

  handleHabitEdit (habitInfo) {
    this.props.onHabitEdit(habitInfo);
  }

  handleComplete (scheduleInfo) {
    if (new Date(scheduleInfo.date).getDay() == (new Date).getDay()) {
      this.props.onScheduleComplete(scheduleInfo);
    } else {
      alert("You can only complete items on the current day");
      return;
    }
  }

  handleMiss (scheduleInfo) {
    if (new Date(scheduleInfo.date).getDay() == (new Date).getDay()) {
      this.props.onScheduleMiss(scheduleInfo);
    } else {
      alert("You can only miss items on the current day");
      return;
    }
  }

  render () {
    const {
      id,
      isDragging,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
    } = this.props;

    var habitList = this.props.filteredSchedules.map( (schedule, i) => {
      return (
        <HabitCard
          key={schedule.id}
          index={i}
          moveHabit={this.props.moveHabit.bind(this)}
          handleDelete={this.handleScheduleDelete.bind(this)}
          handleEdit={this.handleHabitEdit.bind(this)}
          handleComplete={this.handleComplete.bind(this)}
          handleMiss={this.handleMiss.bind(this)}
          {...schedule}
        />
      );
    })

    const styles = {
      height: '80%'
    }

    return (
      <div style={styles}>
        {habitList}
      </div>
    );
  }
}

HabitList.propTypes = propTypes;
export default HabitList;
