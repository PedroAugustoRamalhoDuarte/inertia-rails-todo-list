import React from "react";
import Todo from "@/components/Todo";
import { Deferred, usePage, WhenVisible } from "@inertiajs/react";
import TodoForm from "@/components/TodoForm";

const TodosIndex = ({ todos, pagy }) => {
  // Needs for WhenVisible component re-render and fetch again
  const RenderWhenVisible = () => {
    if (pagy.page < pagy.last) {
      return (
        <WhenVisible
          fallback={"Loading..."}
          params={{
            data: {
              page: pagy.page + 1,
            },
            only: ["todos", "pagy"],
            preserveUrl: true,
          }}
        />
      );
    }
  };

  return (
    <div className="container px-4 mx-auto pt-26">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">Minha lista de tarefas</h1>
      </div>

      <Deferred data="todos_count" fallback="Loading...">
        <TodoDashboardCard />
      </Deferred>

      <TodoForm />

      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}

      <RenderWhenVisible />
    </div>
  );
};

const TodoDashboardCard = () => {
  const todosCount = usePage().props.todos_count;
  return (
    <div className="flex justify-between border-2 border-handwrite border-black mt-5 p-3">
      <div className="flex flex-col">Quantidade de total de Tarefas: {todosCount}</div>
    </div>
  );
};

export default TodosIndex;