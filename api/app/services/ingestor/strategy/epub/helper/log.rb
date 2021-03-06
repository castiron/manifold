require "naught"

module Ingestor
  module Strategy
    module EPUB
      module Helper
        # Logging helpers for EPUB ingestion strategy
        class Log
          def self.log_structure(s, preface, logger)
            log_structure_recursive(s, preface, logger)
          end

          def self.log_text_errors(text, logger)
            log_model_errors(text, logger)
            log_collection_errors(text.titles, logger)
            log_collection_errors(text.ingestion_sources, logger)
          end

          def self.log_collection_errors(collection, logger)
            collection.each do |model|
              log_model_errors(model, logger)
            end
          end

          def self.log_model_errors(model, logger)
            unless model.valid?
              model.errors.full_messages.each do |message|
                # rubocop:disable Metrics/LineLength
                msg = "#{model.class.name} #{model.try(:source_identifier)}: #{message}"
                logger.error(msg.red)
              end
            end
          end

          # rubocop:disable Metrics/LineLength
          def self.log_structure_recursive(branch, preface, logger, indent = 0)
            branch.each do |leaf|
              # rubocop:disable Metrics/LineLength
              logger.debug "#{preface} #{' ' * indent}#{leaf[:label] || 'NULL'} #{"[#{leaf[:source_identifier]}]".light_cyan if leaf[:source_identifier]}"
              if leaf[:children]
                log_structure_recursive(leaf[:children], preface, logger, indent + 2)
              end
            end
          end
        end
      end
    end
  end
end
