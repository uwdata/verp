/**
 * Created by cdemira on 12/2/16.
 */
import React, {Component} from 'react';
import {PickerPlot} from './PickerPlot';
import PickerCtrl from './PickerCtrl';

export class Picker extends Component {

  constructor(props){

    super(props);

    this.state = {
      scaleXMin:0,
      scaleXMax:100,
      scaleYMin:0,
      scaleYMax:100,
      mode:'pick'
    };


    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);

    this.getScale = this.getScale.bind(this);

  }

 getScale(){

    return {

      xScale:[this.state.scaleXMin, this.state.scaleXMax],
      yScale:[this.state.scaleYMin, this.state.scaleYMax]
    };

 }

 handleScaleChange(scale){
    this.setState(scale);
 }

 handleModeChange(mode){
  if ( this.state.mode !== mode ) this.setState({mode:mode});
 }

  render() {
    return (
      <div>

        <PickerPlot data={this.props.data}
                    onDataUpdate={this.props.onDataUpdate}
                    scale={this.getScale}
                    mode={this.state.mode}
                    onBrush={this.props.onBrush}

        />
        <PickerCtrl onClear={this.props.onClear}
                    mode={this.state.mode}
                    onModeChange={this.handleModeChange}
                    onScaleChange={this.handleScaleChange}
        />
      </div>
    );
  }
}
