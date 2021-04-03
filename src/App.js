import React from 'react';
import logo from './logo.svg';
import './App.css';
import Background from "./components/background"
import { automataContext, context } from "./utils/automataContext"
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ypos: context.yPosition
    }
  }
  render() {

    return (
      <div className="App">
        <automataContext.Provider value={this.context}>
          <Background />
        </automataContext.Provider>
      </div >
    );
  }
}

export default App;
