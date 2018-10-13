<?php

require_once("./models/CourseModel.php");
class CourseController{

    public $model;
 
    public function __construct(){
         $this->model = new CourseModel();

    }


            public function add_course(){
              
             echo json_encode($this->model->saveCourse($_POST['courseName'],$_POST['desc']));
                
        }


        
     public function update_course(){
        $this->model->updateCourse($_POST['id'],$_POST['courseName'],$_POST['desc']);
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