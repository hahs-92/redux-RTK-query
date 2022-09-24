import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../todos/todo.model";

type TodosResponse = Todo[];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  //necesitamos este tag para que no nos muestre lo que tiene en cache, cuando utilizemos los hooks
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodosResponse, void>({
      query: () => "/todos",
      transformResponse: (res: Todo[]) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"], //invalidamos el cache cuando utiliamos estos builders
    }),
    addTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deletTodo: builder.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

//custom hooks
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeletTodoMutation,
} = apiSlice;
