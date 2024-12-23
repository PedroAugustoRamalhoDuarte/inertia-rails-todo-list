import React, { useOptimistic } from "react";
import Todo from "@/components/Todo";
import TodoOptimisticForm from "~/components/TodoOptimisticForm";

const TodosIndexV2  = ({ todos }) => {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (current, newValue) => [
    ...current,
    {...newValue, pending: true},
  ]
);

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

export default TodosIndexV2;