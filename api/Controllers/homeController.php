<?php

require_once("./models/HomeModel.php");
class HomeController{

    public $model;
 
    public function __construct(){
         $this->model = new HomeModel();

    }

    public function get_data(){
        $result = array();
        $courses = $this->model->getData("courses");
        $students = $this->model->getData("students");
        array_push($result,$courses,$students);
       echo json_encode($result);
    }


    public function get_current(){
        echo json_encode($this->model->getCurrent($_GET["table"],$_GET["id"]));
       

    }

    public function del_current(){
       
        echo json_encode($this->model->delCurrent($_POST["table"],$_POST["id"]));
        $this->model->deleteEnrolled($_POST["table"],$_POST['id']);
    }

    public function get_enrolled_students(){
        echo json_encode($this->model->enrolledCourses($_GET["id"]));
    }

    public function get_enrolled_courses(){
        echo json_encode($this->model->enrolledStudents($_GET["id"]));
    }

    public function get_courses_names(){
        echo json_encode($this->model->studentNames($_GET["id"]));
    }

    public function get_students_names(){
        echo json_encode($this->model->courseNames($_GET["id"]));
    }





  
}




?>