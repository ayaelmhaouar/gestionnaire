<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = auth()->user()->tasks()->with('user')->get();
        $users = User::all();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }

    public function create()
    {
        $users = User::all();
        
        return Inertia::render('Tasks/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:à faire,en cours,terminé',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $validated['user_id'] = auth()->id();

        Task::create($validated);

        return redirect()->route('tasks.index')->with('success', 'Tâche créée avec succès.');
    }

    public function edit(Task $task)
    {
        $users = User::all();
        
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:à faire,en cours,terminé',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index')->with('success', 'Tâche mise à jour avec succès.');
    }

    public function destroy(Task $task)
{
    // Vérifier que l'utilisateur peut supprimer cette tâche
    if ($task->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
        abort(403, 'Action non autorisée.');
    }

    $task->delete();

    return redirect()->route('tasks.index')
        ->with('success', 'Tâche supprimée avec succès.');
}
}