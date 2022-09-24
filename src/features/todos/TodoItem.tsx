import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useId } from "react";
import { useUpdateTodoMutation, useDeletTodoMutation } from "../api/apiSlice";
import { Todo } from "./todo.model";

export interface ITodoProps {
  todo: Todo;
}

const TodoItem: React.FC<ITodoProps> = ({ todo }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeletTodoMutation();
  return (
    <article key={todo.id}>
      <section className="todo">
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id.toString()}
          onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
        <label htmlFor={todo.id.toString()}>{todo.title}</label>
      </section>
      <button className="trash" onClick={() => deleteTodo(todo)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  );
};

export default TodoItem;
