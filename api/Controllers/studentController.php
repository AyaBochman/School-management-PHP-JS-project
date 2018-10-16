<?php

require_once("./models/StudentModel.php");
class StudentController{

    public $model;
 
    public function __construct(){
         $this->model = new StudentModel();

    }

    public function add_student(){
        echo json_encode($this->model->saveStudent($_POST['name'],$_POST['phone'],$_POST['email'],$_POST['myCourses']));
        // echo json_encode($this->model->saveEnrolled($_POST['myCourses']));

}
       
             
      
        
   //UPDATE STUDENT
     public function update_student(){
        $this->model->updateStudent($_POST['id'],$_POST['name'],$_POST['phone'],$_POST['email'],$_POST['image']);
     }
              
}



?>