class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos or /todos.json
  def index
    @todos = Todo.all
    render inertia: "Todos/Index", props: { todos: serialize(@todos, TodoSerializer) }
  end

  # GET /todos/1 or /todos/1.json
  def show
    render inertia: "Todos/Show", props: { todo: serialize(@todo, TodoSerializer) }
  end

  # POST /todos or /todos.json
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      redirect_to todos_url(@todo), notice: "Todo was successfully created."
    else
      redirect_to todos_url(@todo), inertia: { errors: { name: "Nome inválido" } }
    end
  end

  # PATCH/PUT /todos/1 or /todos/1.json
  def update
    if @todo.update(todo_params)
      redirect_to todos_url(@todo), notice: "Todo was successfully edited."
    else
      redirect_to todos_url(@todo), inertia: { errors: { name: "Nome inválido" } }
    end
  end

  # DELETE /todos/1 or /todos/1.json
  def destroy
    @todo.destroy

    redirect_to todos_url, notice: "Todo was successfully destroyed."
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_todo
    @todo = Todo.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def todo_params
    params.require(:todo).permit(:name)
  end
end
