// $( window ).on( "load", init );

// function init(){
//     console.log("the page loads");

   
// }
let userJob;

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
        userJob = JSON.parse(response)[1];
        if(userJob == "sales"){
            $("#adminLink").remove();
        }
       
    
       }

        },
        error: function (response) {
            alert("oops");
        }

    })
}

function logInNow() {

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

//LOGIN
var working = false;
$('.login').on('submit', function(e) {
   
  e.preventDefault();
  if (working) return;
  working = true;
  var $this = $(this),
    $state = $this.find('button > .state');
  $this.addClass('loading');
  $state.html('Authenticating');
  setTimeout(function() {
    $this.addClass('ok');
    $state.html('Welcome back!');
    logInNow();
    setTimeout(function() {
      $state.html('Log in');
      $this.removeClass('ok loading');
      working = false;
    }, 4000);
  }, 3000);
});


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