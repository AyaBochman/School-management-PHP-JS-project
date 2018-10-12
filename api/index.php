<?php
header('Access-Control-Allow-Origin: *'); 
session_start();

if(isset($_REQUEST['controller']) && isset($_REQUEST['action'])){
    $controller = $_REQUEST['controller'];
    $action = $_REQUEST['action'];
}else{
    $controller = 'login';
    $action = 'login';
}

require_once('routes.php');


?>