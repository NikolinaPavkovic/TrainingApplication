import { Component } from 'react';
import Hero from './components/hero';
import Info from './components/info';
import Navbar from './components/navbar';


class App extends Component{
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
        <Info />
      </div>
    )
  }
}

export default App;
