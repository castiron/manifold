module Ingestor
  module Strategy
    module EPUB
      module Creator
        # Abstract base class for EPUB ingestion creators
        #
        # @author Zach Davis
        class BaseCreator
          include Ingestor::Loggable
          attr_writer :existing
          def initialize(logger, metadata_node)
            @logger = logger || Rails.logger
            @metadata_node = metadata_node
          end

          def check_for_existing(existing, compare_attributes)
            return nil unless !existing.nil? && existing.respond_to?(:to_a)
            existing = existing.to_a.find do |model|
              match = true
              compare_attributes.each do |key, value|
                match = false if model.send(key) != value
              end
              match
            end
            existing
          end

          def defaults(defaults, attributes)
            defaults.clone.merge(attributes.compact)
          end
        end
      end
    end
  end
end
