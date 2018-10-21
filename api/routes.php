<?php

$controllers = array("login" => ["login","logout"],"admin" => ["get_admins","get_admin","del_admin","add_admin", "update_admin"], "home" => ["get_data","get_current","del_current","get_enrolled_students","get_courses_names","get_enrolled_courses","get_students_names"],
"student" => ["add_student","update_student"], "course" =>["add_course","update_course"]);

if(array_key_exists($controller,$controllers)){ 
    if(in_array($action,$controllers[$controller])){ 
        navigate($controller,$action);
    }else{
        navigate($controller,"output");
    }
}
else{
    navigate("error","no_controller");
}


function navigate($controllerName,$action){
    
    require_once("./Controllers/" . $controllerName . "Controller.php" );
    $controllerName = $controllerName."Controller";
    $controller = new $controllerName();

    $controller->{$action}();
    
    
    
    
}


?>