if Rails.env.development?
  TypesFromSerializers.config do |config|
    config.base_serializers = ["ApplicationSerializer"]
  end
end
