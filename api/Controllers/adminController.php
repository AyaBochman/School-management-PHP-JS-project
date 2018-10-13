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


    // public function get_current(){
    //     echo json_encode($this->model->getCurrent($_GET["table"],$_GET["id"]));
    //     // $this->model->getNames($_GET["table"],$_GET["id"]);

    // }

    // public function del_current(){
    //     echo json_encode($this->model->delCurrent($_POST["table"],$_POST["id"]));
    //     $this->model->deleteEnrolled($_POST["table"],$_POST['id']);
    // }

    // public function get_enrolled_students(){
    //     echo json_encode($this->model->enrolledCourses($_GET["id"]));
    // }

    // public function get_enrolled_courses(){
    //     echo json_encode($this->model->enrolledStudents($_GET["id"]));
    // }

    // public function get_courses_names(){
    //     echo json_encode($this->model->studentNames($_GET["id"]));
    // }

    // public function get_students_names(){
    //     echo json_encode($this->model->courseNames($_GET["id"]));
    // }





  
}




?>