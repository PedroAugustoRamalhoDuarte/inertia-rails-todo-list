class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos or /todos.json
  def index
    @pagy, @todos = pagy(Todo.all, limit: 10)
    render inertia: "Todos/IndexV2", props: {
      todos: InertiaRails.merge { serialize(@todos, TodoSerializer) },
      pagy: @pagy,
      todos_count: InertiaRails.defer do
        sleep 5
        Todo.count
      end,
    }
  end

  # GET /todos/1 or /todos/1.json
  def show
    render inertia: "Todos/Show", props: { todo: serialize(@todo, TodoSerializer) }
  end

  # POST /todos or /todos.json
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      redirect_to todos_url, notice: "Todo was successfully created."
    else
      redirect_to todos_url, inertia: { errors: { name: "Nome inválido" } }
    end
  end

  # PATCH/PUT /todos/1 or /todos/1.json
  def update
    if @todo.update(todo_params)
      redirect_to todos_url, notice: "Todo was successfully edited."
    else
      redirect_to todos_url, inertia: { errors: { name: "Nome inválido" } }
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
