import styled from 'styled-components';

export const SHeader = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: -1px;
  z-index: 2;
  background-color: var(--white);

  h1 {
    font-size: 1.2rem;
    margin: 0;
    padding-inline: 0.5rem;
  }

  .start {
    display: flex;
  }

  .end {
    display: flex;

    span {
      display: none;
    }

    button:first-of-type {
      padding: 0.5rem 1rem;
      background-color: var(--purple-main);
      border-radius: 1rem;
      color: var(--white);
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0;
  z-index: 1;
  display: none;

  &.header {
    top: 10vh;
  }

  &.active {
    display: block;
  }

  &.item {
    z-index: 3;
  }
  &.item.active {
    place-items: center;
    display: grid;
  }
`;

export const BoardList = styled.section`
  width: 50vw;
  background-color: var(--white);
  margin-inline: auto;
  margin-top: 1rem;
  border-radius: 0.5rem;

  &.inactive {
    display: none;
  }

  button {
    display: block;
    width: 100%;
    padding: 1rem;
  }
`;

export const Main = styled.main`
  background-color: var(--light-grey);
  min-height: 100vh;
  min-width: 100vw;
  display: block;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: auto;
  margin-top: -1px;
`;

export const SBoard = styled.section`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;

  h3 {
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;

    &.tasksList {
      width: 17.5rem;

      > li {
        background-color: var(--white);
        padding: 1.5rem 1rem;
        border-radius: 0.5rem;
        box-shadow: rgb(0 0 0 / 13%) 1px 1px 10px;
        margin-bottom: 1.5rem;
      }
    }
  }
`;

export const ItemDetails = styled.section`
  background-color: var(--white);
  max-width: 80vw;
  max-height: 70vh;
  margin: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: auto;
  position: relative;

  &.viewtask.cover {
    display: none;
  }

  /* &.addtask {
    position: absolute;
    top: 0;
  } */

  .titleOpt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;

    .title {
      max-width: 80%;
      h5,
      p {
        margin: 0;
      }
    }
  }

  li {
    padding-block: 0.5rem;
    margin-block: 0.5rem;
    background-color: var(--light-grey);
  }

  .btn {
    position: relative;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const SOptions = styled.aside`
  position: absolute;
  top: 100%;
  right: -10%;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  width: 20vw;
  z-index: 3;
  display: none;

  &.header {
    right: 0;
  }

  &.active {
    display: block;
  }

  button {
    padding: 0.5rem;
  }
`;
