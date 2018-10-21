// $( window ).on( "load", init );

// function init(){
//     console.log("the page loads");

// }



// function logInNow() {

//     var email = $("#email").val();
//     var password = $("#password").val();

//     $.ajax({
//         method: "POST",
//         url: "http://localhost/school/api/index.php?controller=login&action=login",
//         data: { email: email, password: password },
//         success: function (response) {
//             if (response == "invalid") {

//                 // return false;
//             } else {
//                 setTimeout(function () {
//                     localStorage.setItem("currentUser", JSON.stringify(email));
//                     window.location.href = response;
//                 }, 1000)
               
//             }
//             // console.log(response);



//         },
//         error: function (response) {
//             alert("oops");
//         }

//     })

// }

//LOGIN
// var working = false;
$('.login').on('submit', function (e) {
    if ($.trim($("#email").val()) === "" || $.trim($("#password").val()) === "") {
        $('.error').html('*You need to fill all the fields');
        return false;
    }

    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    var $this = $(this),
        $state = $this.find('button > .state');
    $this.addClass('loading');
    $state.html('Authenticating');
    setTimeout(function () {
        $.ajax({
            method: "POST",
            url: "http://localhost/school/api/index.php?controller=login&action=login",
            data: { email: email, password: password },
            success: function (response) {
                if (response !== "http://localhost/school/client/index.html") {
                    $state.html('Log in');
                    $this.removeClass('ok loading');
                    $(".error").html('*the username/password is invalid');
                } else {
                    $this.addClass('ok');
                    $state.html('Welcome back!');
                    setTimeout(function () {
                        localStorage.setItem("currentUser", JSON.stringify(email));
                        window.location.href = response;
                    }, 1000)
                   
                }
                // console.log(response);
    
    
    
            },
            error: function (response) {
                alert("oops");
            }
    
        })
    




    }, 2000);




});


//         if (!logInNow()) {
//           

//         } else {
//    setTimeout(function () {
//                 $this.addClass('ok');
//                 $state.html('Welcome back!');
//                 logInNow();
//             }, 500);
            
//         }


function logout() {
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