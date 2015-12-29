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
          <Card initiallyExpanded={true}>
            <CardHeader
              actAsExpander={true}
              showExpandableButton={true}
              avatar={<div></div>}
            >
              <EditableText
                title={habit.title}
                description={habit.description}
                id={habit.id}
                handleEdit={this.handleEdit.bind(this)}
                style={{
                  width: '10%',
                  margin: '0 auto'
                }}
              />
            </CardHeader>
            <CardText expandable={true}>
              <EditableText
                title={habit.title}
                description={habit.description}
                id={habit.id}
                handleEdit={this.handleEdit.bind(this)}
                multiline={true}
                autofocus={true}
                maxLength={200}
              />
            </CardText>
            <CardActions expandable={true}>
              <RaisedButton label="Delete" primary={true} onClick={this.handleDelete.bind(this, habit.id)} />
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
