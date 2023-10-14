import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import { State } from './types';

class App extends React.Component {
  state: State = {
    planets: [],
  };

  async componentDidMount() {
    const urlAPI = 'https://swapi.dev/api/planets';

    const response = await fetch(urlAPI);
    const data = await response.json();

    this.setState({ planets: data.results });
  }

  render() {
    const { planets } = this.state;

    return (
      <>
        <div>Hello, App!</div>
        <Table planets={ planets } />
      </>
    );
  }
}

export default App;
