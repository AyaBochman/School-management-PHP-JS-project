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
    $data = $this->dbc->Select("SELECT admins.id,name,phone,email,image,roles.role_name as role FROM admins 
    inner join roles on admins.role = roles.id WHERE admins.id =".$id);

return $data;
  }

  public function delAdmin($id){
    if(isset($_SESSION['currentUser'])) {
      $q = "DELETE FROM admins WHERE admins.id =".$id;
      
      
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
  
  public function addAdmin($name,$role,$phone,$email,$password,$image){
    $q = "INSERT INTO admins (name,role,phone,email,password,image) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $this->dbc->Prepare($q);
    $stmt->bind_param("siisss",$name,$role,$phone,$email,$password,$image);
    $stmt->execute();
    return $stmt->insert_id;
  }


  public function updateAdmin($id,$name,$role,$phone,$email,$password,$image){
    // if(isset($_SESSION['currentUser']) && $_SESSION['role'] != "sales"){
    if($image != "../client/img/user.jpg" && $password != ""){
      $q = "UPDATE admins
      SET name = '$name', role = '$role', phone = '$phone', email = '$email', password = '$password', image = '$image' where id = '$id' ";
    }else{
      $q = "UPDATE admins
      SET name = '$name', role = '$role', phone = '$phone', email = '$email' where id = '$id' ";
    }
   
    $data = $this->dbc->Prepare($q);
    $data->execute();
// }
return $id;

}




    
}


?>