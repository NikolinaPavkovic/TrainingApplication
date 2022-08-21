import { Component } from 'react';
import Hero from './components/hero';
import Navbar from './components/navbar';


class App extends Component{
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
        
      </div>
    )
  }
}

export default App;
