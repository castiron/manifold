Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :texts
      resources :projects
      resources :tokens, only: [:create]

      get "development/whoami", to: "development#whoami"
    end
  end
end
