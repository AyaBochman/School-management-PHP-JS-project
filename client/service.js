// checkLogin();

// getData();
// function init(){
//     console.log("refresh");
// }
getData();

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
            if (document.body.contains(sFORM.courseChoose)) {
                loadCourses(JSON.parse(res));
                // console.log(JSON.parse(res)[0]);
            }



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


}

function saveAdmin() {
    if (status == "add") {
        var adminName = aFORM.adminName.value;
        var adminRole = aFORM.adminRole.value;
        var adminPhone = aFORM.adminPhone.value;
        var adminEmail = aFORM.adminEmail.value;
        var adminPass = aFORM.adminPass.value;


        $.ajax({
            url: "http://localhost/school/api/index.php?controller=admin&action=add_admin",
            method: "POST",
            data: {
                adminName: adminName, adminRole: adminRole, adminPhone: adminPhone, adminEmail: adminEmail,
                adminPass: adminPass
            },
            success: function (res) {
                console.log("added");
                clean();
                // getAdmin(JSON.parse(res));
                // getAdmins();
            },
            error: function (res) {
                console.log(JSON.stringify(res));
            }

        })
    }
}


function getCurrent(id, table) {

    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_current",
        method: "GET",
        data: { id: id, table: table },
        success: function (res) {
            // console.log(JSON.parse(res));

            drawSelected(JSON.parse(res), table);
            getEnrolled(id, table);
            getNames(id, table);

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
                DOM.overviewHead.innerText = "Overview";
                
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
    // console.log(that);
    var id = that.id;
    var table = that.getAttribute("table");
    loadForm(table);
 
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_current&table="+ table + "&id=" + id,
        method: "GET",
        data: { id: id, table: table },
        success: function (res) {
        
            fillForm(JSON.parse(res), table);
            
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }

    })
}



//ADD//UPDATE COURSE TO DB
function saveCourse() {
    let form = new FormData($("form")[0]);
    if (status == "add") {
       
        $.ajax({
            type: "POST",
            url: "http://localhost/school/api/index.php?controller=course&action=add_course",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                clean();
                getCurrent(res, "courses");
                getData();
            }
        });
      
    }
    if (status == "edit") {
        $.ajax({
            type: "POST",
            url: "http://localhost/school/api/index.php?controller=course&action=update_course",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                clean();
                getCurrent(res, "courses");
                getData();
            }
        });
    }

}

function saveStudent() {
    var check = sFORM.checkbox;
    var myCourses = [];
    for (i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
            myCourses.push(check[i].value);
        }

    }
    let form = new FormData($("form")[0]);
    var json_arr = JSON.stringify(myCourses);
    form.append('myCourses',json_arr);

    if (status == "add") {
        $.ajax({
            type: "POST",
            url: "http://localhost/school/api/index.php?controller=student&action=add_student",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                clean();
                console.log(res);
                getCurrent(res, "students");
                getData();
            }
        });
    }

    if (status == "edit") {
        $.ajax({
            type: "POST",
            url: "http://localhost/school/api/index.php?controller=student&action=update_student",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                clean();
                console.log(res);
                getCurrent(res, "students");
                getData();
            }
        });
        
    }

}


//ADMINS
function getAdmins() {
    DOM.leftHead.innerHTML = "";
    DOM.rightHead.innerHTML = "";
    DOM.overviewHead.innerText = "Overview";
    DOM.overview.innerHTML = "";
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=admin&action=get_admins",
        method: "GET",
        success: function (res) {

            DOM.rightHead.innerHTML = "Admins <button class='btn btn-primary' onclick='addAdminForm()'><i class='fa fa-plus-circle'></i></button>";

            DOM.courses.innerHTML = "";

            DOM.students.innerHTML = "";

            drawAdmins(JSON.parse(res));

        },
        error: function (res) {
            console.log(JSON.stringify(res));
        }

    })

}
function displayAdmin() {
    DOM.overview.innerHTML = "";
    var id = this.id;
    getAdmin(id);
}


function getAdmin(id) {
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=admin&action=get_admin",
        method: "GET",
        data: { id: id },
        success: function (res) {

            drawAdmin(JSON.parse(res));

        },
        error: function (res) {
            console.log(JSON.stringify(res));
        }

    })
}

function delAdmin() {
    var that = this.parentElement;
    var id = that.id;

    $('#myModal').modal('show');
    $('.delete-confirm').click(function () {

        $.ajax({
            url: "http://localhost/school/api/index.php?controller=admin&action=del_admin",
            method: "POST",
            data: { id: id },
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
                getAdmins();


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
