<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Lister toutes les tâches de l'utilisateur connecté
    public function index()
    {
        $tasks = auth()->user()->tasks()->get();
        return response()->json([
            'success' => true,
            'data' => $tasks
        ]);
    }

    // Créer une nouvelle tâche
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'todo',
            'user_id' => $request->user_id ?? auth()->id()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tâche créée avec succès',
            'data' => $task
        ], 201);
    }

    // Mettre à jour une tâche
    public function update(Request $request, Task $task)
{
    $this->authorize('update', $task);
    $task->update($request->all());
    return $task;
}

    // Supprimer une tâche
   public function destroy(Task $task)
{
    $this->authorize('delete', $task); 
    $task->delete();
    return response()->json(['success' => true, 'message' => 'Tâche supprimée avec succès']);
}

}
