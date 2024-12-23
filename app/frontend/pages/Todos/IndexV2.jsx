import React, {useOptimistic, useTransition} from "react";
import Todo from "@/components/Todo";
import { Deferred, usePage, WhenVisible } from "@inertiajs/react";
import TodoForm from "@/components/TodoForm";
import TodoOptimisticForm from "~/components/TodoOptimisticForm";

const TodosIndexV2  = ({ todos, pagy }) => {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (current, newValue) => [
    ...current,
    {...newValue, pending: true},
  ]
);
  console.log(optimisticTodos);

  // Needs for WhenVisible component re-render and fetch again
  return (
    <div className="container px-4 mx-auto pt-26">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">Minha lista de tarefas</h1>
      </div>

      <TodoOptimisticForm onAddTodo={setOptimisticTodos} />

      {optimisticTodos.map((todo) => (
        <Todo todo={todo} key={todo.id} pending={todo.pending}/>
      ))}
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

export default TodosIndexV2;