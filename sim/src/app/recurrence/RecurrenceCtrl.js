/**
 * Created by cdemira on 12/2/16.
 */
import React, {Component} from 'react';
import {Select} from '../picker/PickerCtrl';

const styles = {

  sliderOutput:{ fontWeight:'bold', fontFamily:'Avenir'}

};

export class RecurrenceCtrl extends Component {

  constructor(props){
    super(props);
    this.state = {
      metrics:['Euclidean', 'City-block'],
    };

    console.log(props);

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentDidMount() {
    console.log('mounting');
  }

  componentWillUnmount() {
    console.log('unmounting')
  }

  handleSliderChange(e) {
    this.sliderValue=e.target.value;
    this.props.updateEps(e.target.value);
  }
  handleSelectionChange(e) {
    this.props.updateMetric(e.target.value);
  }

  render() {

    return (
      <div>

        <div className="row">
          <label className="col-sm-2">eps</label>
          <input type="range" className="col-sm-9" onChange={this.handleSliderChange} min="0" max="100" step="1"/>
          <div className="col-sm-1" style={styles.sliderOutput}>{this.sliderValue}</div>
        </div>

        <div className="row">
          <label className="col-sm-2">metric</label>
          <Select className="col-sm-10" options={this.state.metrics} onChange={this.handleSelectionChange}/>
        </div>

      </div>
    );
  }

}
