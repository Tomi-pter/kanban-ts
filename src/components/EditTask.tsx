import { EditTaskProps, Errors, NewTask } from '../interfaces/interface';
import { ItemDetails } from './styledComponents/styles';
import close from '../assets/icons/icon-cross.svg';
import { useState } from 'react';
import { editTask } from '../store/board';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const EditTask = ({
  colName,
  taskIndex,
  taskTitle,
  taskDetails,
  handleDimClicked
}: EditTaskProps) => {
  const dontCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const dispatch = useAppDispatch();
  const statusList = useAppSelector(
    (state) =>
      state.board.data.boards.find((brd) => brd.name === state.board.boardName)
        ?.columns
  );
  const taskList = useAppSelector((state) =>
    state.board.data.boards
      .find((brd) => brd.name === state.board.boardName)
      ?.columns.map((cols) => cols.tasks)
  );

  const [newTask, setNewTask] = useState(taskDetails);
  const [errors, setErrors] = useState<Errors>({
    title: '',
    subs: ''
  });
  let subsList: Array<{ title: string; isCompleted: boolean }> = JSON.parse(
    JSON.stringify(newTask?.subtasks)
  );

  const taskCopy: NewTask = JSON.parse(JSON.stringify(newTask));

  const updateFormTitle = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    name === 'title' && (taskCopy.title = value);
    name === 'description' && (taskCopy.description = value);
    setNewTask(taskCopy);
  };

  const setSubsName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    subsList && (subsList[index].title = value);
    taskCopy.subtasks = subsList;
    setNewTask(taskCopy);
  };

  const addSubs = () => {
    subsList?.push({ title: '', isCompleted: false });
    taskCopy.subtasks = subsList;
    setNewTask(taskCopy);
  };

  const delSubs = (index: number) => {
    subsList && subsList.splice(index, 1);
    taskCopy.subtasks = subsList;
    setNewTask(taskCopy);
  };

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    taskCopy.status = value;
    setNewTask(taskCopy);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTask && newTask.title.length < 1) {
      setErrors({
        title: 'please name your task',
        subs: ''
      });
    } else {
      const duplicate = taskList
        ?.map((tsk) =>
          tsk
            .filter((ts) => ts.title === newTask?.title)
            .flatMap((dup) => dup.title)
        )
        .flat();
      console.log(duplicate);
      const cols = newTask?.subtasks.map((subs) => subs.title);

      if (duplicate && duplicate.length > 0 && duplicate[0] !== taskTitle) {
        setErrors({
          title: 'task already exists',
          subs: ''
        });
      } else {
        if (cols?.find((col) => col.length < 1) !== undefined) {
          setErrors({
            title: '',
            subs: 'please name your subtask'
          });
        } else if (cols?.some((col, index) => cols.indexOf(col) !== index)) {
          setErrors({
            title: '',
            subs: 'there is a duplicate subtask'
          });
        } else {
          newTask && dispatch(editTask({ newTask, colName, taskTitle }));
          handleDimClicked();
        }
      }
    }
  };

  return (
    <ItemDetails onClick={(e) => dontCloseModal(e)} className="addtask">
      <div className="container">
        <h2>Edit Task</h2>
        <form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="e.g. Take coffee break"
            value={newTask?.title}
            onChange={(e) => updateFormTitle(e)}
          />
          <span className="error">{errors.title}</span>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={7}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            value={newTask?.description}
            onChange={(e) => updateFormTitle(e)}
          ></textarea>
          <div className="columns">
            <label htmlFor="subtasks">Subtasks</label>
            {newTask?.subtasks.map((col, index) => (
              <div key={index} className="col_input">
                <input
                  type="text"
                  name="title"
                  id="name"
                  value={col.title}
                  onChange={(e) => setSubsName(e, index)}
                />
                <button type="button" onClick={() => delSubs(index)}>
                  <img src={close} alt="close" />
                </button>
              </div>
            ))}
            <span className="error">{errors.subs}</span>
            <button type="button" className="btn add" onClick={addSubs}>
              + Add New Subtask
            </button>
          </div>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={newTask?.status}
            onChange={(e) => changeStatus(e)}
          >
            {statusList?.map((list, index) => (
              <option value={list.name} key={index}>
                {list.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn create"
            onClick={(e) => handleSubmit(e)}
          >
            Edit Task
          </button>
        </form>
      </div>
    </ItemDetails>
  );
};

export default EditTask;
