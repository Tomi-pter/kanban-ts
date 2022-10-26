import { ItemDetails } from './styledComponents/styles';
import close from '../assets/icons/icon-cross.svg';
import { useState } from 'react';
import { BoardCopy, ColList, NewBoard } from '../interfaces/interface';
import { useDispatch } from 'react-redux';
import { addBoard } from '../store/board';

const AddBoard = () => {
  const dispatch = useDispatch();

  const [newBoard, setNewBoard] = useState<NewBoard>({
    name: '',
    columns: [
      {
        name: '',
        tasks: []
      }
    ]
  });
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
      tasks: []
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
    dispatch(addBoard(newBoard));
  };

  return (
    <ItemDetails className="addtask" onClick={(e) => dontCloseModal(e)}>
      <div className="container">
        <h2>Add Board</h2>
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
            Create New Board
          </button>
        </form>
      </div>
    </ItemDetails>
  );
};

export default AddBoard;
