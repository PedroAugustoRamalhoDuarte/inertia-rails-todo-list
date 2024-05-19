if Rails.env.development?
  TypesFromSerializers.config do |config|
    config.base_serializers = ["ApplicationSerializer"]
    config.name_from_serializer = ->(name) { name.sub(/Serializer\z/, "Props") }
  end
end
