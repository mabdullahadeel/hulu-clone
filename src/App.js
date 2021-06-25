import React from 'react';
import './App.css';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Results from './Components/Results';
import { connect } from 'react-redux'
import * as action from './redux/actions/auth';
import endpoints from './api/request'

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedOption: endpoints.fetchTrending
    }
    this.setSelectedOption = this.setSelectedOption.bind(this)
  }

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  setSelectedOption(newOption) {
    this.setState({
      selectedOption: newOption
    })
    console.log(newOption)
    console.log(this.state.selectedOption)
  }

  render() {
    return (
      <div className="app">
        {/* Header */}
        <Header />

        {/* navbar */}
        <Navbar setSelectedOption={this.setSelectedOption} />

        {/* Body */}
        <Results
          selectedOption={this.state.selectedOption}
        />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
