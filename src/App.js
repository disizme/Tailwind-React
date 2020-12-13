import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "./Store";
import Routes from "./components/routes/Routes";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;