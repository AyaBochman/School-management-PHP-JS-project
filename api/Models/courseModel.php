<?php

require_once("Model.php");

class CourseModel extends Model{


    public function saveCourse($name,$desc,$image){
        if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales"){
            $q = "INSERT INTO courses (name,description,image) VALUES (?, ?, ?)";
            $stmt = $this->dbc->Prepare($q);
            $stmt->bind_param("sss",$name,$desc,$image);
            $stmt->execute();
            return $stmt->insert_id;

        }
         
    }

    public function updateCourse($id,$courseName,$desc){
        if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales"){
        $q = "UPDATE courses
        SET name = '$courseName', description = '$desc' where id = '$id' ";
        $data = $this->dbc->Prepare($q);
        $data->execute();
    }

}

    

    
}


?>