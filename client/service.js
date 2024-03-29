
getData();

function getData() {

    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_data",
        method: "GET",
        success: function (res) {
            DOM.leftHead.innerHTML = "Courses <span class='add-btn' id='addCourseBtn' onclick='addCourseForm()'><i class='fa fa-plus-circle'></i></span>";
            DOM.rightHead.innerHTML = "Students <span class='add-btn' id='addStudentBtn' onclick='addStudentForm()'><i class='fa fa-plus-circle'></i></span>"
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



function getCurrent(id, table) {

    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_current",
        method: "GET",
        data: { id: id, table: table },
        success: function (res) {
            drawSelected(JSON.parse(res), table);
            getEnrolled(id, table);
        },
        error: function (res) {
            console.log(JSON.stringify(res));
        }

    })

}

//GET ENROLLED NUM AND NAMES
function getEnrolled(id, param) {
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_enrolled_" + param,
        method: "GET",
        data: { id: id },
        success: function (res) {
            enrolledNum(JSON.parse(res), param);
        },
          //names of enrolled
        complete:function(){
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
    var id = that.id;
    var table = that.getAttribute("table");
    loadForm(table);
 
    return $.ajax({
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
    if ($.trim($("#courseName").val()) === "" || $.trim($("#desc").val()) === "") {
        $('.ferror').html('*You need to fill name and description');
        return false;
    }

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
    if ($.trim($("#name").val()) === "" || $.trim($("#phone").val()) === "" || $.trim($("#email").val()) === "") {
        $('.ferror').html('*You need to fill name/email/password');
        return false;
    }

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

function saveAdmin() {
  

    let form = new FormData($("form")[0]);
    if (status == "add") {
        if ($.trim($("#adminName").val()) === "" || $.trim($("#adminPhone").val()) === "" || $.trim($("#adminEmail").val()) === ""
        || $.trim($("#adminRole").val()) === "" || $.trim($("#adminPass").val()) === "") {
            $('.ferror').html('*You need to fill all the fields');
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://localhost/school/api/index.php?controller=admin&action=add_admin",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                clean();
                getAdmin(res);
                getAdmins();
            }
        });
      
    }
    if(status == "edit"){
        if ($.trim($("#adminName").val()) === "" || $.trim($("#adminPhone").val()) === "" || $.trim($("#adminEmail").val()) === ""
        || $.trim($("#adminRole").val()) === "") {
            $('.ferror').html('*You need to fill all the fields');
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://localhost/school/api/index.php?controller=admin&action=update_admin",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                clean();
                getAdmin(res);
                checkLogin();
                getAdmins();
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

            DOM.rightHead.innerHTML = "Admins <span class='add-btn' onclick='addAdminForm()'><i class='fa fa-plus-circle'></i></span>";

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
