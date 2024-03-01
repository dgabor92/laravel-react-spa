<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Log;

class UserController extends Controller
{
    /**
     * Get authenticated user.
     */
    public function current(Request $request)
    {
        return response()->json($request->user());
    }

    public function index()
    {
        return response()->json(User::all());
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($request->only('name', 'email'));

        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($request->only('name', 'email'));
        $this->createLog(
            $user->id,
            $user->name,
            'Update',
            'Updated user profile with name ' . $request->name
        );
        return response()->json($user);
    }

    public function createUser(Request $request)
    {
        $AuthUser = auth()->user();
        //check the email is valid email and unique

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:admin,user',
            'password' => 'required|min:6',
        ]);
        $password = Hash::make($request->password);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = $password;
        $user->save();
        $this->createLog(
            $AuthUser->id,
            $AuthUser->name,
            'Create',
            'Created a new user with name ' . $request->name
        );
        return response()->json($user);
    }

    public function deleteUser($id)
    {
        $AuthUser = auth()->user();
        $user = User::find($id);
        if ($user) {
            $user->delete();
            $this->createLog(
                $AuthUser->id,
                $AuthUser->name,
                'Delete',
                'Deleted user with name ' . $user->name
            );
            return response()->json(['message' => 'User deleted']);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    public function updateUser($userId, Request $request)
    {
        $AuthUser = auth()->user();
        $user = User::find($userId);
        if ($user) {
            $this->validate($request, [
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'role' => 'required|in:admin,user',
            ]);
            $user->update($request->only('name', 'email', 'role'));
            $this->createLog(
                $AuthUser->id,
                $AuthUser->name,
                'Update',
                'Updated user with name ' . $request->name
            );
            return response()->json($user);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    public function getAllLogs()
    {
        $logs = Log::all();
        return response()->json($logs);
    }

    public function getAllUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public static function createLog($user_id, $username, $action, $description)
    {
        $log = new Log();
        $log->user_id = $user_id;
        $log->username = $username;
        $log->action = $action;
        $log->description = $description;
        $log->save();
        return;
    }
}
