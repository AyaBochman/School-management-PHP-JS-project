<?php

require_once("Model.php");

class StudentModel extends Model{


    public function saveStudent($name,$phone,$email,$enrolled,$file){
       
            $q = "INSERT INTO students (name,phone,email,image) VALUES (?, ?, ?, ?)";
            $stmt = $this->dbc->Prepare($q);
            $stmt->bind_param("siss",$name,$phone,$email,$file);
            $stmt->execute();
          
//enrolled query to student_course table
            if($stmt->insert_id != 0){
                $theId = $stmt->insert_id;
                foreach ($enrolled as $course){
                $q1 = "INSERT INTO student_course (studentId, courseId) VALUES (?, ?)";
                $stmt = $this->dbc->Prepare($q1);
                $stmt->bind_param("ii",$theId,$course);
                $stmt->execute();
       
                }
            }   
                $stmt->insert_id;
                return $theId;

    }

 
    

    public function updateStudent($id,$name,$phone,$email,$enrolled,$image){
        //first delete
        $q = "DELETE FROM student_course WHERE studentId =".$id;
        $data = $this->dbc->Prepare($q);
            $data->execute();
            if($data->affected_rows > 0 ){
                
        $q = "UPDATE students
        SET name = '$name', phone = '$phone', email = '$email', image= '$image' where id = '$id' ";
        $data = $this->dbc->Prepare($q);
        $data->execute();

      
            foreach ($enrolled as $course){
                $q1 = "INSERT INTO student_course (studentId, courseId) VALUES (?, ?)";
                $stmt = $this->dbc->Prepare($q1);
                $stmt->bind_param("ii",$id,$course);
                $stmt->execute();
            
        } 
            }
            else{
                return false;
            }



        return $id;
    }


  

    
}


?>