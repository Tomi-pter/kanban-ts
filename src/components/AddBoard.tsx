import { ItemDetails } from './styledComponents/styles';
import close from '../assets/icons/icon-cross.svg';
import { useState } from 'react';
import { BoardCopy, ColList, Errors, NewBoard } from '../interfaces/interface';
import { addBoard } from '../store/board';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface AddBoardProps {
  closeModal: () => void;
}

const AddBoard = ({ closeModal }: AddBoardProps) => {
  const dispatch = useAppDispatch();
  const boardList = useAppSelector((state) =>
    state.board.data.boards.map((brd) => brd.name)
  );

  const [newBoard, setNewBoard] = useState<NewBoard>({
    name: '',
    columns: [
      {
        name: '',
        tasks: []
      }
    ]
  });
  const [errors, setErrors] = useState<Errors>({
    title: '',
    subs: ''
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newBoard.name.length < 1) {
      setErrors({
        title: 'please name your board',
        subs: ''
      });
    } else {
      const duplicate = boardList.find((brlist) => brlist === newBoard.name);
      const cols = newBoard.columns.map((col) => col.name);

      if (duplicate) {
        setErrors({
          title: 'board already exists',
          subs: ''
        });
      } else {
        if (cols.find((col) => col.length < 1) !== undefined) {
          setErrors({
            title: '',
            subs: 'please name your column'
          });
        } else if (cols.some((col, index) => cols.indexOf(col) !== index)) {
          setErrors({
            title: '',
            subs: 'there is a duplicate column'
          });
        } else {
          dispatch(addBoard(newBoard));
          closeModal();
        }
      }
    }
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
          <span className="error">{errors.title}</span>
          <div className="columns">
            <label htmlFor="">Board Columns</label>
            {newBoard?.columns.map((col, index) => (
              <div key={index} className="col_input">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={col.name}
                  data-testid={`${index}col`}
                  onChange={(e) => setColName(e, index)}
                />
                <button type="button" onClick={() => delSubs(index)}>
                  <img src={close} alt="close" />
                </button>
              </div>
            ))}
            <span className="error">{errors.subs}</span>
            <button type="button" className="btn add" onClick={addCol}>
              + Add New Column
            </button>
          </div>
          <button
            className="btn create"
            data-testid="modalCreate"
            onClick={(e) => handleSubmit(e)}
          >
            Create New Board
          </button>
        </form>
      </div>
    </ItemDetails>
  );
};

export default AddBoard;
