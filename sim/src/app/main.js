import React, {Component} from 'react';
import {Header} from './header';
import {Picker} from './picker/Picker';
import {Recurrence} from './recurrence/Recurrence';
import {Footer} from './footer';

import "!style!css!bootstrap/dist/css/bootstrap.css";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

export class Main extends Component {


  constructor(props){

    super(props);

    this.state = {data:[], pickerSelection:[], rpSelection:[]};
    this.handleDataUpdate= this.handleDataUpdate.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handlePickerPlotBrush = this.handlePickerPlotBrush.bind(this);
    this.getData = this.getData.bind(this);

  }

  getData(){
   return this.state.data;
  }

 handleClear(){
    // console.log('clearing points');
    this.setState({data:[]});
    console.log(this.state.data);
 }

 handlePickerPlotBrush(s){

   this.setState({pickerSelection:s});

 }

  handleDataUpdate(data){
    // console.log('handling data update');
    // this.state.data.push(data);
    this.setState({data: [...this.state.data, data]});
  }

  render() {
    return (
      <div style={styles.container}>
        <Header/>
        <main style={styles.main}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <Picker data={this.state.data}
                        selection={this.state.rpSelection}
                        onDataUpdate={this.handleDataUpdate}
                        onClear={this.handleClear}
                        onBrush={this.handlePickerPlotBrush}
                />
              </div>
              <div className="col-sm-6">
                <Recurrence data={this.state.data}
                            selection={this.state.pickerSelection}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}
