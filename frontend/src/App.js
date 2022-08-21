import { Component } from 'react';
import FrontPage from './components/pages/frontPage';
import { Link } from 'react-router-dom';


class App extends Component{
  render() {
    return (
      <div>
        <FrontPage />
      </div>
    )
  }
}

export default App;
