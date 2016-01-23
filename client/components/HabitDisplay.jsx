import React from 'react';
import { Paper } from 'material-ui';
var Highcharts = require('react-highcharts/bundle/highcharts');

class HabitDisplay extends React.Component {
  constructor(props) {
    super(props);
  }


  render () {
    const config = {
    }
    return (
      <div className="small-6 columns">
        <Paper zDepth={1}>
          <div>
            <Highcharts config={config}></Highcharts>
          </div>
        </Paper>
      </div>
    );
  }

}

export default HabitDisplay;
