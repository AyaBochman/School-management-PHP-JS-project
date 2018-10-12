// function init() {
//     getData();
// }
// init();
// checkLogin();

checkLogin();
getData();

function getData() {

    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_data",
        method: "GET",
        success: function (res) {
            DOM.students.innerHTML = "";
            DOM.courses.innerHTML = "";
            draw(JSON.parse(res));

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

    // console.log(id);
    // console.log(table);
    getCurrent(id, table);
    getEnrolled(id, table);
    getNames(id, table);

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
            alert(JSON.stringify(res));
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
                DOM.overview.innerHTML = "";
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


function editStudent() {
    var that = this.parentElement;
    var id = that.id;
    // var table = that.getAttribute("table");
    console.log(id);
    console.log("edit student");
    loadForm("student");
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_current&table=students&id="+id,
        method: "GET",
        data: { id: id },
        success: function (res) {
            console.log(JSON.parse(res));
            fillForm(JSON.parse(res),"student");
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }

    })
}

function editCourse() {
    var that = this.parentElement;
    var id = that.id;
    // var table = that.getAttribute("table");
    console.log(id);
    console.log("edit course");
    loadForm("course");
    $.ajax({
        url: "http://localhost/school/api/index.php?controller=home&action=get_current&table=courses&id="+id,
        method: "GET",
        data: { id: id },
        success: function (res) {
            console.log(JSON.parse(res));
            fillForm(JSON.parse(res),"course");
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }

    })
}
//ADD//UPDATE STUDENT TO DB
// $(document).ready(function(e){
//     $("#studentForm").on('submit', function(e){
//         e.preventDefault();
//         $.ajax({
//             type: 'POST',
//             url: 'http://localhost/school/api/submit.php',
//             data: new FormData(this),
//             contentType: false,
//             cache: false,
//             processData:false,
//             beforeSend: function(){
//                 $('.submitBtn').attr("disabled","disabled");
//                 $('#studentForm').css("opacity",".5");
//             },
//             success: function(msg){
//                 $('.statusMsg').html('');
//                 if(msg == 'ok'){
//                     $('#studentForm')[0].reset();
//                     $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
//                 }else{
//                     $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, please try again.</span>');
//                 }
//                 $('#studentForm').css("opacity","");
//                 $(".submitBtn").removeAttr("disabled");
//             }
//         });
//     });

//     //file type validation
//     $("#file").change(function() {
//         var file = this.files[0];
//         var imagefile = file.type;
//         var match= ["image/jpeg","image/png","image/jpg"];
//         if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
//             alert('Please select a valid image file (JPEG/JPG/PNG).');
//             $("#file").val('');
//             return false;
//         }
//     });
// });
//=========================================================================kodem

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
                console.log(JSON.parse(res));
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
                console.log(JSON.parse(res));
                getData();
            },
            error: function (res) {
                console.log(JSON.stringify(res));
            }

        })
    }
}


//DELETE STUDENT
// function delStudent() {
//     var student = this.parentElement;
//     var _id = student.id;
//     console.log(_id);


//         $('#myModal').modal('show');
//         $('.delete-confirm').click(function () {

//                 $.ajax({
//                     url: "http://localhost/school/api/index.php?controller=student&action=del_student",
//                     method: "POST",
//                     data: { id: _id },
//                     success: function (data) {
//                         if ($('.modal-header').hasClass('alert-danger')) {
//                             $('.modal-header').removeClass('alert-danger').addClass('alert-success');
//                             //hide ok button as it is not necessary
//                             $('.delete-confirm').css('display', 'none');
//                         }
//                         $('.success-message').html('Student deleted successfully!');

//                         student.remove();
//                         DOM.overview.innerHTML = "";
//                         DOM.overviewHead.innerHTML = "Overview";
//                         console.log("removed");
//                         getData();

//                     },
//                     error: function (res) {
//                             if (!$('.modal-header').hasClass('alert-danger')) {
//                                 $('.modal-header').removeClass('alert-success').addClass('alert-danger');
//                                 $('.delete-confirm').css('display', 'none');
//                     }

//                     $('.success-message').html(err.statusText);
//                 }
//             });

//             $("#myModal").on("hidden.bs.modal", function () {
//                 $(".modal-header").removeClass(' ').addClass('alert-danger');
//                 $('.delete-confirm').css('display', 'inline-block');
//                 $('.success-message').html('').html('Are you sure you wish to delete this student?');
//             });

//             });



// }

// var btn = document.getElementById("delBtn");
// btn.addEventListener('click',function(){
//     console.log("Hello");
// })

// function del(){
//     var id = this.parentElement;
//     console.log(id);
// }
// console.log(btn.parentElement);
// $("#delBtn").click(function(){

//     // var that = $(this).parentElement;
//     // var id = that.id;
//     // var table = that.getAttribute("table");
//     // console.log(id);
//     // console.log(table);
// });




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
                console.log(JSON.parse(res));
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
                console.log(JSON.parse(res));
            },
            error: function (res) {
                console.log(JSON.stringify(res));
            }

        })
    }

}


// //DELETE COURSE
// function delCourse() {
//     var course = this.parentElement;
//     var _id = course.id;
//     console.log(_id);
//     $('#myModal').modal('show');
//     $('.delete-confirm').click(function () {

//             $.ajax({
//                 url: "http://localhost/school/api/index.php?controller=course&action=del_course",
//                 method: "POST",
//                 data: { id: _id },
//                 success: function (data) {
//                     if ($('.modal-header').hasClass('alert-danger')) {
//                         $('.modal-header').removeClass('alert-danger').addClass('alert-success');
//                         //hide ok button as it is not necessary
//                         $('.delete-confirm').css('display', 'none');
//                     }
//                     $('.success-message').html('Course deleted successfully!');

//                     course.remove();
//                     console.log("removed");
//                     DOM.overview.innerHTML = "";
//                     DOM.overviewHead.innerHTML = "Overview";
//                     getData();

//                 },
//                 error: function (res) {
//                         if (!$('.modal-header').hasClass('alert-danger')) {
//                             $('.modal-header').removeClass('alert-success').addClass('alert-danger');
//                             $('.delete-confirm').css('display', 'none');
//                 }

//                 $('.success-message').html(err.statusText);
//             }
//         });

//         $("#myModal").on("hidden.bs.modal", function () {
//             $(".modal-header").removeClass(' ').addClass('alert-danger');
//             $('.delete-confirm').css('display', 'inline-block');
//             $('.success-message').html('').html('Are you sure you wish to delete this course?');
//         });

//         });


// }



// init();
