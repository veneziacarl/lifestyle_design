import React from 'react';

class HabitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: '', time_type: ''};
  }

  handleTitleChange (e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange (e) {
    this.setState({description: e.target.value});
  }

  handleTypeChange (e) {
    this.setState({time_type: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var time_type = this.state.time_type.trim();
    if (!title || !description || !time_type) {
      return;
    };
    this.props.onHabitSubmit({title: title, description: description, time_type: time_type});
    this.setState({title: '', description: '', time_type: ''});
  }

  render() {
    return (
      <div className="row">
        <div className="habitForm small-12 medium-8 large-6 small-centered columns">
          <form className="habitForm" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Habit Title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
            <input type="text" placeholder="Habit Description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
            <input type="text" placeholder="Habit Type" value={this.state.time_type} onChange={this.handleTypeChange.bind(this)} />
            <input type="submit" value="Post" />
          </form>
        </div>
      </div>
    );
  }
}

export default HabitForm;
