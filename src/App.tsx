// import {useState} from "react";

import Board from './components/Board';
import Header from './components/Header';
import { Main } from './components/styledComponents/styles';

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Board />
      </Main>
    </div>
  );
}

export default App;
