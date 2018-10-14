
function init(){
    checkLogin();
}
init();

// checkLogin();
var userJob;


function checkLogin(){
    $.ajax({
        method: "GET",
        url: "http://localhost/school/api/index.php?controller=login&action=login",
        success: function (response) {
       if(response == "unauthorized"){
        window.location.href = "http://localhost/school/client/login.html";     
      
       }
       else{
     
        console.log("checkLogin");
        console.log("you are logged in as " + response);
        $("#hello-user").html("Welcome!"+"<br>"+JSON.parse(response));
        getData();
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



// function getData() {

//     $.ajax({
//         url: "http://localhost/school/api/index.php?controller=home&action=get_data",
//         method: "GET",
//         success: function (res) {
//             DOM.leftHead.innerHTML = "Courses <button class='btn btn-primary' id='addCourseBtn' onclick='addCourseForm()'><i class='fa fa-plus-circle'></i></button>";
//             DOM.rightHead.innerHTML = "Students <button class='btn btn-primary' id='addStudentBtn' onclick='addStudentForm()'><i class='fa fa-plus-circle'></i></button>"
//             DOM.students.innerHTML = "";
//             DOM.courses.innerHTML = "";
//             draw(JSON.parse(res));
//             datac = res;
//            console.log("inside: "+datac);

//         },
//         error: function (res) {
//             console.log(JSON.stringify(res));
//         }

//     })
// }


// function getCourses(smt){
// console.log(smt);
// }

// getCourses(data[0]);