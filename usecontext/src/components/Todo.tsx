import { set } from "mongoose";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useRef,
  useState,
} from "react";
import { TodoContextType, TodoType } from "../context/Todo.types";
import { TodoContext } from "../context/TodoContext";
//trfac

type Props = Omit<TodoType, "_id"> & {
  id: string;
};

export const Todo = ({ id, title, completed }: Props) => {
  const { deleteTodo, editTodo } = useContext(TodoContext) as TodoContextType;
  const [edit, setEdit] = useState(false);

  //   : React.FormEvent<HTMLInputElement>
  //   const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const newOne = e.target.value;
  //     editTodo(id, newOne, completed);
  //     console.log(inputRef.current?.value);
  //   };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.value
        ? editTodo(id, event.currentTarget.value, completed)
        : editTodo(id, title, completed);

      setEdit(false);
    }
  };
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    editTodo(id, title, e.target.checked);
  };

  return (
    <div className="todo">
      <div className="checkbutton-wrapper">
        <input
          type="checkbox"
          className="check-button"
          checked={completed}
          onChange={(e) => handleCheck(e)}
        />
        {edit ? (
          <input
            className="edit-input"
            type="text"
            placeholder={"Change task"}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <div className="title-edit">
            <h3 className="task">{title}</h3>
          </div>
        )}
      </div>

      <div className="delete-button">
        <button
          className="edit-button"
          onClick={() => setEdit((prev) => !prev)}
        >
          &#9998;
        </button>

        <button className="x-button" onClick={() => deleteTodo(id)}>
          &#x2716;
        </button>
      </div>
    </div>
  );
};
