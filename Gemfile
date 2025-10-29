source "https://rubygems.org"

ruby "~> 3.2.0"

# Rails framework
gem "rails", "~> 7.1.0"

# Database
gem "sqlite3", "~> 1.4"

# Application server
gem "puma", ">= 5.0"

# Asset pipeline
gem "sprockets-rails"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"

# Styling
gem "tailwindcss-rails", "~> 2.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

group :development, :test do
  # Testing framework
  gem "rspec-rails", "~> 6.0"
  gem "factory_bot_rails"
  gem "faker"
  
  # Debugging
  gem "debug", platforms: %i[ mri windows ]
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
end

group :development do
  gem "web-console"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "shoulda-matchers", "~> 5.0"
  gem "database_cleaner-active_record"
end
