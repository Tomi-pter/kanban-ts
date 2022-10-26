import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Item from './Item';
import { SBoard } from './styledComponents/styles';

const Board = () => {
  const board = useSelector((state: RootState) =>
    state.board.data.boards.filter((brd) => brd.name === state.board.boardName)
  );
  console.log(board);

  return (
    <>
      {board ? (
        board.map(({ columns }, index) => (
          <SBoard key={index}>
            {columns.map(({ name, tasks }) => (
              <div key={name}>
                <h3>
                  {name} ({tasks.length})
                </h3>
                <ul className="tasksList">
                  {tasks.length > 0 ? (
                    tasks.map(
                      ({ title, description, status, subtasks }, index) => (
                        <Item
                          taskTitle={title}
                          description={description}
                          status={status}
                          subtasks={subtasks}
                          key={title}
                          taskIndex={index}
                          colName={name}
                        />
                      )
                    )
                  ) : (
                    <h1>no task</h1>
                  )}
                </ul>
              </div>
            ))}
          </SBoard>
        ))
      ) : (
        <h1>no board</h1>
      )}
    </>
  );
};

export default Board;
