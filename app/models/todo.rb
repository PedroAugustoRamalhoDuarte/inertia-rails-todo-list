class Todo < ApplicationRecord
  validates :name, presence: true, uniqueness: true
end
