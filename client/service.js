checkLogin();



function getAdmins() {
    DOM.leftHead.innerHTML = "";
    DOM.rightHead.innerHTML = "";
    DOM.overview.innerHTML = "";
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=admin&action=get_admins",
        method: "GET",
        success: function (res) {

            DOM.rightHead.innerHTML = "Admins <button class='btn btn-primary'><i class='fa fa-plus-circle'></i></button>";

            DOM.courses.remove();

            DOM.students.innerHTML = "";

            drawAdmins(JSON.parse(res));

        },
        error: function (res) {
            console.log(JSON.stringify(res));
        }

    })

}


function displaySelected() {
    DOM.overview.innerHTML = "";
    var id = this.id;
    var table = this.getAttribute("table");

    getCurrent(id, table);
    getEnrolled(id, table);
    getNames(id, table);

}

function displayAdmin() {
    DOM.overview.innerHTML = "";
    var id = this.id;
    getAdmin(id);
}


function getAdmin(id){
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=admin&action=get_admin",
        method: "GET",
        data: { id: id },
        success: function (res) {
            console.log(JSON.parse(res));
            // drawSelected(JSON.parse(res), table);

        },
        error: function (res) {
            console.log(JSON.stringify(res));
        }

    })
}


function getCurrent(id, table) {

    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_current",
        method: "GET",
        data: { id: id, table: table },
        success: function (res) {
            // console.log(JSON.parse(res));
            drawSelected(JSON.parse(res), table);

        },
        error: function (res) {
            console.log(JSON.stringify(res));
        }

    })

}

//GET ENROLLED
function getEnrolled(id, param) {
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_enrolled_" + param,
        method: "GET",
        data: { id: id },
        success: function (res) {
            // console.log(res);
            enrolledNum(JSON.parse(res), param);
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }

    })
}


//GET NAMES
function getNames(id, param) {
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_" + param + "_names",
        method: "GET",
        data: { id: id },
        success: function (res) {
            displayName(JSON.parse(res));

        },
        error: function (res) {
            alert(JSON.stringify(res));
        }

    })
}


function delCurrent(id, table) {
    var that = this.parentElement;
    var id = that.id;
    var table = that.getAttribute("table");
    // console.log(id);
    // console.log(table);

    $('#myModal').modal('show');
    $('.delete-confirm').click(function () {

        $.ajax({
            url: "http://localhost/school/api/index.php?controller=home&action=del_current",
            method: "POST",
            data: { id: id, table: table },
            success: function (data) {
                if ($('.modal-header').hasClass('alert-danger')) {
                    $('.modal-header').removeClass('alert-danger').addClass('alert-success');
                    //hide ok button as it is not necessary
                    $('.delete-confirm').css('display', 'none');
                }
                $('.success-message').html('deleted successfully!');

                that.remove();
                clean();
                console.log("removed");
                getData();


            },
            error: function (res) {
                if (!$('.modal-header').hasClass('alert-danger')) {
                    $('.modal-header').removeClass('alert-success').addClass('alert-danger');
                    $('.delete-confirm').css('display', 'none');
                }

                $('.success-message').html(err.statusText);
            }
        });

        $("#myModal").on("hidden.bs.modal", function () {
            $(".modal-header").removeClass(' ').addClass('alert-danger');
            $('.delete-confirm').css('display', 'inline-block');
            $('.success-message').html('').html('Are you sure you wish to delete this?');
        });

    });



}



function editCurrent() {
    status = "edit";
    var that = this.parentElement;
    var id = that.id;
    var table = that.getAttribute("table");
    loadForm(table);
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_current&" + table + "=students&id=" + id,
        method: "GET",
        data: { id: id, table: table },
        success: function (res) {
            console.log("status changed to: " + status);
            fillForm(JSON.parse(res), table);
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }

    })
}



//ADD//UPDATE COURSE TO DB
function saveCourse() {
    if (status == "add") {
        var courseName = cFORM.courseName.value;
        var desc = cFORM.desc.value;
        // var courseImage = cFORM.email.value;

        $.ajax({
            url: "http://localhost/school/api/index.php?controller=course&action=add_course",
            method: "POST",
            data: { courseName: courseName, desc: desc },
            success: function (res) {
                clean();
                getCurrent(JSON.parse(res), "courses");
                getData();
            },
            error: function (res) {
                console.log(JSON.stringify(res));
            }

        })
    }
    if (status == "edit") {
        var id = cFORM.id.value;
        var courseName = cFORM.courseName.value;
        var desc = cFORM.desc.value;


        $.ajax({
            url: "http://localhost/school/api/index.php?controller=course&action=update_course",
            method: "POST",
            data: { id: id, courseName: courseName, desc: desc },
            success: function (res) {
                clean();
                console.log("course updated");
                getCurrent(id, "courses");
                getData();
            },
            error: function (res) {
                console.log(JSON.stringify(res));
            }

        })
    }

}

function saveStudent() {
    if (status == "add") {
        var name = sFORM.name.value;
        var phone = sFORM.phone.value;
        var email = sFORM.email.value;


        $.ajax({
            url: "http://localhost/school/api/index.php?controller=student&action=add_student",
            method: "POST",
            data: { name: name, phone: phone, email: email },
            success: function (res) {
                clean();
                getCurrent(JSON.parse(res), "students");
                getData();
            },
            error: function (res) {
                console.log(JSON.stringify(res));
            }

        })
    }
    if (status == "edit") {
        var id = sFORM.id.value;
        var name = sFORM.name.value;
        var phone = sFORM.phone.value;
        var email = sFORM.email.value;

        $.ajax({
            url: "http://localhost/school/api/index.php?controller=student&action=update_student",
            method: "POST",
            data: { id: id, name: name, phone: phone, email: email },
            success: function (res) {
                clean();
                console.log("student updated");
                getCurrent(id, "students");
                getData();
            },
            error: function (res) {
                console.log(JSON.stringify(res));
            }

        })
    }

}


