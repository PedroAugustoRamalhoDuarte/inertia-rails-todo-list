# frozen_string_literal: true

require "active_support/concern"

# Internal: A DSL to specify types for serializer attributes.
module TypesFromSerializers
  module Panko
    extend ActiveSupport::Concern

    module ClassMethods
      # Override: Capture the name of the model related to the serializer.
      #
      # name - An alias for the internal object in the serializer.
      # model - The name of an ActiveRecord model to infer types from the schema.
      # types_from - The name of a TypeScript interface to infer types from.
      def object_as(name, model: nil, types_from: nil)
        # NOTE: Avoid taking memory for type information that won't be used.
        if Rails.env.development?
          model ||= name.is_a?(Symbol) ? name : try(:_serializer_model_name) || name
          define_singleton_method(:_serializer_model_name) { model }
          define_singleton_method(:_serializer_types_from) { types_from } if types_from
        end
      end

      # Public: Shortcut for typing a serializer attribute.
      #
      # It specifies the type for a serializer method that will be defined
      # immediately after calling this method.
      def type(type, **options)
        attribute type: type, **options
      end

      def prepare_attributes(transform_keys: nil, sort_by: nil)
        attributes = send("_descriptor").attributes.to_h do |attribute|
          [
            attribute.name.to_sym,
            {
              value_from: attribute.name.to_s,
              attribute: :method,
              identifier: attribute.name == :id,
            },
          ]
        end

        one_association_attributes = send("_descriptor").has_one_associations.to_h do |association|
          [
            association.name_sym,
            {
              value_from: association.name_str,
              association: :one,
              serializer: association.descriptor.type,
              identifier: false,
            },
          ]

        end

        many_association_attributes = send("_descriptor").has_many_associations.to_h do |association|
          [
            association.name_sym,
            {
              value_from: association.name_str,
              association: :many,
              serializer: association.descriptor.type,
              identifier: false,
            },
          ]
        end

        attributes.merge(one_association_attributes).merge(many_association_attributes)
      end

      private

      # Override: Remove unnecessary options in production, types are only
      # used when generating code in development.
      unless Rails.env.development?
        def add_attribute(name, type: nil, optional: nil, **options)
          super(name, **options)
        end
      end
    end
  end
end
