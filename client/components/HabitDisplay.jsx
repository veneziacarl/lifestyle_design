import React from 'react';
import { Paper } from 'material-ui';

import HabitChart from './HabitChart.jsx';


class HabitDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.createSumSchedulesConfig = this.createSumSchedulesConfig.bind(this)
    this.createCompletionRatesConfig = this.createCompletionRatesConfig.bind(this)
  }

  createSumSchedulesConfig () {
    const goalTitles = []
    const goalSchedules = []

    this.props.goals.map( (goal, i) => {
      goalTitles.push(goal.title)
      goalSchedules.push(goal.sum_today_schedules)
    });

    return (
      {
        chart: {
          polar: true,
          spacingBottom: 15,
          spacingTop: 10,
          spacingLeft: 0,
          spacingRight: 0,
          width: 300,
          height: 300
        },
        xAxis: {
          categories: goalTitles
        },
        series: [{
          data: goalSchedules,
          name: "number of schedules"
        }],
        title: {
          text: "Schedules for goals"
        }
      }
    );
  }

  createCompletionRatesConfig () {
    const goalTitles = ['M', 'T', 'W', 'Th', 'F', 'S', 'Sn']
    const goalSchedules = []

    this.props.goals.map( (goal, i) => {
      goalTitles.push(goal.title)
      goalSchedules.push(goal.sum_today_schedules)
    });

    return (
      {
        chart: {
          polar: true,
          spacingBottom: 15,
          spacingTop: 10,
          spacingLeft: 0,
          spacingRight: 0,
          width: 300,
          height: 300
        },
        xAxis: {
          categories: goalTitles
        },
        series: [{
          data: goalSchedules,
          name: "number of schedules"
        }],
        title: {
          text: "Schedules for goals"
        }
      }
    );
  }

  render () {
    const styles = {
      height: '80vh',
      padding: '10px'
    }
    return (
      <div>
        <Paper style={styles} zDepth={1}>
          <div>
            <p>Today's completion rate:</p>
            <p>To Do: </p>
            <p>Completed: </p>
            <p>Missed: </p>
            <p>Focus On: (habit title with weekly completion rate)</p>
          </div>
          <div className="small-12 large-6 columns">
            <HabitChart createConfig={this.createSumSchedulesConfig} />
          </div>
          <div className="small-12 large-6 columns">
            <HabitChart createConfig={this.createCompletionRatesConfig} />
          </div>
        </Paper>
      </div>
    );
  }

}

export default HabitDisplay;
