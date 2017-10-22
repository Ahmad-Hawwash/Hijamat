import React, { Component } from 'react';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    }

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
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<Loginscreen parentContext={this} />);
    this.setState({
      loginPage: loginPage
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;
