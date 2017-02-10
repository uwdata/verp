/**
 * Created by cdemira on 12/2/16.
 */

import React, {Component} from 'react';
import {RecurrencePlot} from './RecurrencePlot';
import {RecurrenceCtrl} from './RecurrenceCtrl';
import {RQAPlot} from './RQAPlot';

export class Recurrence extends Component {

  constructor(props){

    super(props);
    this.state = {
      updateEps:this.updateEps,
      eps:50,
      updateMetric:this.updateMetric,
      metric:'euclidean'};

    this.rqa= null;

    this.updateEps = this.updateEps.bind(this);

    this.updateMetric = this.updateMetric.bind(this);
    this.updateRQA = this.updateRQA.bind(this);
  }

  updateEps(eps){
    this.setState({eps:eps});
  }

  updateMetric(metric){
    console.log(metric);
    this.setState({metric:metric});
  }

  updateRQA(rqa){
    // console.log(rqa);
    this.rqa = rqa;
  }

  render() {
    console.log('rendering recurrence');
    return (
      <div>
        <RecurrencePlot data={this.props.data}
                        selection={this.props.selection}
                        eps={this.state.eps}
                        metric={this.state.metric}
                        updateRQA={this.updateRQA}/>
        <RecurrenceCtrl updateEps={this.updateEps}
                        updateMetric={this.updateMetric}/>
        <RQAPlot rqa={this.rqa} />
      </div>
    );
  }
}
