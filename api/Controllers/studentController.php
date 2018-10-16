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
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $enrolled = $_POST['check_list[]'];
            echo "the post data is: name: $enrolled";
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
        echo json_encode($this->model->saveStudent($name,$phone,$email,$enrolled,$targetPath));
     

}
       
             
      
        
   //UPDATE STUDENT
     public function update_student(){
        $this->model->updateStudent($_POST['id'],$_POST['name'],$_POST['phone'],$_POST['email'],$_POST['image']);
     }
              
}



?>