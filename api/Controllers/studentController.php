<?php

require_once("./models/StudentModel.php");
class StudentController{

    public $model;
 
    public function __construct(){
         $this->model = new StudentModel();

    }

    public function add_student(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
                   
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $arr = json_decode($_POST['myCourses']);
         
            if(!empty($_FILES['file']['name'])){
                $fileName = time().'_'.$_FILES['file']['name'];
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../client/img/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    echo "file saved";
                }else echo "file was not saved";
            }else{
                $targetPath = "../client/img/user.jpg";
            }
        }
     echo json_encode($this->model->saveStudent($name,$phone,$email,$arr,$targetPath));

    }
             
      
        
   //UPDATE STUDENT
     public function update_student(){
         
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['theId'];
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $arr = json_decode($_POST['myCourses']);
            
         
            if(!empty($_FILES['file']['name'])){
                $fileName = time().'_'.$_FILES['file']['name'];
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../client/img/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    echo "file saved";
                }else echo "file was not saved";
            }else{
                $targetPath = "../client/img/user.jpg";
            }
        }
    $this->model->updateStudent($id,$name,$phone,$email,$arr,$targetPath);
     }
              
}



?>