import React from "react";
import Todo from "../../components/Todo";
import {useForm} from "@inertiajs/react";

const TodosIndex = ({todos}) => {


  const {data, setData, post, processing, errors} = useForm({
    name: ""
  });

  console.log(errors)

  const submit = (e) => {
    e.preventDefault()
    post('/todos')
  }

  return (
    <div className="container px-4 mx-auto pt-26">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">
          Minha lista de tarefas
        </h1>
      </div>


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

      <div id="dialog" data-controller="inertia" data-page="{}" />


      {todos.map((todo) =>
        <Todo todo={todo} key={todo.id}/>
      )}

    </div>
  )
}

export default TodosIndex;