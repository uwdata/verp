/**
 * Created by cdemira on 12/2/16.
 */

import React, {Component} from 'react';

import * as rep from '../vis/rep';


const styles = {
  holder : {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '1rem',
    margin: '1rem'
  },

  chartArea:{

    borderLeft:'solid',
    borderLeftWidth:'1px',
    borderTop:'solid',
    borderTopWidth:'1px',
    width:512,
    height:512,
    boxShadow: '2px 2px 2px #888888'

  }
};


export class RecurrencePlot extends Component {

  constructor(props){
    super(props);

    this.initPlot();
  }

  initPlot(){

    this.plot = rep.rplot()
      .width(512)
      .height(512)
      .eps(this.props.eps);
  }

  updatePlot(props, epsonly){

    var d = props.data,
      rqa;

    // console.log('updating the recurrence plot...');

    if(epsonly){

      console.log('eps only update...');

      rqa = this.plot.eps(props.eps)
        .update()
        .rqa();

    } else {

      rqa = this.plot.data({x: d, y: d})
        .eps(props.eps)
        .update()
        .rqa();

    }

    props.updateRQA(rqa);

  }

  createPlot(el, d){
    this.plot(el, d)
  }

  componentDidMount() {

    console.log('mounted');

    var d = this.props.data;
    this.createPlot(this.refs.chartArea, {x:d, y:d});

  }


  componentWillUnmount() {
    console.log('unmounting')
  }

  shouldComponentUpdate(nextProps) {

    if (this.props.data !== nextProps.data)
      this.updatePlot(nextProps);
    else if( this.props.eps !== nextProps.eps )
      this.updatePlot( nextProps, true );

    if (this.props.selection !== nextProps.selection)
      this.plot.highlight( this.toBinarySelection( nextProps ) );


    return false;

  }


  toBinarySelection(p){

    const n = p.data.length;
    let s = new Array(n).fill(0),
      i;

    for (i = 0; i < n; s[ p.selection[i++]] = 1 ) ;

    return s;
  }




  render() {

    return (
      <div style={styles.holder}>
        <div ref="chartArea" style={styles.chartArea}></div>
      </div>
    );

  }

}
