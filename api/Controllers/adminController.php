<?php

require_once("./models/AdminModel.php");
class AdminController{

    public $model;
 
    public function __construct(){
         $this->model = new AdminModel();

    }

    public function get_admins(){
       
        $admins = $this->model->getAdmins();

       echo json_encode($admins);
    }

    public function get_admin(){
       
        $result = $this->model->getCurrAdmin($_GET['id']);

       echo json_encode($result);
    }

    public function del_admin(){
    echo json_encode($this->model->delAdmin($_POST['id']));
    }


    public function add_admin(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $psswd = $_POST['adminPass'];
            $password = PASSWORD_HASH($psswd, PASSWORD_DEFAULT);

            $name = $_POST['adminName'];
            $role = $_POST['adminRole'];
            $phone = $_POST['adminPhone'];
            $email = $_POST['adminEmail'];
           

         
            if(!empty($_FILES['file']['name'])){
                $fileName = time().'_'.$_FILES['file']['name'];
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../client/img/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                  
                }else echo "file was not saved";
            }else{
                $targetPath = "../client/img/user.jpg";
            }
        }
 
       
        echo json_encode($this->model->addAdmin($name,$role,$phone,$email,$password,$targetPath));
    }
   

    public function update_admin(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            
            $psswd = $_POST['adminPass'];
            $password = PASSWORD_HASH($psswd, PASSWORD_DEFAULT);
            
            $id = $_POST['adminId'];
            $name = $_POST['adminName'];
            $role = $_POST['adminRole'];
            $phone = $_POST['adminPhone'];
            $email = $_POST['adminEmail'];
            
         
            if(!empty($_FILES['file']['name'])){
                $fileName = time().'_'.$_FILES['file']['name'];
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../client/img/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    
                }else echo "file was not saved";
            }else{
                $targetPath = "../client/img/user.jpg";
            }
        }

    echo json_encode($this->model->updateAdmin($id,$name,$role,$phone,$email,$password,$targetPath));
     }
    
  
}




?>