
//    function isLoggedIn(){
    
//         $.ajax({
//             method: "GET",
//             url: "http://localhost/school/api/index.php?controller=login&action=index",
//             success: function (res) {
//                 console.log("here");
//                 if(res != ""){
//                     getHome();
//                 }
                    
               
               
//             },
//             error: function (error) {
//                 console.log("error");
//                 window.location.href = "http://localhost/school/client/login.html"
               
                
//             }
//         })
    
// }
// $("#loginBtn").click(function(){
//     console.log("Hey");
//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;
//     $.ajax({
//         method: "POST",
//         url: "http://localhost/school/api/index.php?controller=login&action=login",
//         data: { email: email, password: password },
//         success: function (response) {
//             console.log(response);
//             localStorage.setItem("currentUser", JSON.stringify(email));
            
//             window.location.href = response;
           
//             console.log("done");
            

//         },
//         error: function (response) {
//             alert("oops");
//         }

//     })
// })
// getData();


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
        
        $("#hello-user").html("<h5>Hello "+JSON.parse(response)+"</h5>");
       }
          
    //    console.log(response);
                
        
            // window.location.href = response;     

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
            getData();

        },
        error: function (response) {
            alert("oops");
        }

    })

}


$("#logout").click(function(){
    console.log("bye");
})
   

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