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

  &.dark {
    background-color: var(--dark-grey);
    color: var(--white);

    .prompt {
      background-color: var(--dark-grey);
    }

    section.addtask,
    section.viewtask {
      background-color: var(--dark-grey);
      color: var(--white);
    }
    input,
    select,
    textarea,
    option {
      background-color: var(--dark-grey);
      color: var(--white);
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 1.5px;
    height: 100%;
    background-color: var(--lines-light);
    left: 30%;
  }

  h1 {
    font-size: 1.2rem;
    margin: 0;
    padding-inline: 0.5rem;
  }

  .start {
    display: flex;
  }

  .logoDesk {
    display: none;
  }

  .end {
    display: flex;
    gap: 1rem;

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

  @media screen and (min-width: 641px) {
    .logo {
      display: none;
    }
    .logoDesk {
      display: block;
      /* border-right: 1px solid var(--lines-dark); */
      /* padding-right: 7rem; */
    }
    h1 {
      position: absolute;
      left: 32%;
    }
    .down {
      display: none;
    }
    .end {
      span {
        display: unset;
      }
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

    .addtask {
      margin-top: 2rem;
    }

    &.dark {
      section.addtask,
      section.viewtask {
        background-color: var(--dark-grey);
        color: var(--white);
      }
      input,
      select,
      textarea,
      option {
        background-color: var(--dark-grey);
        color: var(--white);
      }
    }
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
  width: 60vw;
  max-height: 80vh;
  background-color: var(--white);
  margin-inline: auto;
  margin-top: 1rem;
  border-radius: 0.5rem;
  overflow-y: scroll;
  color: var(--medium-grey);

  &.side {
    width: 100%;
    background-color: transparent;
  }

  &.inactive {
    display: none;
  }

  button {
    display: flex;
    width: 85%;
    padding: 1rem;
    color: var(--medium-grey);

    span {
      padding-left: 0.5rem;
      font-weight: 700;
    }

    &.active {
      background-color: var(--purple-main);
      color: var(--white);
      border-top-right-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
    }

    &.newBo {
      color: var(--purple-main);
    }
  }

  h3 {
    padding-left: 1rem;
    padding-top: 1rem;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 2.4px;
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

  &.dark {
    background-color: var(--vDark-grey);
  }
`;

export const SBoard = styled.section`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  transition: margin 350ms ease-in-out;

  &.dark {
    h3 {
      color: var(--medium-grey);
    }

    .viewtask li {
      background-color: var(--vDark-grey);
      color: var(--medium-grey);
    }
  }

  &.side {
    @media screen and (min-width: 641px) {
      margin-left: clamp(300px, 30vw, 500px);
    }
  }

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  h3 {
    text-transform: uppercase;
    letter-spacing: 2.4px;
    display: flex;
    align-items: center;
  }
  h4 {
    font-weight: 800;
    font-size: 1.3rem;
  }

  ul {
    list-style: none;
    padding: 0;

    &.tasksList {
      width: 17.5rem;

      &.dark {
        > li {
          background-color: var(--dark-grey);
          color: var(--white);
        }

        input + label {
          color: var(--white);
        }

        input:checked + label {
          color: var(--medium-grey);
        }

        section.addtask,
        section.viewtask {
          background-color: var(--dark-grey);
          color: var(--white);

          input,
          select,
          textarea,
          option {
            background-color: var(--dark-grey);
            color: var(--white);
          }
        }
        &.empty {
          background-color: var(--dark-grey);
        }
      }

      &.empty {
        height: 600px;
        background-color: var(--lines-light);
        border-radius: 0.5rem;
      }

      > li {
        background-color: var(--white);
        padding: 1.5rem 1rem;
        border-radius: 0.5rem;
        box-shadow: rgb(0 0 0 / 13%) 1px 1px 10px;
        margin-bottom: 1.5rem;
        cursor: pointer;
      }
    }
  }
`;

export const ItemDetails = styled.section`
  background-color: var(--white);
  max-width: 80vw;
  min-width: 40vw;
  max-height: 70vh;
  margin: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-y: scroll;
  position: relative;

  p {
    padding-block: 0.25rem;
  }
  p:nth-child(3) {
    color: var(--medium-grey);
  }

  input,
  textarea,
  select {
    border: 1px solid var(--medium-grey);
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  select {
    width: 100%;
  }

  &.viewtask.cover {
    display: none;
  }

  &.addtask {
    label {
      color: var(--medium-grey);
      padding-block: 0.5rem;
    }

    .col_input {
      width: 100%;

      input {
        width: 75%;
      }
    }

    .btn {
      width: 100%;
      border-radius: 1.25rem;
      padding: 0.75rem 0;
      margin-block: 0.5rem;

      &.add {
        background-color: var(--lines-light);
        color: var(--purple-main);
      }
      &.create {
        background-color: var(--purple-main);
        color: var(--white);
      }
    }
  }

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
    padding: 0.5rem;
    margin-block: 0.5rem;
    background-color: var(--light-grey);
    border-radius: 0.25rem;
    font-size: 0.85rem;
    color: var(--lines-dark);

    label {
      padding-left: 0.5rem;
      font-weight: 700;
      vertical-align: top;
    }

    input:checked + label {
      text-decoration: line-through;
    }
  }

  .btn {
    position: relative;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  span.error {
    color: var(--red-main);
    font-size: 0.75rem;
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
    display: block;
    top: 0;

    button {
      padding: 0.5rem;
    }
    button:first-of-type {
      padding: 0.5rem;
      background-color: transparent;
      color: var(--black);
    }
  }

  &.prompt {
    display: none;
  }

  button:last-of-type {
    color: var(--red-main);
  }
  &.active {
    display: block;
  }

  button {
    padding: 0.5rem;
    display: block;
  }
`;

export const OptModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 10vh;
  z-index: 1;
`;

export const Prompt = styled.div`
  width: 60vw;
  height: 30vh;
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  border-radius: 0.5rem;
  padding: 1rem;

  .btns {
    display: flex;
    justify-content: space-between;

    button {
      width: 45%;
      padding: 1rem;
      border-radius: 1.5rem;
    }
    button:first-of-type {
      padding: 1rem;
      border-radius: 1.5rem;
      background-color: var(--red-main);
      color: var(--white);
    }
    button:last-of-type {
      background-color: var(--lines-light);
      color: var(--purple-main);
    }
  }
`;

export const SSidebar = styled.aside`
  display: none;

  @media screen and (min-width: 641px) {
    display: block;
    position: fixed;
    width: 0;
    left: 0;
    top: 9vh;
    height: 100%;
    background-color: var(--white);
    transition: width 350ms ease-in-out;

    &.dark {
      background-color: var(--dark-grey);
    }

    &.open {
      width: clamp(300px, 30vw, 500px);
    }
    .show {
      background-color: var(--purple-main);
      padding: 1rem;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      position: absolute;
      top: 75vh;

      img {
        width: 20px;
        height: 15px;
      }
    }
    .hide {
      position: absolute;
      top: 75vh;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--medium-grey);

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const SThemeToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  padding: 0.5rem;
  margin-left: 1rem;
  background-color: var(--lines-light);
  border-radius: 0.25rem;

  img {
    max-width: unset;
    max-height: unset;
  }

  .toggleCheck {
    margin-inline: 2rem;
    position: relative;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: -70%;
    right: 0;
    bottom: 0;
    width: 50px;
    background: linear-gradient(
      to right,
      hsl(236, 72%, 79%),
      hsl(237, 63%, 64%)
    );
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    transform: translateX(26px);
  }

  input:focus + .slider {
    box-shadow: 0.5px 0.5px 1px hsl(237, 63%, 64%);
    opacity: 0.6;
  }

  input.checked + .slider:before {
    transform: translateX(0);
  }

  &.dark .darkToggle {
    background-color: var(--bg-dark);
  }
`;
