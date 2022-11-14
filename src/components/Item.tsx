// import { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
// import { mergeRefs } from 'react-merge-refs';
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
  colName,
  moveList
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

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { status, taskIndex, colName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    hover: (item: any, monitor) => {
      const dragIndex = item.index;
      const dragStatus = item.status;
      const hoverIndex = taskIndex;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      if (hoverBoundingRect) {
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const client = monitor.getClientOffset();
        if (client) {
          const hoverActualY = client.y - hoverBoundingRect.top;

          // if dragging down, continue only when hover is smaller than middle Y
          if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
          // if dragging up, continue only when hover is bigger than middle Y
          if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

          moveList(dragIndex, hoverIndex, colName, dragStatus);
          item.index = hoverIndex;
        }
      }
    }
  });

  const ref = useRef<HTMLLIElement>(null);
  dragRef(dropRef(ref));

  // const newRef = mergeRefs([dragRef, dropRef, ref]);
  const opacity = isDragging ? 0 : 1;

  return (
    <>
      <li onClick={handleItemClick} ref={ref} style={{ opacity }}>
        <h4>{taskTitle}</h4>
        <p>
          {subtasks.filter((subs) => subs.isCompleted).length} of{' '}
          {subtasks.length} subtasks
        </p>
      </li>
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
