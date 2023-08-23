import React, { Fragment } from 'react';
import './index.css';
import Header from './Layout/Header';
import Items from './Items/Items';

const App = () => {
  return (
    <div className="App">
      <Fragment>
        <Header />
        <main>
          <div className="max-w-6xl mx-auto">
            <Items />
          </div>
        </main>
      </Fragment>
    </div>
  );
}

export default App;