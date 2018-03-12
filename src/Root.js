import React, { Component } from 'react'
import { Container, Columns, Column, Box } from 'bloomer'
import 'bulma/css/bulma.css'

import Header from './components/Header'
import Footer from './components/Footer'
import ChartsSection from './components/ChartsSection'
import InfoSection from './components/InfoSection'
import ResultsSection from './components/ResultsSection'

class App extends Component {
  render() {
    return (
      <main>
        <Header />

        <InfoSection />

        <ResultsSection />

        <ChartsSection />
        
        <Footer />
      </main>
    )
  }
}

export default App
