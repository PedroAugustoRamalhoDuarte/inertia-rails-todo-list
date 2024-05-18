Rails.application.routes.draw do
  resources :todos, except: [:new, :edit]

  root "todos#index"
end
