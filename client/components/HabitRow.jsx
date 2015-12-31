import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardText, FlatButton, RaisedButton } from 'material-ui';
import React from 'react';

import EditableText from './EditableText.jsx';

class HabitRow extends React.Component {
  constructor(props) {
    super(props);
    var tabType = this.props.tabType;
  }

  handleDelete (id) {
    this.props.onHabitDelete({id});
  }

  handleEdit (updatedInfo) {
    this.props.onHabitEdit(updatedInfo);
  }

  render () {
    const Row = ({ children }) => {
      return (
        <div>
          {children}
        </div>
      )
    }

    var habitRows = this.props.habits.daily.map( habit => {
      return (
        <Row key={habit.id} id={habit.id} className="habitRow row">
          <Card initiallyExpanded={true} className="small-12 columns">
            <CardHeader
              className="small-12 columns"
              actAsExpander={false}
              showExpandableButton={true}
              avatar={<div></div>}
              title={<EditableText
                title={habit.title}
                haveButton={false}
                id={habit.id}
                handleEdit={this.handleEdit.bind(this)}
              />}
            />
            <CardText expandable={true}>
              <EditableText
                className="small-12 columns"
                description={habit.description}
                id={habit.id}
                handleEdit={this.handleEdit.bind(this)}
                multiline={true}
                haveButton={true}
                autofocus={true}
                maxLength={200}
              />
            </CardText>
            <CardActions expandable={true} className="small-1 columns">
              <RaisedButton
                label="Delete"
                primary={true}
                style={{
                  height: '20px',
                  width: '10px'
                }}
                onClick={this.handleDelete.bind(this, habit.id)} />
            </CardActions>
          </Card>
        </Row>
      );
    })


    return (
      <div>
        {habitRows}
      </div>
    );
  }
}

export default HabitRow;
