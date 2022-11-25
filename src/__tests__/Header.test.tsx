import Header from '../components/Header';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import userEvent from '@testing-library/user-event';
import Board from '../components/Board';

describe('Header', () => {
  test('clicking on an item on boardlist should change board', async () => {
    renderWithProviders(<Header />);
    const down = screen.getByRole('button', { name: /open/i });
    // down.click();
    userEvent.click(down);

    const btn = await screen.findByRole('button', { name: /marketing plan/i });
    // btn.click();
    userEvent.click(btn);

    const head = screen.getByRole('heading', { name: /marketing plan/i });
    expect(head.textContent).toMatch(/marketing plan/i);
  });

  test('adding new task', async () => {
    renderWithProviders(<Header />);
    renderWithProviders(<Board />);
    const btn = screen.getByRole('button', { name: /add task/i });
    expect(btn).toBeEnabled();

    userEvent.click(btn);

    expect(
      await screen.findByRole('heading', { name: /add task/i })
    ).toBeInTheDocument();

    // const title = await screen.findByRole('textbox', { name: /title/i });
    // userEvent.type(title, 'new task');

    // userEvent.type(await screen.findByTestId('0id'), 'new sub');

    // userEvent.click(await screen.findByTestId('add'));

    // expect(
    //   await screen.findByRole('heading', { name: /new task/i })
    // ).toBeInTheDocument();
  });
});
