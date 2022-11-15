// import { FC } from 'react';
import { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { ItemProps } from '../interfaces/interface';
import { RootState } from '../store/store';
import { Modal } from './styledComponents/styles';
import ViewTask from './ViewTask';

const Item = ({
  taskTitle,
  description,
  status,
  subtasks,
  taskIndex,
  colName
}: ItemProps) => {
  const tasks = useSelector((state: RootState) =>
    state.board.data.boards
      .find((brd) => brd.name === state.board.boardName)
      ?.columns.find((col) => col.name === colName)
      ?.tasks.find((tsk) => tsk.title === taskTitle)
  );

  const [itemOpen, setItemOpen] = useState(false);

  const handleItemClick = () => {
    itemOpen ? setItemOpen(false) : setItemOpen(true);

    console.log(taskTitle, taskIndex, colName);
  };

  const handleDimClicked = () => {
    setItemOpen(false);
  };

  useEffect(() => {
    setItemOpen(false);
  }, [tasks?.status]);

  return (
    <>
      <Draggable draggableId={taskTitle} index={taskIndex}>
        {(provided: any) => (
          <li
            onClick={handleItemClick}
            style={{}}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h4>{taskTitle}</h4>
            <p>
              {subtasks.filter((subs) => subs.isCompleted).length} of{' '}
              {subtasks.length} subtasks
            </p>
          </li>
        )}
      </Draggable>
      {itemOpen && (
        <Modal className="item active" onClick={handleDimClicked}>
          <ViewTask
            colName={colName}
            taskTitle={taskTitle}
            taskIndex={taskIndex}
            handleDimClicked={handleDimClicked}
          />
        </Modal>
      )}
    </>
  );
};

export default Item;
