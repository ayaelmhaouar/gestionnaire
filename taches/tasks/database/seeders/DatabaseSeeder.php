<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Créer un admin (ou récupérer s'il existe déjà)
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
                'is_admin' => true
            ]
        );

        // Créer 10 tâches aléatoires
        Task::factory(10)->create();
    }
}
