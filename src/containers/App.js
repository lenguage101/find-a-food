import React, { Component, Fragment} from 'react';
import Header from '../components/layouts/Header';
import MainContent from '../components/main-content/MainContent'
import Footer from '../components/layouts/Footer';


class App extends Component {
  render() {
    return (
      <Fragment>
      	<Header />
      	<MainContent />
      	<Footer />
      </Fragment>
    );
  }
}

export default App;
 