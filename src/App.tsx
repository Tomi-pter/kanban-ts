import Board from './components/Board';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Main } from './components/styledComponents/styles';

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Board />
        <Sidebar />
      </Main>
    </div>
  );
}

export default App;
