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

  handleHabitDelete (habitInfo) {
    this.props.onHabitDelete(habitInfo);
  }

  handleHabitEdit (habitInfo) {
    this.props.onHabitEdit(habitInfo);
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
          handleDelete={this.handleHabitDelete.bind(this)}
          handleEdit={this.handleHabitEdit.bind(this)}
          {...schedule.habit}
        />
      );
    })

    return (
      <div>
        {habitList}
      </div>
    );
  }
}

HabitList.propTypes = propTypes;
export default HabitList;
