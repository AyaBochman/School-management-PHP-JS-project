// $( window ).on( "load", init );

// function init(){
//     console.log("the page loads");

   
// }

function checkLogin(){
    $.ajax({
        method: "GET",
        url: "http://localhost/school/api/index.php?controller=login&action=login",
        success: function (response) {
       if(response == "unauthorized"){
        window.location.href = "http://localhost/school/client/login.html";     
      
       }
       else{
        getData();
        console.log("checkLogin");
        console.log("you are logged in as " + response);
        
        $("#hello-user").html("<h5>Hello "+JSON.parse(response)+"</h5>");
    
       }

        },
        error: function (response) {
            alert("oops");
        }

    })
}

function logInNow() {
    console.log("Hey");
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    $.ajax({
        method: "POST",
        url: "http://localhost/school/api/index.php?controller=login&action=login",
        data: { email: email, password: password },
        success: function (response) {
            console.log(response);
            localStorage.setItem("currentUser", JSON.stringify(email));
            window.location.href = response;
           

        },
        error: function (response) {
            alert("oops");
        }

    })

}


function getData() {

    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_data",
        method: "GET",
        success: function (res) {
            DOM.leftHead.innerHTML = "Courses <button class='btn btn-primary' id='addCourseBtn' onclick='addCourseForm()'><i class='fa fa-plus-circle'></i></button>";
            DOM.rightHead.innerHTML = "Students <button class='btn btn-primary' id='addStudentBtn' onclick='addStudentForm()'><i class='fa fa-plus-circle'></i></button>"
            DOM.students.innerHTML = "";
            DOM.courses.innerHTML = "";
            draw(JSON.parse(res));

        },
        error: function (res) {
            console.log(JSON.stringify(res));
        }

    })
}


function logout(){
    $.ajax({
        method: "POST",
        url: "http://localhost/school/api/index.php?controller=login&action=logout",
        success: function (response) {
            console.log(response);
            localStorage.removeItem("currentUser");
            window.location.href = "http://localhost/school/client/login.html";
           

        },
        error: function (response) {
            alert("oops");
        }

    })
}

// $("#logout").click(function(){
   
// })
   

   // function init() {
    //     getData();
    // }

    // init();

// function getAdmins(){
//     DOM.main.innerHTML = "";
// }
// function getHome() {
//         getAll("courses");
//         getAll("students");
//     }
    
    
// isLoggedIn();




//MAIN DISPLAY

// 