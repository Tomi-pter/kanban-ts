import { ItemDetails } from './styledComponents/styles';
import close from '../assets/icons/icon-cross.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';
import { AddTaskProps, BoardCopy, ColList } from '../interfaces/interface';
import { editBoard } from '../store/board';

const EditBoard = ({ closeModal }: AddTaskProps) => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: RootState) =>
    state.board.data.boards.find((brd) => brd.name === state.board.boardName)
  );

  const [newBoard, setNewBoard] = useState(currentBoard);
  let colList: Array<ColList> = JSON.parse(JSON.stringify(newBoard?.columns));
  console.log(newBoard, colList);

  const boardCopy: BoardCopy = JSON.parse(JSON.stringify(newBoard));

  const updateFormTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    name === 'name' && (boardCopy.name = value);
    setNewBoard(boardCopy);
  };

  const setColName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    colList && (colList[index].name = value);
    boardCopy.columns.map((col, index) => (col.name = colList[index].name));
    setNewBoard(boardCopy);
  };

  const addCol = () => {
    colList?.push({
      name: '',
      tasks: [
        // {
        //   title: '',
        //   description: '',
        //   status: '',
        //   subtasks: [{ title: '', isCompleted: false }]
        // }
      ]
    });
    boardCopy.columns = colList;
    setNewBoard(boardCopy);
  };

  const delSubs = (index: number) => {
    colList.splice(index, 1);
    boardCopy.columns = colList;
    setNewBoard(boardCopy);
  };

  const dontCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleSubmit = () => {
    newBoard && dispatch(editBoard({ newBoard }));
    closeModal();
  };

  return (
    <ItemDetails className="addtask" onClick={(e) => dontCloseModal(e)}>
      <div className="container">
        <h2>Edit Board</h2>
        <form>
          <label htmlFor="board_name">Board Name</label>
          <input
            type="text"
            name="name"
            id="board_name"
            placeholder="e.g. Web Design"
            value={newBoard?.name}
            onChange={(e) => updateFormTitle(e)}
            // required
          />
          <div className="columns">
            <label htmlFor="">Board Columns</label>
            {newBoard?.columns.map((col, index) => (
              <div key={index} className="col_input">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={col.name}
                  onChange={(e) => setColName(e, index)}
                  //   required
                />
                <button type="button" onClick={() => delSubs(index)}>
                  <img src={close} alt="close" />
                </button>
              </div>
            ))}
            <button type="button" className="btn add" onClick={addCol}>
              + Add New Column
            </button>
          </div>
          <button type="submit" className="btn create" onClick={handleSubmit}>
            Save Changes
          </button>
        </form>
      </div>
    </ItemDetails>
  );
};

export default EditBoard;
