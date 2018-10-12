<?php

require_once("./models/StudentModel.php");
class StudentController{

    public $model;
 
    public function __construct(){
         $this->model = new StudentModel();

    }

    public function add_student(){
           if (($_FILES['fileToUpload']['name']!="")){
// Where the file is going to be stored
	$target_dir = "../client/img/";
	$file = $_FILES['fileToUpload']['name'];
	$path = pathinfo($file);
	$filename = $path['fileToUpload'];
	$ext = $path['extension'];
	$temp_name = $_FILES['fileToUpload']['tmp_name'];
	$path_filename_ext = $target_dir.$filename.".".$ext;
 
// Check if file already exists
if (file_exists($path_filename_ext)) {
 echo "Sorry, file already exists.";
 }else{
 move_uploaded_file($temp_name,$path_filename_ext);
 
//  echo "Congratulations! File Uploaded Successfully.";
 }
 echo json_encode($this->model->saveStudent($_POST['name'],$_POST['phone'],$_POST['email'],$filename));
}
       
             
      
   }
       
                
       
  
     
   
     public function update_student(){
        $this->model->updateStudent($_POST['id'],$_POST['name'],$_POST['phone'],$_POST['email'],$_POST['image']);
     }
              
        
        //     public function del_student(){
 
        //         echo json_encode($this->model->deleteStudent($_POST['id']));
        //         $this->model->deleteEnrolled($_POST['id']);
            
        // }
}


        //     public function add_student(){
              
        //      echo json_encode($this->model->saveStudent($_POST['name'],$_POST['phone'],$_POST['email'],$_POST['image']));
                
        // }
        
        




?>