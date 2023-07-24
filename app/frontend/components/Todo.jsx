import React from "react";
import {Link} from "@inertiajs/react";

const Todo = ({todo}) => {
  return (
    <div className="flex justify-between border-2 border-handwrite border-black mt-5 p-3">
      {todo.name}
      <div className="flex gap-2">

        <Link href={`todos/${todo.id}`} className="border-2 border-handwrite border-black p-2">
          Editar
        </Link>

        <Link href={`todos/${todo.id}`} method="delete" as="button"
              className="border-2 border-handwrite border-black p-2">
          Remover
        </Link>
      </div>
    </div>
  )
}

export default Todo;