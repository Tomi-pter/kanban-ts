import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import close from '../assets/icons/icon-cross.svg';
import { AddTaskProps, NewTask } from '../interfaces/interface';
import { addTask } from '../store/board';
import { RootState } from '../store/store';
import { ItemDetails } from './styledComponents/styles';

const AddTask = ({ closeModal }: AddTaskProps) => {
  const dispatch = useDispatch();
  const statusList = useSelector(
    (state: RootState) =>
      state.board.data.boards.find((brd) => brd.name === state.board.boardName)
        ?.columns
  );

  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    status: statusList ? statusList[0].name : '',
    subtasks: [{ title: '', isCompleted: false }]
  });
  const subsList: Array<{ title: string; isCompleted: boolean }> = [
    ...newTask.subtasks
  ];

  const updateFormTitle = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    name === 'title' && setNewTask({ ...newTask, title: value });
    name === 'description' && setNewTask({ ...newTask, description: value });
  };

  const setSubsName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    subsList && (subsList[index].title = value);
    setNewTask({ ...newTask, subtasks: subsList });
  };

  const addSubs = () => {
    subsList?.push({ title: '', isCompleted: false });
    setNewTask({ ...newTask, subtasks: subsList });
  };

  const delSubs = (index: number) => {
    subsList && subsList.splice(index, 1);
    setNewTask({ ...newTask, subtasks: subsList });
  };

  const dontCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewTask({ ...newTask, status: value });
  };

  const handleSubmit = () => {
    dispatch(addTask(newTask));
    closeModal();
  };

  return (
    <ItemDetails className="addtask" onClick={(e) => dontCloseModal(e)}>
      <div className="container">
        <h2>Add Task</h2>
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
          <button type="button" className="btn create" onClick={handleSubmit}>
            Add Task
          </button>
        </form>
      </div>
    </ItemDetails>
  );
};

export default AddTask;
