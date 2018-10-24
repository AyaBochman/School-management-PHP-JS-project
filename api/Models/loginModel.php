<?php

require_once("Model.php");

class LoginModel extends Model {



    public function loginAction($email, $password){
        $q1 = "SELECT password FROM my_school.admins where email = '$email'";
        $hash = $this->dbc->Select($q1);
        $psswrd = $hash[0]->password;
        $psswrd = substr( $psswrd, 0, 60);
        

        if (password_verify($password, $psswrd)) {
            $q = "SELECT admins.id,admins.name,roles.role_name,admins.image FROM admins 
            left join roles on admins.role = roles.id WHERE email = '$email'";

            $loggedInUser = $this->dbc->Select($q);
            if(count($loggedInUser) > 0 ){
                $_SESSION['currentUser'] = $loggedInUser[0];
               
                return true;
            }
            else{
                
                return false;
            }
            
            
        }
 
        
        
        
       

    }
}


?>