<?php

require_once("Model.php");

class LoginModel extends Model {

    // public function getLogin(){
    //     if(count($_SESSION['currentUser'] > 0)){
    //        echo "http://localhost/school/client/index.html";
    //     } else{
    //         echo "http://localhost/school/client/login.html";
    //     }
    // }

    public function loginAction($email, $password){
        
        // $q = "SELECT * FROM admins where password = '$password' and email = '$email'";
        $q = "SELECT admins.name,roles.role_name FROM admins 
        left join roles on admins.role = roles.id WHERE password = '$password' and email = '$email'";
        $loggedInUser = $this->dbc->Select($q);
        
        
        if(count($loggedInUser) > 0 ){
            $_SESSION['currentUser'] = $loggedInUser[0];
           
            return true;
        }
        else{
            print_r($loggedInUser);
            return false;
        }

    }
}


?>