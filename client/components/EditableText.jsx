const RaisedButton = require('material-ui/lib/raised-button');
import React from 'react';

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      editing: false
    };
  }

  toggleEditingTrue (event) {
    this.setState({editing: true});
  }

  handleTitleChange (event) {
    this.setState({title: event.target.value});
  }

  handleDescriptionChange (event) {
    this.setState({description: event.target.value});
  }

  handleDescriptionSubmit (event) {
    this.props.handleEdit({id: this.props.id, description: this.state.description})
    this.setState({editing: false})
  }

  handleTitleSubmit (event) {
    this.props.handleEdit({id: this.props.id, title: this.state.title})
    this.setState({editing: false})
  }

  render () {
    if (this.state.editing && this.state.title) {
      return (
        <div>
          <textarea value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
          <RaisedButton
            label="Submit"
            secondary={true}
            onClick={this.handleTitleSubmit.bind(this)}
          />
        </div>
      )
    } else if (this.state.editing && this.state.description) {
      return (
        <div className="editableDescription">
          <textarea value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
          <RaisedButton
            label="Submit"
            secondary={true}
            onClick={this.handleDescriptionSubmit.bind(this)}
          />
        </div>
      )
    } else {
      var text = this.state.title ? this.state.title : this.state.description
      return (
        <div>
          <p onDoubleClick={this.toggleEditingTrue.bind(this)} >
            {text}
          </p>
          <RaisedButton
            label="Edit"
            style={{
              display: 'block',
              height: '10px',
              width: '10px',
              background: 'green'
            }}
            onClick={this.toggleEditingTrue.bind(this)}
          />
        </div>
      )
    }
  }
}

export default EditableText;
