import React, {Component} from 'react';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    boxShadow: '0px 3px 1px #888888'
    // fontFamily:'Avenir'
  },
  title: {
    flex: 1,
    color:'white',
    fontSize: '1.5rem',
    margin: '1rem'
  },
  date: {
    flex: 1,
    textAlign: 'right',
    margin: '1rem',
    color: 'white'
  }
};

export class Header extends Component {
  render() {
    return (
      <header style={styles.header}>
        <p style={styles.title}>
            Data Generator
        </p>
        <p style={styles.date}>
            A VERP Explorer Project
        </p>
      </header>
    );
  }
}
