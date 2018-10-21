<?php

require_once("./models/loginModel.php");

class LoginController{

    public $model;

    public function __construct(){
         $this->model = new LoginModel();
    }

    // public function index(){
    //     if(isset($_SESSION['currentUser'])){
    //         echo json_encode($_SESSION['currentUser']);
    //     }
    // }

    public function login(){
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(!isset($_SESSION['currentUser'])){ //if login in session is not set
            echo "unauthorized";
          
        }
        else{
            $theuser = array();
            $_SESSION['role'] = $_SESSION['currentUser']->role_name;
            array_push($theuser,$_SESSION['currentUser']->name,$_SESSION['role']);
            echo json_encode($theuser);
       
    
        }
        
    }
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $result = $this->model->loginAction($_POST['email'],$_POST['password']);
        if($result){
           
            echo "http://localhost/school/client/index.html";
            
        }
        else{
           echo "invalid";
           
        }

    }
     
       
        }

    public function logout(){
        unset($_SESSION['currentUser']);
 session_destroy();
 echo json_encode("you logged out successfully");
    }

    
       

        
    
}




?>