import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardText, FlatButton, RaisedButton, Avatar } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/function/flow';

import { ItemTypes } from './ItemTypes.jsx';
import { colors } from './colors.jsx';
import EditableText from './EditableText.jsx';

const propTypes = {
  id: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  moveHabit: PropTypes.func.isRequired
}

const cardSource = {
  beginDrag(props, monitor, component) {
    return { id: props.id, index: props.index }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    isOver: monitor.isOver()

    props.moveHabit(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}


class HabitCard extends Component {
  render () {
    const {
      id,
      isDragging,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
    } = this.props;

    const styles = {
      cursor: 'move',
      opacity: isDragging ? 0.5 : 1,
      padding: '10',
      background: 'white',
      margin: '2%'
    }

    return connectDropTarget(connectDragSource(
      <div className="habit-card">
        <Card initiallyExpanded={false} style={styles} id={this.props.habitInfo.habit.id} index={this.props.habitInfo.habit.index} className="small-12 columns">
          <CardHeader
            className="small-12 columns"
            actAsExpander={false}
            showExpandableButton={true}
            avatar={
              <Avatar color={styles.background} backgroundColor={colors.lightBlue}>
                {this.props.habitInfo.habit.goal.title.charAt(0)}
              </Avatar>
            }
            title={this.props.habitInfo.habit.title}
            id={this.props.habitInfo.habit.id}
          >
          </CardHeader>
          <CardText expandable={true}>
            <EditableText
              className="small-12 columns"
              note={this.props.note}
              id={this.props.id}
              handleEdit={this.props.handleEdit.bind(this)}
              multiline={true}
              haveButton={true}
              autofocus={true}
              maxLength={200}
            />
          </CardText>
          <CardActions expandable={true}>
            <FlatButton
              label="completed"
              primary={true}
              onClick={this.props.handleComplete.bind(this, this.props.id)}
              />
            <FlatButton
              label="missed"
              secondary={true}
              onClick={this.props.handleMiss.bind(this, this.props.id)}
            />
            <RaisedButton
              label="delete"
              primary={true}
              style={{
                height: '20px',
                width: '10px'
              }}
              onClick={this.props.handleDelete.bind(this, this.props)} />
          </CardActions>
        </Card>
      </div>
    ));
  }
}

HabitCard.propTypes = propTypes;
export default flow(
  DragSource(ItemTypes.CARD, cardSource, collectSource),
  DropTarget(ItemTypes.CARD, cardTarget, collectTarget)
)(HabitCard);
