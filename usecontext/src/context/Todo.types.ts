export type TodoType = {
  _id: string;
  title: string;
  completed: boolean;
};

export type TodoContextType = {
  todos?: TodoType[];
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, completed: boolean) => void;
};
export type UserType = {
  name: string | undefined;
  password: string | undefined;
};
