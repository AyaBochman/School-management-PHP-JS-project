<?php

require_once("Model.php");

class StudentModel extends Model{


    public function saveStudent($name,$phone,$email){
      
            $q = "INSERT INTO students (name,phone,email) VALUES (?, ?, ?)";
            $stmt = $this->dbc->Prepare($q);
            $stmt->bind_param("sis",$name,$phone,$email);
            $stmt->execute();
            return $stmt->insert_id;

    }

    // public function studentCourses($selected){

    // }

    public function updateStudent($id,$name,$phone,$email,$image){

        $q = "UPDATE students
        SET name = '$name', phone = '$phone', email = '$email', image= '$image' where id = '$id' ";
        $data = $this->dbc->Prepare($q);
        $data->execute();
    }


  

    
}


?>