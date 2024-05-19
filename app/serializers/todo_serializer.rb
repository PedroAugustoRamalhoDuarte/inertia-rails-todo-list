class TodoSerializer < ApplicationSerializer
  object_as :todo
  attributes :id, :name, :created_at, :updated_at
end
