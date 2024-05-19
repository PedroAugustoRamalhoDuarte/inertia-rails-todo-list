import {TodoProps} from "../../types/serializers";

const TodosShow = ({todo}: { todo: TodoProps }) => {

  return (
    <div className="container px-4 mx-auto pt-26">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">
          Tarefa {todo.name}
        </h1>
      </div>

      <div className="pt-2">
        <p className="font-bold">
          Criado em: {todo.created_at}
        </p>
        <p className="font-bold">
          Atualizado em: {todo.updated_at}
        </p>
      </div>

    </div>
  )
}

export default TodosShow;