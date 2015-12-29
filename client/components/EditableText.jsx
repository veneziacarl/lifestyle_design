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

  handleChange (event) {
    this.setState({text: event.target.value});
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
          <textarea value={this.state.title} onChange={this.handleChange.bind(this)} />
          <RaisedButton label="Submit" secondary={true} onClick={this.handleTitleSubmit.bind(this)} />
        </div>
      )
    } else if (this.state.editing && this.state.description) {
      return (
        <div className="editableDescription">
          <textarea value={this.state.description} onChange={this.handleChange.bind(this)} />
          <RaisedButton label="Submit" secondary={true} onClick={this.handleDescriptionSubmit.bind(this)} />
        </div>
      )
    }
     else {
      return (
        <div>
          <p onDoubleClick={this.toggleEditingTrue.bind(this)}>
            {this.state.text}
          </p>
          <RaisedButton label="Edit" default={true} onClick={this.toggleEditingTrue.bind(this)} />
        </div>
      )
    }
  }
}

export default EditableText;
// return (
//   <div>
//     {editableText}
//   </div>
// );

// var editableText = function() {
//   if (this.state.editing === true) {
//     debugger;
//     return ( <textarea type="text" value={this.state.text} /> )
//   } else {
//     debugger;
//     return (
      // <p onDoubleClick={this.toggleEditingTrue}>
      //   {this.state.text}
      // </p>
//     )
//   }
// }
