import viewSide from '../assets/icons/icon-show-sidebar.svg';
import hideSide from '../assets/icons/icon-hide-sidebar.svg';
import { BoardList, Modal, SSidebar } from './styledComponents/styles';
import brdsvg from '../assets/icons/icon-board.svg';
import { setActiveBoard, setSidebar } from '../store/board';
import { useEffect, useState } from 'react';
import AddBoard from './AddBoard';
import ThemeToggle from './ThemeToggle';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.board.sideBar);
  const boardList = useAppSelector((state) => state.board.data.boards);
  const activeBoard = useAppSelector((state) => state.board.boardName);
  let boardNames: string[] = boardList.map((brdlist) => brdlist.name);

  const handleOptChange = (brdname: string) => {
    dispatch(setActiveBoard(brdname));
  };

  const [addBoard, setAddBoard] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setAddBoard(false);
  };

  useEffect(() => {
    modalOpen &&
      document.querySelector('.header.side')?.classList.add('active');
    !modalOpen &&
      document.querySelector('.header.side')?.classList.remove('active');
  }, [modalOpen]);

  const handleShowClick = () => {
    dispatch(setSidebar(sidebar ? false : true));
  };

  useEffect(() => {
    if (sidebar) {
      document.querySelector('aside.side')?.classList.add('open');
      document.querySelector('.sboard')?.classList.add('side');
    } else {
      document.querySelector('aside.side')?.classList.remove('open');
      document.querySelector('.sboard')?.classList.remove('side');
    }
  }, [sidebar]);

  return (
    <SSidebar className="side">
      <BoardList className="boardList side">
        <h3>All boards ({boardNames.length})</h3>
        <div className="brds">
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
        </div>
        <button
          onClick={() => {
            setAddBoard(true);
            toggleModal();
          }}
          className="newBo"
        >
          <img src={brdsvg} alt="" />
          <span>+ Create New Board</span>
        </button>
        <ThemeToggle />
      </BoardList>
      <button className={sidebar ? 'hide' : 'show'} onClick={handleShowClick}>
        <img
          src={sidebar ? hideSide : viewSide}
          alt={sidebar ? 'hide sidebar' : 'show sidebar'}
        />
        {sidebar && <span>Hide Sidebar</span>}
      </button>

      <Modal className="header side" onClick={closeModal}>
        {addBoard && <AddBoard closeModal={closeModal} />}
      </Modal>
    </SSidebar>
  );
};

export default Sidebar;
