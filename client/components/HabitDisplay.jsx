import React from 'react';
import { Paper } from 'material-ui';

import HabitChart from './HabitChart.jsx';


class HabitDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  // xAxis: {
  //   categories: ['M', 'T', 'W', 'Th', 'F', 'S', 'Sn']
  // },

  render () {
    const goalsTitles = this.props.goals.map( (goal, i) => {
      return (
        goal.title
      );
    })

    const data = [2, 3, 5, 1, 0, 8]

    const config = {
      chart: {
        polar: true
      },
      xAxis: {
        categories: goalsTitles
      },
      series: [{
        data: data,
        name: "amount of schedules"
      }]
    }

    return (
      <div className="small-6 columns">
        <Paper zDepth={1}>
          <div>
            <HabitChart config={config} />
          </div>
        </Paper>
      </div>
    );
  }

}

export default HabitDisplay;
