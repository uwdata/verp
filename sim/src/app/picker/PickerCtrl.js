/**
 * Created by cdemira on 12/2/16.
 */

import React, {Component} from 'react';



export const Select = props => (

  <select className={props.className} onChange={props.onChange}>
    {props.options.map((opt,i)=>{return <option key={i}>{opt}</option>;})}
  </select>

);


export default class PickerCtrl extends Component {

  constructor(props){

    super(props);

    this.state = {
      pickOptions:['single', 'spray'],
      scaleXMin:0,
      scaleXMax:100,
      scaleYMin:0,
      scaleYMax:100
    };


    this.handleScaleChange  = this.handleScaleChange.bind(this);
    this.handleModeChange  = this.handleModeChange.bind(this);


  }


  handleModeChange(e) {
    this.props.onModeChange(e.target.value);
  }

  handleScaleChange(type, e){


    var scale = {};
    scale[type]=+e.target.value;

    this.setState(scale);

    this.props.onScaleChange(scale);


  }

  render() {

    var s = this.state,
      p = this.props;

    return (
      <div>
        <div className="row">
          <label className="col-sm-2">pick <input type="radio"
                   name="mode"
                   value="pick"
                   checked={p.mode ==="pick"}
                   onChange={this.handleModeChange}/>
          </label>
          <label className="col-sm-2">brush <input type="radio"
                   name="mode"
                   value="brush"
                   checked={p.mode ==="brush"}
                   onChange={this.handleModeChange}/>
          </label>
          <label className="col-sm-4">type: <Select  options={s.pickOptions}/></label>
          <button type="button" className="btn btn-sm btn-secondary col-sm-2" onClick={this.props.onClear}>Clear</button>
          <button type="button" className="btn btn-sm btn-secondary col-sm-2">Export</button>
        </div>

        <div className="row">
          <label className="col-sm-2"> scaleX </label>
          <div className="col-sm-5">
            <input type="number" onChange={this.handleScaleChange.bind(this,'scaleXMin')} value={s.scaleXMin}  className="form-control"/>
          </div>
          <div className="col-sm-5">
            <input type="number" onChange={this.handleScaleChange.bind(this,'scaleXMax')} value={s.scaleXMax} className="form-control"/>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-2">scaleY </label>
          <div className="col-sm-5">
            <input type="number" onChange={this.handleScaleChange.bind(this, 'scaleYMin')} value={s.scaleYMin}  className="form-control"/>
          </div>
          <div className="col-sm-5">
            <input  onChange={this.handleScaleChange.bind(this,'scaleYMax')} value={s.scaleYMax}  className="form-control"/>
          </div>
        </div>
      </div>
    );
  }
}
