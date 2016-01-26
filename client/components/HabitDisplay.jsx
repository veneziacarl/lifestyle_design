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

    for(var i = 0; i < this.props.goals.length; i++) {
      goalTitles.push(this.props.goals[i].title)
      goalSchedules.push(this.props.goals[i].sum_today_schedules)
    }

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
    const completions = []
    for(var i = 0; i < this.props.weekStats.length; i++) {
      if (i <= ((new Date).getDay())) {
        completions.push(this.props.weekStats[i][1])
      }
    }
    console.log(completions)
    const days = ['M', 'T', 'W', 'Th', 'F', 'S', 'Sn']

    return (
      {
        chart: {
          spacingBottom: 15,
          spacingTop: 10,
          spacingLeft: 0,
          spacingRight: 0,
          width: 300,
          height: 300
        },
        xAxis: {
          categories: days
        },
        series: [{
          data: completions,
          name: "completed"
        }],
        title: {
          text: "Completed habits this week"
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
          <div className="row">
            <div className="small-6 columns">
              <p>Today</p>
              <p>Completion Percentage {this.props.todayStats.percent_complete}</p>
              <p>Habits Remaining {this.props.todayStats.do_count}</p>
              <p>Habits Completed {this.props.todayStats.completed_count}</p>
              <p>Habits Missed {this.props.todayStats.missed_count}</p>
            </div>
            <div className="small-6 columns">
              random quote or something
            </div>
          </div>
          <div className="small-12 large-6 columns">
            <HabitChart createConfig={this.createCompletionRatesConfig} />
          </div>
          <div className="small-12 large-6 columns">
            <HabitChart createConfig={this.createSumSchedulesConfig} />
          </div>
        </Paper>
      </div>
    );
  }
}

export default HabitDisplay;
