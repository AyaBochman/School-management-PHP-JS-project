


//MY LOGIN FORM VALIDATION

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

                $this.addClass('ok');
                $state.html('Welcome back!');
                setTimeout(function () {
                    localStorage.setItem("currentUser", JSON.stringify(email));
                    window.location.href = response;
                }, 500);

            },
            error: function (error) {
                clearLogin();
                $(".error").html('*the username/password is invalid');
                $state.html('Log in');
                $this.removeClass('ok loading');
            }

        })

    }, 2000);

});


function clearLogin() {
    $('#email').val('');
    $("#password").val('');

}

function logout() {
    $.ajax({
        method: "POST",
        url: "http://localhost/school/api/index.php?controller=login&action=logout",
        success: function (response) {
            console.log(response);
            localStorage.removeItem("currentUser");
            window.location.href = "http://localhost/school/client/login.html";


        },
        error: function (error) {
            alert(error);
        }

    })
}

