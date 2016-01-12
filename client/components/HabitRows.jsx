import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardText, FlatButton, RaisedButton } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/function/flow';

import { ItemTypes } from './ItemTypes.jsx';
import { colors } from './colors.jsx';
import EditableText from './EditableText.jsx';
import HabitCard from './HabitCard.jsx';

class HabitRows extends React.Component {
  constructor(props) {
    super(props);
  }

  handleHabitDelete (habitInfo) {
    this.props.onHabitDelete(habitInfo);
  }

  handleHabitEdit (habitInfo) {
    this.props.onHabitEdit(habitInfo);
  }

  render () {
    const Row = ({ children }) => {
      return (
        <div>
          {children}
        </div>
      )
    }

    const {
      id,
      isDragging,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
    } = this.props;

    var habitRows = this.props.filteredHabits.map( (habit, i) => {
      return (
        <HabitCard
          key={habit.id}
          index={i}
          moveHabit={this.props.moveHabit.bind(this)}
          handleDelete={this.handleHabitDelete.bind(this)}
          handleEdit={this.handleHabitEdit.bind(this)}
          {...habit}
        />
      );
    })

    return (
      <div>
        {habitRows}
      </div>
    );
  }
}

export default HabitRows;
