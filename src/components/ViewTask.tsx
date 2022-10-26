import options from '../assets/icons/icon-vertical-ellipsis.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useLayoutEffect } from 'react';
import {
  IsCompletedFunc,
  StatusP,
  ViewTaskProps
} from '../interfaces/interface';
import { RootState } from '../store/store';
import { ItemDetails, SOptions } from './styledComponents/styles';
import { deleteTask, setIsCompleted, setStatus } from '../store/board';
import EditTask from './EditTask';

const ViewTask = ({
  colName,
  taskTitle,
  taskIndex,
  handleDimClicked
}: ViewTaskProps) => {
  const dispatch = useDispatch();
  const taskDetails = useSelector((state: RootState) =>
    state.board.data.boards
      .find((brd) => brd.name === state.board.boardName)
      ?.columns.find((col) => col.name === colName)
      ?.tasks.find((tsk) => tsk.title === taskTitle)
  );
  const statusList = useSelector(
    (state: RootState) =>
      state.board.data.boards.find((brd) => brd.name === state.board.boardName)
        ?.columns
  );

  const [optionsClicked, setOptionsClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const optionsRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    null !== optionsRef.current &&
      optionsRef.current.classList.toggle('active');
  }, [optionsClicked]);

  const toggleOptions = () => {
    optionsClicked ? setOptionsClicked(false) : setOptionsClicked(true);
  };

  const handleIsCompleted = ({
    colName,
    subs,
    taskTitle,
    index
  }: IsCompletedFunc) => {
    const isCompleted = !subs.isCompleted;
    const subTitle = subs.title;
    const subsIndex = index;
    const newSub = { subTitle, isCompleted };
    dispatch(
      setIsCompleted({
        colName,
        subTitle,
        subsIndex,
        taskTitle,
        isCompleted
      })
    );
    console.log(taskTitle, index, colName, subTitle, newSub);
  };

  const dontCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    { colName, taskTitle, taskIndex }: StatusP
  ) => {
    const status = e.target.value;

    dispatch(setStatus({ status, colName, taskTitle }));
  };

  const handleDeleteTask = (colName: string, taskTitle: string) => {
    dispatch(deleteTask({ colName, taskTitle }));
    handleDimClicked();
  };

  editClicked &&
    document.querySelector('section.viewtask')?.classList.add('cover');

  return (
    <>
      <ItemDetails className="viewtask" onClick={(e) => dontCloseModal(e)}>
        <div className="titleOpt">
          <div className="title">
            <h5>{taskDetails?.title}</h5>
            <p>
              subtasks (
              {taskDetails?.subtasks.filter((subs) => subs.isCompleted).length}{' '}
              of {taskDetails?.subtasks.length})
            </p>
          </div>
          <div className="btn">
            <button onClick={toggleOptions}>
              <img src={options} alt="options" />
            </button>
            <SOptions ref={optionsRef}>
              <button onClick={() => setEditClicked(true)}>Edit Task</button>
              <button onClick={() => handleDeleteTask(colName, taskTitle)}>
                Delete Task
              </button>
            </SOptions>
          </div>
        </div>
        <ul>
          {taskDetails?.subtasks.map((subs, index) => (
            <li key={index}>
              <input
                type="checkbox"
                name={subs.title}
                id={subs.title}
                defaultChecked={subs.isCompleted ? true : false}
                onChange={() =>
                  handleIsCompleted({ colName, subs, taskTitle, index })
                }
              />
              <label htmlFor={subs.title}>{subs.title}</label>
            </li>
          ))}
        </ul>
        <select
          name="status"
          id="status"
          value={taskDetails?.status ? taskDetails.status : colName}
          onChange={(e) =>
            handleStatusChange(e, { colName, taskTitle, taskIndex })
          }
        >
          {statusList?.map((list, index) => (
            <option value={list.name} key={index}>
              {list.name}
            </option>
          ))}
        </select>
      </ItemDetails>
      {editClicked && (
        <EditTask
          colName={colName}
          taskIndex={taskIndex}
          taskTitle={taskTitle}
          taskDetails={taskDetails}
          handleDimClicked={handleDimClicked}
        />
      )}
    </>
  );
};

export default ViewTask;
