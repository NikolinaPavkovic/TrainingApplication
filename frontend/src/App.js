import { Component } from 'react';
import Cards from './components/cards';
import Hero from './components/hero';
import Info from './components/info';
import Navbar from './components/navbar';
import Newsletter from './components/newsletter';


class App extends Component{
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
        <Info />
        <Newsletter />
        <Cards />
      </div>
    )
  }
}

export default App;
