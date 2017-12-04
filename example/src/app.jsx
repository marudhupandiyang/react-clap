import React from 'react';
import ClapComponent from 'react-clap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clapsCount: 0,
      totalClapCount: 100,
    };
  }

  render() {
    return (
      <div className="container">
        <h3> My Total Clap Count: {this.state.totalClapCount} </h3>
        <h3> My Clap Count: {this.state.clapsCount} </h3>
        <ClapComponent
          totalCount={this.state.totalClapCount}
          popupClapCount={this.state.clapsCount}
          onChange={(newClapCount, diff) => {
            this.setState({
              clapsCount: newClapCount,
              totalClapCount: this.state.totalClapCount + diff,
            });
          }}
        />
      </div>
    );
  }
}

export default App;
