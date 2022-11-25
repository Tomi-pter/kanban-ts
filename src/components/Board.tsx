import { useEffect, useRef, useState } from 'react';
import { dragndropTask } from '../store/board';
import Item from './Item';
import { OptModal, SBoard } from './styledComponents/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import EditBoard from './EditBoard';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Board = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) =>
    state.board.data.boards.filter((brd) => brd.name === state.board.boardName)
  );
  // const boardName = useAppSelector((state) => state.board.boardName);
  console.log(board);

  // dispatch(
  //   dragndropTask({
  //     colName,
  //     dragIndex,
  //     dragStatus
  //   })
  // );

  const ref = useRef<HTMLUListElement>(null);
  const [editClicked, setEditClicked] = useState(false);

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

  const onDragEnd = (result: any) => {
    console.log(result);
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const dragIndex: number = source.index;
    const dragStatus: string = source.droppableId;
    const dropIndex: number = destination.index;
    const dropStatus: string = destination.droppableId;
    dispatch(
      dragndropTask({
        dragIndex,
        dragStatus,
        draggableId,
        dropIndex,
        dropStatus
      })
    );
  };

  const handleAddCol = () => {
    setEditClicked(true);
  };

  useEffect(() => {
    document.querySelector('.optModal')?.classList.add('open');
  }, [editClicked]);

  const closeModal = () => {
    setEditClicked(false);
  };

  window.addEventListener('keydown', (e) => {
    e.key === 'Escape' && closeModal();
  });

  return (
    <>
      {board ? (
        board.map(({ columns }, index) => (
          <DragDropContext onDragEnd={onDragEnd} key={index}>
            <SBoard className="sboard">
              {columns.map(({ name, tasks }) => (
                <div key={name}>
                  <h3>
                    <div className="circle"></div>
                    {name} ({tasks.length})
                  </h3>
                  <Droppable droppableId={name}>
                    {(provided: any) => (
                      <ul
                        className="tasksList"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {tasks.length > 0 ? (
                          tasks.map(
                            (
                              { title, description, status, subtasks },
                              index
                            ) => (
                              <Item
                                taskTitle={title}
                                description={description}
                                status={status}
                                subtasks={subtasks}
                                taskIndex={index}
                                colName={name}
                                key={`${index.toString()}_${title}`}
                              />
                            )
                          )
                        ) : (
                          <ul
                            className="tasksList empty"
                            ref={ref}
                            title={name}
                          ></ul>
                        )}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              ))}
              <ul className="tasksList empty addT">
                <button onClick={handleAddCol}>+ Add Column</button>
                {editClicked && (
                  <OptModal className="optModal" onClick={closeModal}>
                    <EditBoard closeModal={closeModal} />
                  </OptModal>
                )}
              </ul>
            </SBoard>
          </DragDropContext>
        ))
      ) : (
        <h1>no board</h1>
      )}
    </>
  );
};

export default Board;
