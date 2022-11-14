import { createContext, ReactNode, useEffect, useState } from "react";
import { TodoContextType, TodoType } from "./Todo.types";

type Props = {
  children: ReactNode;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<TodoType[] | undefined>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:4444");
      const receivedTodos = await response.json();
      setTodos(receivedTodos);
    };
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    const response = await fetch("http://localhost:4444/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();
    console.log(data);

    todos && setTodos([...todos, data]);
  };

  const deleteTodo = async (id: string) => {
    try {
      fetch(`http://localhost:4444/${id}`, {
        method: "DELETE",
      });
      setTodos((prev) => {
        return prev?.filter((el) => el._id !== id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const editTodo = (id: string, title: string) => {
  //   todos && setTodos([...todos, todos?.filter((el) => el.id === id).map((el) =>el.completed || el.id || el.title = )[0] ])
  // }

  const editTodo = async (id: string, title: string, completed: boolean) => {
    const updatedTodo = {
      title,
      completed,
    };

    // console.log(updatedTodo);

    const response = await fetch(`http://localhost:4444/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ updatedTodo }),
      headers: { "Content-Type": "application/json" },
    });

    const fetchedTodo: TodoType = await response.json();

    console.log(fetchedTodo);

    if (todos) {
      const newTodos = todos.map((todo) => {
        if (todo._id === fetchedTodo._id) {
          return fetchedTodo;
        }
        return todo;
      });
      console.log(newTodos);
      setTodos(newTodos);
    }

    // filteredTodos && setTodos([...filteredTodos, fetchedTodo]);
  };

  //   todos && setTodos([...todos, todos?.filter((el) => el.id === id)])
  //   title: title;
  // completed: el.completed} )[0]])
  // }

  //  const editTodo = (id: string, title: string) => {
  //       todos?.filter((el) => el.id === id).map((el) =>{id: el.id;
  //     title: title;
  //   completed: el.completed} )[0]

  // const updateTodo = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const {
  //       params: { title },
  //       body,
  //     } = req;
  //     const updateTodo: TodoType | null = await Todo.findByIdAndUpdate(
  //       { _title: title },
  //       body
  //     );
  //     const allTodos: TodoType[] = await Todo.find();
  //     res.status(200).json({
  //       message: "Todo updated",
  //       todo: updateTodo,
  //       todos: allTodos,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  // const editTodo = (title: string) => {
  //   const editedTodo: TodoType = {
  //     id: uuidv4(),
  //     title,
  //     completed: false,
  //   };
  // };

  const value = {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
