import sun from '../assets/icons/icon-light-theme.svg';
import moon from '../assets/icons/icon-dark-theme.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setTheme } from '../store/board';
import { SThemeToggle } from './styledComponents/styles';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.board.theme);

  const handleToggle = () => {
    dispatch(setTheme(theme ? false : true));
  };

  !theme
    ? document
        .querySelectorAll('header, .side, main, sboard, .tasksList')
        ?.forEach((all) => all.classList.add('dark'))
    : document
        .querySelectorAll('header, .side, main, sboard, .tasksList')
        ?.forEach((all) => all.classList.remove('dark'));

  return (
    <SThemeToggle className="toggleDiv">
      <label htmlFor="darkmode" onClick={handleToggle}>
        <img src={sun} alt="light mode" />
      </label>
      <div className="toggleCheck">
        <input
          type="checkbox"
          name="darkmode"
          id="darkmode"
          className={theme ? 'checked' : ''}
          onClick={handleToggle}
          disabled
        />
        <span className="slider" onClick={handleToggle}></span>
      </div>
      <label htmlFor="darkmode" onClick={handleToggle}>
        <img src={moon} alt="dark mode" />
      </label>
    </SThemeToggle>
  );
};

export default ThemeToggle;
