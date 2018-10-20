<?php

require_once("./models/CourseModel.php");
class CourseController{

    public $model;
 
    public function __construct(){
         $this->model = new CourseModel();

    }


            public function add_course(){
                if($_SERVER['REQUEST_METHOD'] == 'POST'){
                   
                    $name = $_POST['courseName'];
                    $desc = $_POST['desc'];
                 
                    if(!empty($_FILES['file']['name'])){
                        $fileName = time().'_'.$_FILES['file']['name'];
                        $sourcePath = $_FILES['file']['tmp_name'];
                        $targetPath = "../client/img/".$fileName;
                        if(move_uploaded_file($sourcePath,$targetPath)){
                         
                        }else echo "file was not saved";
                    }else{
                        $targetPath = "../client/img/course.jpg";
                    }
                }
             echo json_encode($this->model->saveCourse($name,$desc,$targetPath));
                
        }


        
     public function update_course(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['courseId'];       
            $name = $_POST['courseName'];
            $desc = $_POST['desc'];
         
            if(!empty($_FILES['file']['name'])){
                $fileName = time().'_'.$_FILES['file']['name'];
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../client/img/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                  
                }else echo "file was not saved";
            }else{
                $targetPath = "../client/img/course.jpg";
            }
        }
     echo json_encode($this->model->updateCourse($id,$name,$desc,$targetPath));
        
     }
    

}
        






?>