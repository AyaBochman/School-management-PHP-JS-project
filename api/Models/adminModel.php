<?php

require_once("Model.php");

class AdminModel extends Model{

  public function getAdmins(){
  
    $data = $this->dbc->Select("SELECT admins.id,name,phone,email,image,roles.role_name as role FROM admins inner join roles on admins.role = roles.id");
     if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales"){
      return $data;
     }
    
  
  }

  public function getCurrAdmin($id){
    if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales") {

    $data = $this->dbc->Select("SELECT admins.id,name,phone,email,image,roles.role_name as role FROM admins 
    inner join roles on admins.role = roles.id WHERE admins.id =".$id);
if($data[0]->role == "owner" && $_SESSION['role'] == "manager"){
  return false;
}

return $data;
    }
  }

  public function delAdmin($id){
    if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales") {
      $q = "DELETE FROM admins WHERE admins.id =".$id;
      $data = $this->dbc->Prepare($q);
      if($_SESSION['role'] == "manager" && $id != $_SESSION['currentUser']->id){
        $data->execute();
        if($data->affected_rows > 0 ){
            return true;
        }
        else{
            return false;
        }
        }
       
      }
     
    

    }
  
  
  public function addAdmin($name,$role,$phone,$email,$password,$image){
    if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales") {
    $q = "INSERT INTO admins (name,role,phone,email,password,image) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $this->dbc->Prepare($q);
    $stmt->bind_param("siisss",$name,$role,$phone,$email,$password,$image);
    $stmt->execute();
    return $stmt->insert_id;
    }
  }


  public function updateAdmin($id,$name,$role,$phone,$email,$password,$image){
    if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales"){
    if(!empty($password)){
      $q1 = "UPDATE admins
      SET password = '$password' where id = '$id' ";
    }
    $data1 = $this->dbc->Prepare($q1);
    $data1->execute();
    
    if($image != "../client/img/user.jpg"){
      $q = "UPDATE admins
      SET name = '$name', role = '$role', phone = '$phone', email = '$email', image = '$image' 
      where id = '$id' ";
    }else{
      $q = "UPDATE admins
      SET name = '$name', role = '$role', phone = '$phone', email = '$email' 
      where id = '$id' ";
    }
   
    $data = $this->dbc->Prepare($q);
    $data->execute();

return $id;
  }

}




    
}


?>