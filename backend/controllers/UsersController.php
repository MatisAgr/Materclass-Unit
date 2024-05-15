<?php
    namespace Masterticket;
    require_once '../models/User.php';


    class UsersController 
    {
        public function createUser($data)
        {
            $user = new User();
            // $user->id = $data['id'];
            $user->username = $data['name'];
            $user->mail = $data['email'];
            $user->passwd = $data['password'];
            $user->birth = $data['birth_date'];
            $user->role = $data['role'];
            $user->save();
        }

        public function getUser($id)
        {
            $user = User::find($id);
            return $user;
        }

        public function updateUser($id, $data)
        {
            $user = User::find($id);
            $user->username = $data['name'];
            $user->mail = $data['email'];
            $user->passwd = $data['password'];
            $user->birth = $data['birth_date'];
            $user->role = $data['role'];
            $user->save();
        }

        public function deleteUser($id)
        {
            $user = User::find($id);
            $user->delete();
        }

        public function getUsers()
        {
            $users = User::all();
            return $users;
        }

        public function login($data)
        {
            $user = User::where('mail', $data['email'])->where('passwd', $data['password'])->first();
            return $user;
        }

        public function logout()
        {
            session_destroy();
        }

        public function checkLogin()
        {
            if(isset($_SESSION['user']))
            {
                return true;
            }
            return false;
        }


    }