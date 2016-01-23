import React from 'react';
import { Paper } from 'material-ui';

import HabitChart from './HabitChart.jsx';


class HabitDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.createConfig = this.createConfig.bind(this)
  }

  createConfig () {
    const goalTitles = []
    const goalSchedules = []

    this.props.goals.map( (goal, i) => {
      goalTitles.push(goal.title)
      goalSchedules.push(goal.sum_today_schedules)
    });

    return (
      {
        chart: {
          polar: true
        },
        xAxis: {
          categories: goalTitles
        },
        series: [{
          data: goalSchedules,
          name: "number of schedules"
        }]
      }
    );
  }

  render () {
    const styles = {
      height: '600px'
    }
    return (
      <div className="small-6 columns">
        <Paper style={styles} zDepth={1}>
          <div>
            <HabitChart createConfig={this.createConfig} />
          </div>
          <div>
            <p>here is some filler text</p>
          </div>
        </Paper>
      </div>
    );
  }

}

export default HabitDisplay;
