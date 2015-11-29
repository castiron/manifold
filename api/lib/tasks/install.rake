namespace :install do
  desc "Creates a Manifold user admin@manifold.dev / manifold"
  task create_user: :environment do
    User.create(email: "admin@manifold.dev", password: "manifold", password_confirmation: "manifold")
  end
end
