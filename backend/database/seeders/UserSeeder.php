<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $faker = \Faker\Factory::create();

        $password = Hash::make('password');

        User::create([
            'name' => 'Admin',
            'email' => 'super@admin.com',
            'password' => $password,
        ]);
    }
}
