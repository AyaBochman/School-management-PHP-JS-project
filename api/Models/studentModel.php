<?php

require_once("Model.php");

class StudentModel extends Model{


    public function saveStudent($name,$phone,$email){
       
            $q = "INSERT INTO students (name,phone,email) VALUES (?, ?, ?)";
            $stmt = $this->dbc->Prepare($q);
            $stmt->bind_param("sis",$name,$phone,$email);
            $stmt->execute();
            return $stmt->insert_id;
//enrolled query to student_course table


    }

    public function saveEnrolled($enrolled){
        foreach ($enrolled as $course){
            $q1 = "INSERT INTO student_course (studentId, courseId) VALUES (?, ?)";
            $stmt1 = $this->dbc->Prepare($q);
            $stmt1->bind_param("ii",mysql_insert_id(),$course);
            $stmt1->execute();
            return $stmt1->insert_id;
        }
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