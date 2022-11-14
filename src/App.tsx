import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './components/Board';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Main } from './components/styledComponents/styles';

function App() {
  return (
    <div className="App">
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Main>
          <Board />
          <Sidebar />
        </Main>
      </DndProvider>
    </div>
  );
}

export default App;
