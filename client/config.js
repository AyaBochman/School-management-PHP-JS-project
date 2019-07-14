


function init(){
    checkLogin();
}
init();

//GLOBALS
var userJob;
var userId;

function checkLogin(){
    $.ajax({
        method: "GET",
        url: "http://localhost/school/api/index.php?controller=login&action=login",
        success: function (response) {
    
        console.log("you are logged in as " + JSON.parse(response)[0]);
        $("#hello-user").html("<img id='hello-img' src='"+JSON.parse(response)[2]+"'>"+"Welcome!"+"<br>"+JSON.parse(response)[0]+", "+ JSON.parse(response)[1]);
        getData();
        userJob = JSON.parse(response)[1];
        userId = JSON.parse(response)[3];
        if(userJob == "sales"){
            $("#adminLink").remove();
    
       }

        },
        error: function (error) {
            window.location.href = "http://localhost/school/client/login.html";  
        }

    })
}

