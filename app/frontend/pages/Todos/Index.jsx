import React, {useEffect, useState} from "react";
import Todo from "../../components/Todo";
import {Deferred, useForm, usePage, WhenVisible} from "@inertiajs/react";

const TodosIndex = ({todos, pagy}) => {
  const {data, setData, post, processing, errors} = useForm({
    name: ""
  });

  const submit = (e) => {
    e.preventDefault()
    post('/todos')
  }

  // Needs for WhenVisible component re-render and fetch again
  const RenderWhenVisible = () => {
    if (pagy.page < pagy.last) {
      return (<WhenVisible fallback={"Loading..."} params={{
          data: {
            page: pagy.page + 1,
          },
          only: ["todos", "pagy"],
          preserveUrl: true,
        }}/>
      )
    }
  }

  return (
    <div className="container px-4 mx-auto pt-26">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">
          Minha lista de tarefas
        </h1>
      </div>

      <Deferred data="todos_count" fallback="Loading...">
        <TodoDashboardCard/>
      </Deferred>

      <form method="post" onSubmit={submit}>
        <div className="mb-4">
          <input name="name"
                 placeholder="Nome da tarefa"
                 className="form-input mt-1 block w-full border-2 border-handwrite border-black p-2"
                 value={data.name}
                 onChange={e => setData("name", e.target.value)}
          />
          <span className="text-red-500 text-xs">
            {errors.name && errors.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="border-2 border-handwrite border-black p-2" disabled={processing}>
            Enviar
          </button>
        </div>

      </form>

      {todos.map((todo) =>
        <Todo todo={todo} key={todo.id}/>
      )}

      <RenderWhenVisible/>
    </div>
  )
}


const TodoDashboardCard = () => {
  const todosCount = usePage().props.todos_count;
  console.log(todosCount)
  return (
    <div className="flex justify-between border-2 border-handwrite border-black mt-5 p-3">
      <div className="flex flex-col">
        Quantidade de total de Tarefas: {todosCount}
      </div>
    </div>
  )
}

export default TodosIndex;