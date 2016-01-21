const RaisedButton = require('material-ui/lib/raised-button');
import React from 'react';

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      note: this.props.note ? this.props.note : "hey testing this out",
      editing: false,
      initialTitle: this.props.title,
      initialNote: this.props.note ? this.props.note : "this is a note"
    };
  }

  toggleEditingTrue (event) {
    this.setState({editing: true});
  }

  handleTitleChange (event) {
    this.setState({title: event.target.value});
  }

  handleNoteChange (event) {
    this.setState({note: event.target.value});
  }

  handleNoteSubmit (event) {
    this.props.handleEdit({id: this.props.id, note: this.state.note})
    this.setState({editing: false})
  }

  handleTitleSubmit (event) {
    this.props.handleEdit({id: this.props.id, title: this.state.title})
    this.setState({editing: false})
  }

  handleCancel (event) {
    this.setState({note: this.state.initialNote})
    this.setState({editing: false})
  }

  render () {
    if (this.state.editing && this.state.title) {
      return (
        <div>
          <textarea value={this.state.title} className="titleText" onChange={this.handleTitleChange.bind(this)} />
          <RaisedButton
            label="Submit"
            secondary={true}
            className="submit"
            onClick={this.handleTitleSubmit.bind(this)}
          />
          <RaisedButton
            label="Cancel"
            primary={true}
            onClick={this.handleCancel.bind(this)}
          />
        </div>
      )
    } else if (this.state.editing && this.state.note) {
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
    } else if (this.props.haveButton) {
      var text = this.state.title ? this.state.title : this.state.note
      return (
        <div>
          <div className="small-10 columns">
            <p onDoubleClick={this.toggleEditingTrue.bind(this)} >
              {text}
            </p>
          </div>
          <div className="small-2 columns">
            <RaisedButton
              id="edit"
              label="Edit"
              style={{
                height: '20px',
                width: '10px'
              }}
              onClick={this.toggleEditingTrue.bind(this)}
            />
          </div>
        </div>
      )
    } else {
      var text = this.state.title ? this.state.title : this.state.note
      return (
        <div className="small-10 columns">
          <p onDoubleClick={this.toggleEditingTrue.bind(this)} >
            {text}
          </p>
        </div>
      )
    }
  }
}

export default EditableText;
