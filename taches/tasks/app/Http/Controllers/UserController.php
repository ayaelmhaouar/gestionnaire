<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $this->authorize('isAdmin', User::class);
        return User::all();
    }

    public function destroy(User $user)
    {
        $this->authorize('isAdmin', User::class);
        $user->delete();
        return response()->noContent();
    }
}