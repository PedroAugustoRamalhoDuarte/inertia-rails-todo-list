import React from "react";
import { useForm } from "@inertiajs/react";

const TodoForm = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: ""
  });

  const submit = (e) => {
    e.preventDefault();
    reset();
    post('/todos', {
      // only: ["todos", "pagy"] TODO: How to
    });
  };

  return (
    <form method="post" onSubmit={submit}>
      <div className="mb-4">
        <input
          name="name"
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
  );
};

export default TodoForm;