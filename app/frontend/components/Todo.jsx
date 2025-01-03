import React, {useState} from "react";
import {Link, useForm} from "@inertiajs/react";
import {clsx} from "clsx";

const Todo = ({todo, pending = false}) => {
  const [editable, setEditable] = useState(false);

  const {data, setData, patch, processing, errors} = useForm({
    name: todo.name
  });

  const submit = (e) => {
    e.preventDefault()
    patch(`/todos/${todo.id}`, {preserveState: true})
    setEditable(false);
  }

  return (
    <div
      className={clsx("flex justify-between border-2 border-handwrite border-black mt-5 p-3", pending && "opacity-50 animate-pulse")}>
      <div className="flex flex-col">
        {editable ? (
            <form method="patch" className="flex flex-row" onSubmit={submit}>

              <input name="name"
                     placeholder="Nome da tarefa"
                     className="form-input block w-full border-2 border-handwrite border-black p-2"
                     value={data.name}
                     onChange={e => setData("name", e.target.value)}
              />
              <div className="pl-4">
                <button type="submit" className="border-2 border-handwrite border-black p-2" disabled={processing}>
                  {processing ? 'Enviando...' : 'Enviar'}
                </button>
              </div>

            </form>
          ) :
          <Link href={`todos/${todo.id}`} className="h-fit my-auto">
            {todo.name}
          </Link>
        }
        <span className="text-red-500 text-xs">{errors.name && errors.name}</span>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setEditable(!editable)} className="border-2 border-handwrite border-black p-2">
          Editar
        </button>

        <Link href={`todos/${todo.id}`} method="delete" as="button"
              className="border-2 border-handwrite border-black p-2">
          Remover
        </Link>

      </div>
    </div>
  )
}

export default Todo;