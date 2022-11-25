import { render, RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { boardReducer } from './store/board';
import { RootState } from './store/store';
import { PropsWithChildren } from 'react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: any;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { board: boardReducer },
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';

export { renderWithProviders };
