<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    // Vérifier si un utilisateur peut mettre à jour une tâche
    public function update(User $user, Task $task)
    {
        return $user->id === $task->user_id || $user->is_admin;
    }

    // Vérifier si un utilisateur peut supprimer une tâche
     public function delete(User $user, Task $task)
    {
        return $user->id === $task->user_id || $user->is_admin;
    }
}
