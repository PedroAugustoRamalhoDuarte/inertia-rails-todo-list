class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token, if: -> { request.inertia? }

  # GET /todos or /todos.json
  def index
    @todos = Todo.all
    render inertia: 'Todos/Index', props: {
      todos: @todos,
    }
  end

  def frames
    flash[:target_frame] = "teste"
    render inertia: 'Todos/Frames'
  end
  # GET /todos/1 or /todos/1.json
  def show
  end

  # GET /todos/new
  def new
    @todo = Todo.new
  end

  # GET /todos/1/edit
  def edit
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
    respond_to do |format|
      if @todo.update(todo_params)
        format.html { redirect_to todo_url(@todo), notice: "Todo was successfully updated." }
        format.json { render :show, status: :ok, location: @todo }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
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
