const RaisedButton = require('material-ui/lib/raised-button');
import React from 'react';

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note,
      editing: false,
      initialNote: this.props.note
    };
  }

  toggleEditingTrue (event) {
    this.state.note ? this.state.note : this.setState({note: " "})
    this.setState({editing: true});
  }

  handleNoteChange (event) {
    this.setState({note: event.target.value});
  }

  handleNoteSubmit (event) {
    this.props.handleEdit({id: this.props.id, note: this.state.note})
    this.setState({editing: false})
  }

  handleCancel (event) {
    this.setState({note: this.state.initialNote})
    this.setState({editing: false})
  }

  render () {
    if (this.state.editing && this.state.note) {
      return (
        <div className="editableNote">
          <textarea value={this.state.note} onChange={this.handleNoteChange.bind(this)} />
          <RaisedButton
            label="Submit"
            secondary={true}
            onClick={this.handleNoteSubmit.bind(this)}
          />
          <RaisedButton
            label="Cancel"
            primary={true}
            onClick={this.handleCancel.bind(this)}
          />
        </div>
      )
    } else {
      return (
        <div >
            <p onDoubleClick={this.toggleEditingTrue.bind(this)} >
              {this.state.note}
            </p>
            <RaisedButton
              id="edit"
              label={this.props.note ? "Edit Note" : "New Note"}
              onClick={this.toggleEditingTrue.bind(this)}
            />
        </div>
      )
    }
  }
}

export default EditableText;
