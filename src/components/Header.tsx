import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../store/store';
import {
  BoardList,
  Modal,
  OptModal,
  Prompt,
  SHeader,
  SOptions
} from './styledComponents/styles';
import { deleteBoard, setActiveBoard } from '../store/board';
import logoMobile from '../assets/icons/logo-mobile.svg';
import logoLight from '../assets/icons/logo-light.svg';
import logoDark from '../assets/icons/logo-dark.svg';
import down from '../assets/icons/icon-chevron-down.svg';
import up from '../assets/icons/icon-chevron-up.svg';
import options from '../assets/icons/icon-vertical-ellipsis.svg';
import brdsvg from '../assets/icons/icon-board.svg';
import add from '../assets/icons/icon-add-task-mobile.svg';
import AddTask from './AddTask';
import EditBoard from './EditBoard';
import AddBoard from './AddBoard';

const Header = () => {
  const dispatch = useDispatch();
  const boardList = useSelector((state: RootState) => state.board.data.boards);
  const activeBoard = useSelector((state: RootState) => state.board.boardName);
  const theme = useSelector((state: RootState) => state.board.theme);
  let boardNames: string[] = boardList.map((brdlist) => brdlist.name);

  const [modalOpen, setModalOpen] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [optionsClicked, setOptionsClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [addBoard, setAddBoard] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const dontCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleOptChange = (brdname: string) => {
    dispatch(setActiveBoard(brdname));
  };

  const toggleModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setAddTask(false);
    setEditClicked(false);
    setAddBoard(false);
    setOptionsClicked(false);
    setDeleteClicked(false);
  };

  useEffect(() => {
    document.querySelector('.header')?.classList.toggle('active');
  }, [modalOpen, addTask, editClicked]);

  const toggleAdd = () => {
    addTask ? setAddTask(false) : setAddTask(true);
  };
  addBoard && document.querySelector('.boardList')?.classList.add('inactive');

  const toggleOptions = () => {
    optionsClicked ? setOptionsClicked(false) : setOptionsClicked(true);
  };

  deleteClicked && document.querySelector('.sOpt')?.classList.add('prompt');

  const handleDelete = () => {
    dispatch(deleteBoard());
  };

  return (
    <SHeader>
      <div className="start">
        <div className="logo">
          <img src={logoMobile} alt="logo" />
        </div>
        <div className="logoDesk">
          <img src={theme ? logoDark : logoLight} alt="logo" />
        </div>
        <h1>{activeBoard}</h1>
        <button onClick={toggleModal} className="down">
          <img
            src={modalOpen ? up : down}
            alt={`${modalOpen ? 'close' : 'open'}`}
          />
        </button>
        <Modal className="header" onClick={closeModal}>
          {modalOpen && (
            <BoardList className="boardList" onClick={(e) => dontCloseModal(e)}>
              <h3>All boards ({boardNames.length})</h3>
              {boardNames.map((brdname) => (
                <button
                  key={brdname}
                  onClick={() => handleOptChange(brdname)}
                  className={brdname === activeBoard ? 'active' : ''}
                >
                  <img src={brdsvg} alt="" />
                  <span>{brdname}</span>
                </button>
              ))}
              <button onClick={() => setAddBoard(true)} className="newBo">
                <img src={brdsvg} alt="" />
                <span>+ Create New Board</span>
              </button>
            </BoardList>
          )}
          {addBoard && <AddBoard closeModal={closeModal} />}
          {addTask && <AddTask closeModal={closeModal} />}
          {editClicked && <EditBoard closeModal={closeModal} />}
        </Modal>
      </div>
      <div className="end">
        <button onClick={toggleAdd}>
          <img src={add} alt="add task" />
          <span> Add new task</span>
        </button>
        <button onClick={toggleOptions}>
          <img src={options} alt="options" />
        </button>
        {optionsClicked && (
          <OptModal onClick={closeModal}>
            <SOptions
              className="header sOpt"
              onClick={(e) => dontCloseModal(e)}
            >
              <button
                onClick={() => {
                  setEditClicked(true);
                  toggleOptions();
                }}
              >
                Edit Board
              </button>
              <button onClick={() => setDeleteClicked(true)}>
                Delete Board
              </button>
            </SOptions>
            {deleteClicked && (
              <Prompt className="prompt">
                <h2>Delete this board?</h2>
                <p>
                  Are you sure you want to delete the '{activeBoard}' board?
                  This action will remove all columns and tasks and cannot be
                  reversed.
                </p>
                <div className="btns">
                  <button onClick={handleDelete}>Delete</button>
                  <button onClick={closeModal}>Cancel</button>
                </div>
              </Prompt>
            )}
          </OptModal>
        )}
      </div>
    </SHeader>
  );
};

export default Header;
