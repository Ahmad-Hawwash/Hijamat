import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from "./reducers";
import entry from './entry';
import AddPatient from './Patients/AddPatient';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const config = {
      apiKey: 'AIzaSyCk0yd6CgqoaqmpZQD6Ed3NGnHT_iDYBC8',
      authDomain: 'hicamat-c156c.firebaseapp.com',
      databaseURL: 'https://hicamat-c156c.firebaseio.com',
      projectId: 'hicamat-c156c',
      storageBucket: 'hicamat-c156c.appspot.com',
      messagingSenderId: '190092353488'
    };
    firebase.initializeApp(config);

  }


  render() {
    return (
      <Provider store={createStore(reducers)}>
        <BrowserRouter>
          <div>
            <Switch>
              {/* <Route path="/patients/new" component={PatientsNew} /> */}
              <Route path="/patients/new" component={AddPatient} />
              <Route path="/" component={entry} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

const style = {
  margin: 15,
};

export default App;
