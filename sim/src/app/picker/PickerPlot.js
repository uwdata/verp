/**
 * Created by cdemira on 12/2/16.
 */
import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {scatter} from '../vis/scatter';

const styles = {
  holder : {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '1rem',
    margin: '1rem'
  },
  chartArea:{
    width:512,
    height:512
  }

};

export class PickerPlot extends Component {

  constructor(props){

    super(props);

    this.handleMouseClick = this.handleMouseClick.bind(this);

    this.handleBrush = this.handleBrush.bind(this);

    this.initScatterPlot();
  }

  initScatterPlot(){

    let s = this.props.scale(),
      x = scaleLinear().domain(s.xScale),
      y = scaleLinear().domain(s.yScale);

    this.chart = scatter()
      .registerListener ('bg', 'click', this.handleMouseClick, this)
      .registerListener ('bg', 'drag', this.handleMouseClick, this)
      .registerListener ('shape', 'brush', this.handleBrush, this)
      .xScale(x)
      .yScale(y)
      .brush(false);

  }

  createScatterPlot(el,d){

    this.chart(el,d);

  }

  updateScatterPlot(nextProps){

     if(nextProps.data !== this.props.data) {

      this.updateScatterPlotScale();
      this.chart.update(nextProps.data);

    }

    if(nextProps.mode  !== this.props.mode){

     this.chart.brush(nextProps.mode === 'brush') ;

    }

  }

  updateScatterPlotScale(){

    let x = this.chart.xScale(),
      y = this.chart.yScale(),
      s = this.props.scale(),
      n = this.props.data.length,
      c = this.chart.fillScale();

    x.domain(s.xScale);
    y.domain(s.yScale);
    c.domain([0, n-1]);

    this.chart.xScale(x).yScale(y).fillScale(c);

  }

  handleBrush (e){

    // console.log('handling brush', e);
    this.props.onBrush(e);

  }


  handleMouseClick(e){

    this.props.onDataUpdate(e);

  }

  componentDidMount() {
    console.log('mounted');
    this.createScatterPlot(this.refs.chartArea, this.props.data);
  }

  componentWillUnmount() {
    console.log('unmounting')
  }

  shouldComponentUpdate(nextProps) {
    this.updateScatterPlot(nextProps);
    return false;

  }

  render() {

    return (
      <div style={styles.holder}>
        <svg ref="chartArea" style={styles.chartArea}>
        </svg>
      </div>
    );
  }

}
