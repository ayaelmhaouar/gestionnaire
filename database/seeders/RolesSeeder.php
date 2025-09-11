<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Laratrust\Models\Role;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'admin', 'display_name' => 'Administrateur']);
        Role::firstOrCreate(['name' => 'user', 'display_name' => 'Utilisateur']);
    }
}
