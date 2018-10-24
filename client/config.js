


function init(){
    checkLogin();
}
init();


var userJob;


function checkLogin(){
    $.ajax({
        method: "GET",
        url: "http://localhost/school/api/index.php?controller=login&action=login",
        success: function (response) {
    
        console.log(JSON.parse(response)[2]);
        console.log("checkLogin");
        console.log("you are logged in as " + response);
        $("#hello-user").html("<img id='hello-img' src='"+JSON.parse(response)[2]+"'>"+"Welcome!"+"<br>"+JSON.parse(response)[0]+", "+ JSON.parse(response)[1]);
        // $("#hello-img").attr("src",JSON.parse(response)[2]);
        getData();
        userJob = JSON.parse(response)[1];
        if(userJob == "sales"){
            $("#adminLink").remove();
    
       }

        },
        error: function (error) {
            window.location.href = "http://localhost/school/client/login.html";  
        }

    })
}

