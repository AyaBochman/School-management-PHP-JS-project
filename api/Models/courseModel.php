<?php

require_once("Model.php");

class CourseModel extends Model{


    public function saveCourse($name,$desc){
      
            $q = "INSERT INTO courses (name,description) VALUES (?, ?)";
            $stmt = $this->dbc->Prepare($q);
            $stmt->bind_param("ss",$name,$desc);
            $stmt->execute();
            return $stmt->insert_id;
           
          

    }

    public function updateCourse($id,$courseName,$desc){

        $q = "UPDATE courses
        SET name = '$courseName', description = '$desc' where id = '$id' ";
        $data = $this->dbc->Prepare($q);
        $data->execute();
    }

    

    
}


?>