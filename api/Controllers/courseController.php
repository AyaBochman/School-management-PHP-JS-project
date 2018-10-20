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
     echo json_encode($this->model->saveCourse($id,$name,$desc,$targetPath));
        // $this->model->updateCourse($_POST['id'],$_POST['courseName'],$_POST['desc']);
     }
    
 
        //     public function del_course(){
 
        //         echo json_encode($this->model->deleteCourse($_POST['id']));
            
          
        // }
}
        
    

    // public function get_students(){

    //     echo json_encode($this->model->getStudents());
        
    // } 

    // public function get_current_student(){
        
    //     echo json_encode($this->model->getCurrStudent($_GET["id"]));
    // }

    // public function get_current_course(){
        
    //     echo json_encode($this->model->getCurrCourse($_GET["id"]));
    // }


    // if(isset($_GET["id"])){
    //     echo json_encode($this->model->getStudents($_GET["id"]));
    //     else{
    //         echo json_encode($this->model->getStudents();
    //     }
    //     }
    // public function getBenchmarks(){
    //     $data  = $this->model->get_all_benchmarks();
    //     echo json_encode($data);
    // }

    // public function delete(){
    //     $data  = $this->model->delete();
    //     echo json_encode($data);
    // }






?>