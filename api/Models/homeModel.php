<?php

require_once("Model.php");

class HomeModel extends Model{

public function getData($table){
  
  $data = $this->dbc->Select("SELECT * FROM ".$table);
   if(isset($_SESSION['currentUser'])){
    return $data;
   }
  

}

  public function getCurrent($table,$id){
   

  $data =   $this->dbc->Select("SELECT * FROM ".$table." where id=".$id);

   
    return $data;
  }

  public function delCurrent($table,$id){
      if(isset($_SESSION['currentUser'])) {
        $q = "DELETE FROM " .$table. " WHERE id =".$id;
        
        
        $data = $this->dbc->Prepare($q);
        $data->execute();
        if($data->affected_rows > 0 ){
            return true;
        }
        else{
            return false;
        }

      }

  }

  public function deleteEnrolled($table,$id){
    if($table == "students"){
        $q = "DELETE FROM student_course WHERE studentId =".$id;

    }
    if($table == "courses"){
        $q = "DELETE FROM student_course WHERE courseId =".$id;
    }
    
    $data = $this->dbc->Prepare($q);
    $data->execute();
    if($data->affected_rows > 0 ){
        return true;
    }
    else{
        return false;
    }

}


  public function enrolledStudents($id){
    $data = $this->dbc->Select("SELECT COUNT(studentId) as total FROM student_course where courseId = ".$id);
    return $data;
  }

  public function enrolledCourses($id){
    $data = $this->dbc->Select("SELECT COUNT(courseId) as total FROM student_course where studentId = ".$id);
    return $data;
  }

  // public function getNames($table,$id){
  //   if($table == "students"){
  //     $data = $this->dbc->Select("SELECT name FROM courses 
  //     join student_course on student_course.courseId = courses.id where student_course.studentId = ".$id );
  //   }
  //   if($table == "courses"){
  //     $data = $this->dbc->Select("SELECT students.name FROM student_course 
  //     join students on studentId = students.id where courseId = ".$id);
  //   }
    
  //   return $data;
  // }

  public function courseNames($id){
    $data = $this->dbc->Select("SELECT name FROM courses 
    join student_course on student_course.courseId = courses.id where student_course.studentId = ".$id );
    return $data;
  }

  public function studentNames($id){
    $data = $this->dbc->Select("SELECT students.name FROM student_course 
    join students on studentId = students.id where courseId = ".$id);
    return $data;
  }


    
}


?>