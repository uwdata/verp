/**
 * Created by cdemira on 12/14/16.
 */

import React, {Component} from 'react';
import './RQAPlot.css';

const styles = {
  holder : {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '1rem',
    margin: '1rem'
  },
  table:{
    container: {
      // display:'table'
    },
    row: {
      // display:'table-row'
    },
    cell: {
      // display:'table-cell', width:'40px', margin:'10px'
    }
  }
};

export const Table = function(props){

  let numRows = +props.numRows || props.data.length,
    numCols = +props.numCols || props.data[0].length,
    rows = [],
    cols = [],
    i,j;

  for (i = 0; i < numRows; cols = [], i++){

    for (j = 0; j < numCols; j++ )
      cols.push(<div className="col-sm-2" key={j} style={styles.table.cell}>{props.data[i][j]}</div>)

    rows.push(<div className="row" key={i} style={styles.table.row}>{cols}</div>);

  }

  return (<div style={styles.table.container}>{rows}</div>);

};


export class RQAPlot extends Component {

  constructor(props){
    super(props);
    this.rqa = [[],[]];
    this.formatRQA = this.formatRQA.bind(this);
    this.initPlot();
  }



  initPlot(){

  }

  updatePlot(){

  }

  createPlot(el,d){

  }

  formatRQA(rqa){

    let c = 5,
      i = 0,
      j = 0,
      e;

    console.log(rqa);

    if(rqa) {

      for (e in rqa) {

        if (rqa.hasOwnProperty(e)) {

          if(j === c) { j = 0; i++;}
          this.rqa[i][2*j] = e+': ';
          this.rqa[i][2*j+1] = rqa[e] ? rqa[e].toFixed(2) : rqa[e];
          j++;
        }
      }

      console.log(this.rqa);
      //
      // this.rqa[0][0] = "rr:" ;
      // this.rqa[0][1] = rqa.rr.toFixed(2);
      // this.rqa[0][2] = "det:" ;
      // this.rqa[0][3] = rqa.det.toFixed(2)];
      // this.rqa[0][4] = "entropy:";
      // this.rqa[0][5] = rqa.entropy.toFixed(2) ;
      // this.rqa[0][6] = "l:";
      // this.rqa[0][7]= rqa.l.toFixed(2);
      //
      // this.rqa[0][7] = ["lmax:" + rqa.lmax.toFixed(2)];
      //
      // this.rqa[1][0] = ["lam:" + rqa.lam.toFixed(2)];
      // this.rqa[1][1] = ["tt:" + rqa.tt.toFixed(2)];
      // this.rqa[1][2] = ["vmax:" + rqa.vmax.toFixed(2)];
      // this.rqa[1][3] = ["dsq:" + rqa.dsq.toFixed(2)];
      // this.rqa[1][4] = ["odr:" + rqa.odr.toFixed(2)];

    }
    return this.rqa;
  }


  componentDidMount() {
    console.log('mounted');
    //create
  }


  componentWillUnmount() {
    console.log('unmounting')
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {

    return (
      <div style={styles.holder}>
        <Table data={this.formatRQA(this.props.rqa)}/>
        {/*{ JSON.stringify(this.props.rqa) + ''}*/}
      </div>
    );

  }

}


