export interface RootState {
  boardName: string;
  data: RootJsonData;
  sideBar: boolean;
  theme: boolean;
}

export interface RootJsonData {
  boards: {
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: { title: string; isCompleted: boolean }[];
      }[];
    }[];
  }[];
}

export interface ItemProps {
  taskTitle: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  taskIndex: number;
  colName: string;
}

export interface ViewTaskProps {
  colName: string;
  taskTitle: string;
  taskIndex: number;
  handleDimClicked: () => void;
}

export interface EditTaskProps {
  colName: string;
  taskTitle: string;
  taskIndex: number;
  taskDetails:
    | {
        title: string;
        description: string;
        status: string;
        subtasks: {
          title: string;
          isCompleted: boolean;
        }[];
      }
    | undefined;
  handleDimClicked: () => void;
}

export interface IsCompletedFunc {
  colName: string;
  subs: {
    title: string;
    isCompleted: boolean;
  };
  taskTitle: string;
  index: number;
}

export interface SetIsCompleted {
  colName: string;
  subTitle: string;
  subsIndex: number;
  taskTitle: string;
  isCompleted: boolean;
}

export interface StatusP {
  colName: string;
  taskTitle: string;
  taskIndex: number;
}

export interface SetStatus {
  status: string;
  colName: string;
  taskTitle: string;
}

export interface EditTask {
  newTask: {
    title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  };

  colName: string;
  taskTitle: string;
}

export interface NewTask {
  title: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}

export interface AddTaskProps {
  closeModal: () => void;
}

export interface BoardCopy {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}

export interface ColList {
  name: string;
  tasks: {
    title: string;
    description: string;
    status: string;
    subtasks: { title: string; isCompleted: boolean }[];
  }[];
}

export interface EditBoard {
  newBoard: {
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: {
          title: string;
          isCompleted: boolean;
        }[];
      }[];
    }[];
  };
}

export interface NewBoard {
  name: string;
  columns: {
    name: string;
    tasks: {}[];
  }[];
}

export interface DND {
  dragIndex: number;
  dropIndex: number;
  dragStatus: string;
  dropStatus: string;
  draggableId: string;
}

export interface Errors {
  title: string;
  subs: string;
}
