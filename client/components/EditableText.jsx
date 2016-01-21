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
        <div className="small-10 columns">
          <div className="small-10 columns">
            <p onDoubleClick={this.toggleEditingTrue.bind(this)} >
              {this.state.note}
            </p>
          </div>
          <div className="small-2 columns">
            <RaisedButton
              id="edit"
              label={this.props.note ? "Edit Note" : "New Note"}
              style={{
                height: '20px',
                width: '10px'
              }}
              onClick={this.toggleEditingTrue.bind(this)}
            />
          </div>
        </div>
      )
    }
  }
}

export default EditableText;
