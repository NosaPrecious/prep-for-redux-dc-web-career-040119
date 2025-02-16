import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';

import { createStore } from 'redux'

// store is just an object with some methods
// getState - this is a reader method, returns whatever the state is that the redux store knows about

// dispatch

const initialState = {
  isRaining: false,
  mike: "Cheng",
  count: 1765
}

const reducer = (state = initialState, action) => {
  console.log('State Changer is called!');
  console.log('the current state is', state);
  console.log('the action is', action);
  // if (action.type === "START_RAINING") {
  //   return {...state, isRaining: true}
  // } else if (action.type === "INCREMENT") {
  //   return {...state, count: state.count + 1}
  // } else if (action.type === "DECREMENT") {
  //   return {...state, count: state.count - 1}
  // }
  switch(action.type) {
    case "ADD":
      return {...state, count: state.count+= action.payload}

    case "MINUS":
    return {...state.count, count: state.count-= action.payload}

    default:
      return state
    }

}





// subscribe gets called each time we send a message to the store after the reducer is called
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



// store.subscribe(() => {
//   console.log('the new state is', store.getState());
// })



// debugger

// stateTree = {counter: 0}
// componentTree {name: App, children: [
//   {name: Header, chidlren: [], state},
//   {name: Counter, chidlren: [], state},
// ]}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  componentDidMount() {
    store.subscribe(() => this.setState({}))
    //store.subscribe(() => this.forceUpdate())
  }

  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count + upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {

  componentDidMount() {
    //store.subscribe(() => this.setState({}))
    store.subscribe(() => this.forceUpdate())
  }

  increment = (verb, num) => {
    store.dispatch({type: verb, payload: num})
    //this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  decrement = (verb, num) => {
    store.dispatch({type: verb, payload: num})
    // this.setState(prevState => ({ count: prevState.count - 1 }));
  };



  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={() => this.decrement("MINUS", 1)}> - </button>
        <button onClick={() => this.increment("ADD", 1)}> + </button>
        <button onClick={() => this.increment("ADD", 5)}> + 5 </button>
        <button onClick={() => this.increment("ADD", 10)}> + 10 </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
