import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import Header from './components/Header'
import Footer from './components/Footer'
import AppContainer from './container/AppContainer'

class Root extends Component {
  render() {
    return (
      <main>
        <Header />
        <AppContainer />
        <Footer />
      </main>
    )
  }
}

export default Root
