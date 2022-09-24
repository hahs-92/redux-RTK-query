import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAddTodoMutation, useGetTodosQuery } from "../api/apiSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    isError,
    isLoading,
    isSuccess,
    data: todos,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      id: Number(new Date()),
      userId: 2,
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
    console.log(Number(new Date()));
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <section className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          placeholder="Enter new todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </section>

      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} />;
    });
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
