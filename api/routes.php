<?php
//$controller = somthing and $action = somthing
$controllers = array("login" => ["login"], "home" => ["get_data","get_current","del_current","get_enrolled_students","get_courses_names","get_enrolled_courses","get_students_names"],
"student" => ["add_student","update_student"], "course" =>["add_course","update_course"]); //, "cart"=>["add_product","get_cart","getCurrentCart"]

if(array_key_exists($controller,$controllers)){ //do we have such controller
    if(in_array($action,$controllers[$controller])){ //do we have such action
        navigate($controller,$action);
    }else{
        navigate($controller,"output");
    }
}
else{
    navigate("error","no_controller");
}

//error , no_action
function navigate($controllerName,$action){
    
    require_once("./Controllers/" . $controllerName . "Controller.php" );
    $controllerName = $controllerName."Controller";
    $controller = new $controllerName();

    $controller->{$action}();
    
    
    
    
}


?>