import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import datajson from '../assets/data/data.json';
import {
  EditTask,
  EditBoard,
  NewTask,
  RootState,
  SetIsCompleted,
  SetStatus,
  DND
} from '../interfaces/interface';

let activeBoard = datajson.boards[0].name;
let sideBar: boolean = true;
const newData = datajson.boards.filter((brd) =>
  brd.columns.filter((col) => col.tasks.map((tsk) => (tsk.status = col.name)))
);
const data = {
  boards: newData
};
let theme: boolean = true;
const initialState: RootState = {
  boardName: activeBoard,
  data,
  sideBar,
  theme
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.boardName = action.payload;
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sideBar = action.payload;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload;
    },
    setIsCompleted: (state, action: PayloadAction<SetIsCompleted>) => {
      const subTasks = state.data.boards
        .find((brds) => brds.name === state.boardName)
        ?.columns.find((col) => col.name === action.payload.colName)
        ?.tasks.find((tsk) => tsk.title === action.payload.taskTitle)?.subtasks;

      subTasks &&
        (subTasks[action.payload.subsIndex].isCompleted =
          action.payload.isCompleted);
    },
    setStatus: (state, action: PayloadAction<SetStatus>) => {
      const task = JSON.parse(
        JSON.stringify(
          state.data.boards
            .find((brds) => brds.name === state.boardName)
            ?.columns.find((col) => col.name === action.payload.colName)
            ?.tasks.find((tsk) => tsk.title === action.payload.taskTitle)
        )
      );

      const taskList = JSON.parse(
        JSON.stringify(
          state.data.boards
            .find((brds) => brds.name === state.boardName)
            ?.columns.find((col) => col.name === action.payload.colName)?.tasks
        )
      );

      const currentIndex = state.data.boards
        .find((brds) => brds.name === state.boardName)
        ?.columns.find((col) => col.name === action.payload.colName)
        ?.tasks.findIndex((tsk) => tsk.title === action.payload.taskTitle);

      currentIndex && taskList.length > 1
        ? state.data.boards
            .find((brds) => brds.name === state.boardName)
            ?.columns.find((col) => col.name === action.payload.colName)
            ?.tasks.splice(currentIndex, 1)
        : state.data.boards
            .find((brds) => brds.name === state.boardName)
            ?.columns.find((col) => col.name === action.payload.colName)
            ?.tasks.splice(0, 1);

      task && (task.status = action.payload.status);

      task &&
        state.data.boards
          .find((brds) => brds.name === state.boardName)
          ?.columns.find((col) => col.name === action.payload.status)
          ?.tasks.push(task);
    },
    editTask: (state, action: PayloadAction<EditTask>) => {
      const currentIndex = state.data.boards
        .find((brds) => brds.name === state.boardName)
        ?.columns.find((col) => col.name === action.payload.colName)
        ?.tasks.findIndex((tsk) => tsk.title === action.payload.taskTitle);

      if (action.payload.newTask?.status === action.payload.colName) {
        currentIndex
          ? state.data.boards
              .find((brds) => brds.name === state.boardName)
              ?.columns.find((col) => col.name === action.payload.colName)
              ?.tasks.splice(currentIndex, 1, action.payload.newTask)
          : state.data.boards
              .find((brds) => brds.name === state.boardName)
              ?.columns.find((col) => col.name === action.payload.colName)
              ?.tasks.splice(0, 1, action.payload.newTask);
      } else {
        currentIndex
          ? state.data.boards
              .find((brds) => brds.name === state.boardName)
              ?.columns.find((col) => col.name === action.payload.colName)
              ?.tasks.splice(currentIndex, 1)
          : state.data.boards
              .find((brds) => brds.name === state.boardName)
              ?.columns.find((col) => col.name === action.payload.colName)
              ?.tasks.splice(0, 1);

        state.data.boards
          .find((brds) => brds.name === state.boardName)
          ?.columns.find((col) => col.name === action.payload.newTask?.status)
          ?.tasks.push(action.payload.newTask);
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{ colName: string; taskTitle: string }>
    ) => {
      const currentIndex = state.data.boards
        .find((brds) => brds.name === state.boardName)
        ?.columns.find((col) => col.name === action.payload.colName)
        ?.tasks.findIndex((tsk) => tsk.title === action.payload.taskTitle);

      currentIndex
        ? state.data.boards
            .find((brds) => brds.name === state.boardName)
            ?.columns.find((col) => col.name === action.payload.colName)
            ?.tasks.splice(currentIndex, 1)
        : state.data.boards
            .find((brds) => brds.name === state.boardName)
            ?.columns.find((col) => col.name === action.payload.colName)
            ?.tasks.splice(0, 1);
    },
    addTask: (state, action: PayloadAction<NewTask>) => {
      console.log(action.payload);
      state.data.boards
        .find((brds) => brds.name === state.boardName)
        ?.columns.find((col) => col.name === action.payload.status)
        ?.tasks.push(action.payload);
    },
    editBoard: (state, action: PayloadAction<EditBoard>) => {
      const col = state.data.boards;
      const colIndex = state.data.boards.findIndex(
        (brd) => brd.name === state.boardName
      );

      col && col.splice(colIndex, 1, action.payload.newBoard);
    },
    addBoard: (state, action: PayloadAction<any>) => {
      state.data.boards.push(action.payload);
      state.boardName = action.payload.name;
    },
    deleteBoard: (state) => {
      const boardIndex = state.data.boards.findIndex(
        (brd) => brd.name === state.boardName
      );

      state.data.boards.splice(boardIndex, 1);
      state.data.boards.length > 0
        ? (state.boardName = state.data.boards[0].name)
        : (state.boardName = '');
    },
    dragndropTask: (state, action: PayloadAction<DND>) => {
      const { colName, dragIndex, hoverIndex, dragStatus } = action.payload;

      const taskList =
        colName === dragStatus
          ? state.data.boards
              .find((brds) => brds.name === state.boardName)
              ?.columns?.find((col) => col.name === colName)?.tasks
          : state.data.boards
              .find((brds) => brds.name === state.boardName)
              ?.columns?.find((col) => col.name === dragStatus)?.tasks;

      if (taskList && dragIndex !== undefined) {
        if (dragIndex !== hoverIndex) {
          const [taskToMove] = taskList.splice(dragIndex, 1);
          taskToMove.status = colName;
          console.log(taskToMove.status, dragStatus);

          hoverIndex
            ? state.data.boards
                .find((brds) => brds.name === state.boardName)
                ?.columns?.find((col) => col.name === colName)
                ?.tasks.splice(hoverIndex, 0, taskToMove)
            : state.data.boards
                .find((brds) => brds.name === state.boardName)
                ?.columns?.find((col) => col.name === colName)
                ?.tasks.push(taskToMove);
          console.log(action.payload);
        }
      }
    }
  }
});

export const {
  setActiveBoard,
  setIsCompleted,
  setSidebar,
  setTheme,
  setStatus,
  editTask,
  deleteTask,
  addTask,
  editBoard,
  addBoard,
  deleteBoard,
  dragndropTask
} = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
