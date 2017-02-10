import React, {Component} from 'react';

const styles = {
  footer: {
    padding: '0.5rem',
    backgroundColor: '#1f1f1f',
    textAlign: 'center',
    color: 'lightgray',
    fontFamily:'Avenir',
    fontSize:'12px'
    // boxShadow: '0px -3px 2px #888888'
  },
  name:{
    color:'lightgray'
  },
  heart:{
    color:'orangered'
  }

};

export class Footer extends Component {
  render() {
    return (
      <footer style={styles.footer}>
        Built with <span style={styles.heart}>♥</span> by &nbsp;
        <a href="https://hci.stanford.edu/~cagatay/" style={styles.name}>
         Çağatay Demiralp
        </a>
      </footer>
    );
  }
}
