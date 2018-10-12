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
            // header('Location:http://localhost/school/client/login.html');
          
        }
        else{
            // echo json_encode("ok");
            echo $_SESSION['currentUser']->name;
        //    echo "ok";
    
        }
        
    }
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $result = $this->model->loginAction($_POST['email'],$_POST['password']);
        if($result){
            // echo json_encode($result);
           
            echo "http://localhost/school/client/index.html";
    
           
        }
        else{
            echo "incorrect";
           
        }

    }
     
       
        }

    
       

        
    
}




?>