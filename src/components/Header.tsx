import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { RootState } from '../store/store';
import { BoardList, Modal, SHeader, SOptions } from './styledComponents/styles';
import { deleteBoard, setActiveBoard } from '../store/board';
import logoMobile from '../assets/icons/logo-mobile.svg';
import down from '../assets/icons/icon-chevron-down.svg';
import up from '../assets/icons/icon-chevron-up.svg';
import options from '../assets/icons/icon-vertical-ellipsis.svg';
import AddTask from './AddTask';
import EditBoard from './EditBoard';
import AddBoard from './AddBoard';

const Header = () => {
  const dispatch = useDispatch();
  const boardList = useSelector((state: RootState) => state.board.data.boards);
  const activeBoard = useSelector((state: RootState) => state.board.boardName);
  let boardNames: string[] = boardList.map((brdlist) => brdlist.name);

  const [modalOpen, setModalOpen] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [optionsClicked, setOptionsClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [addBoard, setAddBoard] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

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
  };

  useEffect(() => {
    document.querySelector('.header')?.classList.toggle('active');
  }, [modalOpen, addTask, editClicked]);

  const toggleAdd = () => {
    addTask ? setAddTask(false) : setAddTask(true);
  };
  // addTask && document.querySelector('.boardList')?.classList.add('inactive');

  const toggleOptions = () => {
    optionsClicked ? setOptionsClicked(false) : setOptionsClicked(true);
  };

  useLayoutEffect(() => {
    null !== optionsRef.current &&
      optionsRef.current.classList.toggle('active');
  }, [optionsClicked]);

  const handleDelete = () => {
    dispatch(deleteBoard());
  };

  return (
    <SHeader>
      <div className="start">
        <div className="logo">
          <img src={logoMobile} alt="logo" />
        </div>
        <h1>{activeBoard}</h1>
        <button onClick={toggleModal}>
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
                <button key={brdname} onClick={() => handleOptChange(brdname)}>
                  {brdname}
                </button>
              ))}
              <button onClick={() => setAddBoard(true)}>
                + Create New Board
              </button>
            </BoardList>
          )}
          {addBoard && <AddBoard />}
          {addTask && <AddTask closeModal={closeModal} />}
          {editClicked && <EditBoard closeModal={closeModal} />}
        </Modal>
      </div>
      <div className="end">
        <button onClick={toggleAdd}>
          +<span> Add new task</span>
        </button>
        <button onClick={toggleOptions}>
          <img src={options} alt="options" />
        </button>
        <SOptions ref={optionsRef} className="header">
          <button onClick={() => setEditClicked(true)}>Edit Board</button>
          <button onClick={() => handleDelete()}>Delete Board</button>
        </SOptions>
      </div>
    </SHeader>
  );
};

export default Header;
