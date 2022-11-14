import { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { dragndropTask } from '../store/board';
import { RootState } from '../store/store';
import Item from './Item';
import { SBoard } from './styledComponents/styles';

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) =>
    state.board.data.boards.filter((brd) => brd.name === state.board.boardName)
  );
  // const boardName = useSelector((state: RootState) => state.board.boardName);
  console.log(board);

  const moveList = (
    dragIndex: number,
    hoverIndex: number,
    colName: string,
    dragStatus: string
  ) => {
    dispatch(dragndropTask({ colName, dragIndex, hoverIndex, dragStatus }));
  };

  const [, dropRef] = useDrop({
    accept: 'item',
    drop: (item: any) => {
      const dragIndex = item.index;
      const dragStatus = item.status;
      const colName = `${ref.current?.title}`;
      console.log(item, ref.current?.title);
      dispatch(
        dragndropTask({
          colName,
          dragIndex,
          dragStatus
        })
      );
    }
  });

  const ref = useRef<HTMLUListElement>(null);
  dropRef(ref);

  const colors = [
    '#49c4e5',
    '#8471f2',
    '#67e2ae',
    '#a958bb',
    '#a28d54',
    '#df1f58'
  ];
  useEffect(() => {
    const circles = document.querySelectorAll<HTMLElement>('.circle');
    circles.forEach((circle, index) => {
      circle.style.backgroundColor = colors[index];

      if (!colors[index]) {
        colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        circle.style.backgroundColor = colors[index];
      }
    });

    // console.log(Math.floor(Math.random() * 16777215).toString(16));
  });

  return (
    <>
      {board ? (
        board.map(({ columns }, index) => (
          <SBoard key={index} className="sboard">
            {columns.map(({ name, tasks }) => (
              <div key={name}>
                <h3>
                  <div className="circle"></div>
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
                          moveList={moveList}
                        />
                      )
                    )
                  ) : (
                    <ul className="tasksList empty" ref={ref} title={name}></ul>
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
