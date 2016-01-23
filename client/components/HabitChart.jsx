import React from 'react';

import Highcharts from 'react-highcharts/bundle/highcharts';
import 'highcharts-exporting';
const HighchartsMore = require('highcharts-more');
HighchartsMore(global.Highcharts);

class HabitChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Highcharts config={this.props.config}></Highcharts>
      </div>
    );
  }

}

export default HabitChart;
