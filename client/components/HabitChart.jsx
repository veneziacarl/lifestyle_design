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
      <div className="small-8 columns">
        <Highcharts config={this.props.createConfig()}></Highcharts>
      </div>
    );
  }

}

export default HabitChart;
