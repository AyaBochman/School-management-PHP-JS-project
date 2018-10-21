

// $(document).ready(function () {

//     /*! Fades in page on load */
//     $('body').css('display', 'none');
//     $('body').fadeIn(700);

// });


var DOM = function () {
    return {
        main: document.getElementById("main"),
        courses: document.getElementById("courseList"),
        students: document.getElementById("studentList"),
        overview: document.getElementById("overview"),
        leftHead: document.getElementById("leftHead"),
        rightHead: document.getElementById("rightHead"),
        rowContent: document.getElementById("rowContent"),
        overviewHead: document.getElementById("overview-h4")

    }
}();


function clean() {
    DOM.overview.innerHTML = "";
    DOM.overviewHead.innerHTML = "";
}

//STUDENT FORM
var sFORM = function () {
    return {
        id: document.getElementById("theId"),
        name: document.getElementById("name"),
        phone: document.getElementById("phone"),
        email: document.getElementById("email"),
        imageP: document.getElementById("studentPreview"),
        courseChoose: document.getElementById("coursesChoose"),
        checkbox: document.getElementsByName("check_list[]")

    }
}();

//COURSE FORM
var cFORM = function () {
    return {
        courseId: document.getElementById("courseId"),
        courseName: document.getElementById("courseName"),
        desc: document.getElementById("desc"),
        imageP: document.getElementById("coursePreview")

    }
}();

//ADMIN FORM
var aFORM = function () {
    return {
        adminId: document.getElementById("adminId"),
        adminName: document.getElementById("adminName"),
        adminRole: document.getElementById("adminRole"),
        adminPhone: document.getElementById("adminPhone"),
        adminEmail: document.getElementById("adminEmail"),
        adminPass: document.getElementById("adminPass"),
        imageP: document.getElementById("adminPreview")

    }
}();


//LOADING FORM
function loadForm(param) {
    $("#overview").load(param + "Form.html");
}


//ADD STUDENT FORM
function addStudentForm() {
    status = "add";
    DOM.overviewHead.innerText = "Add a new Student";
    loadForm("students");
}

//ADD COURSE FORM
function addCourseForm() {
    status = "add";
    DOM.overviewHead.innerText = "Add a new Course";
    loadForm("courses");
}

//ADD ADMIN FORM
function addAdminForm() {
    status = "add";
    DOM.overviewHead.innerText = "Add a new Admin";
    loadForm("admins");
}

//GLOBAL VARS
//the status of the form edit/add
var status;
var checkarr = []; //the array of checkboxes created on a form
var courseCheck = []; //the array of the courses every student has -- checked


//COURSE & STUDENT LIST DRAW
function draw(array) {
    if (array !== "") {
        for (i = 0; i < array[0].length; i++) {

            DOM.courses.appendChild(courseLi(array[0][i]));
        }
        for (i = 0; i < array[1].length; i++) {

            DOM.students.appendChild(studentLi(array[1][i]));
        }
    }
}

//ADMIN LIST DRAW
function drawAdmins(array) {
    for (let index = 0; index < array.length; index++) {
        DOM.students.appendChild(adminLi(array[index]));
    }
}


function adminLi(singleAdmin) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.classList.add("adm-image");
    img.src = singleAdmin.image;
    var text = document.createElement("p");
    text.classList.add("li-text");
    li.classList.add("list-group-item");
    text.innerHTML = singleAdmin.name + "," + singleAdmin.role + "<br>" + singleAdmin.phone + "<br>" + singleAdmin.email;
    li.id = singleAdmin.id;
    li.setAttribute("table", "admins");
    li.appendChild(text);
    li.appendChild(img);

    li.addEventListener("click", displayAdmin);
    return li;
}

function courseLi(singleCourse) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.classList.add("li-image");
    var text = document.createElement("p");
    text.classList.add("li-text");
    img.src = singleCourse.image;
    li.classList.add("list-group-item");
    text.innerText = singleCourse.name;
    li.id = singleCourse.id;
    li.setAttribute("table", "courses");
    li.appendChild(img);
    li.appendChild(text);
    li.addEventListener("click", displaySelected);
    return li;
}


function studentLi(singleStudent) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    var text = document.createElement("p");
    img.classList.add("li-image");
    text.classList.add("li-text");
    img.src = singleStudent.image;
    li.classList.add("list-group-item");
    text.innerHTML = singleStudent.name + "<br>" + singleStudent.phone + "<br>";
    li.id = singleStudent.id;
    li.setAttribute("table", "students");
    li.appendChild(img);
    li.appendChild(text);
    li.addEventListener("click", displaySelected);

    return li;
}


//FILLING ANY FORM WITH THE DATA
function fillForm(result, param) {

    switch (param) {
        case "students":
            sFORM.id.value = result[0].id;
            sFORM.name.value = result[0].name;
            sFORM.phone.value = result[0].phone;
            sFORM.email.value = result[0].email;
            sFORM.imageP.src = result[0].image;
            result[1].forEach(course => {
                checkarr.push(course.courseId);

            });
            break;

        case "courses":
            cFORM.courseId.value = result[0].id;
            cFORM.courseName.value = result[0].name;
            cFORM.desc.value = result[0].description;
            cFORM.imageP.src = result[0].image;
            break;
        
        case "admins":
            aFORM.adminId.value = result[0].id;
            aFORM.adminName.value = result[0].name;
            aFORM.adminPhone.value = result[0].phone;
            aFORM.adminEmail.value = result[0].email;
            aFORM.adminRole.value = result[0].role;
            aFORM.imageP.src = result[0].image;
    }
    
}



//DRAWING STUDENT/COURSE IN THE OVERVIEW
function drawSelected(p, table) {

    DOM.overviewHead.innerText = p[0].name;
    var card = document.getElementsByName("template")[0].cloneNode(true);
    card.querySelector("#theName").remove();
    card.style.display = "inline-block";
    //delete
    var delBtn = document.createElement("span");
    
    delBtn.classList.add("span-del");
    delBtn.innerHTML = "<i class='fas fa-user-minus fa-2x'></i>";
    delBtn.addEventListener('click', delCurrent);

    //edit
    var editBtn = document.createElement("span");

    editBtn.classList.add("span-edit");
    editBtn.innerHTML = "<i class='fas fa-user-edit fa-2x'></i>";
    editBtn.addEventListener('click', editCurrent);

    switch (table) {
        case "students":
            card.id = p[0].id;
            card.setAttribute("table", "students");
            card.querySelector("#img").src = p[0].image;
            card.querySelector("#thePhone").innerHTML = "Phone: " + p[0].phone;
            card.querySelector("#theEmail").innerHTML = "Email: " + p[0].email;
            card.appendChild(delBtn);
            card.appendChild(editBtn);

            break;

        case "courses":
            editBtn.innerHTML = "<i class='fas fa-edit fa-2x'></i>";
            delBtn.innerHTML = "<i class='fas fa-trash-alt fa-2x'></i>";
            card.id = p[0].id;
            card.setAttribute("table", "courses");
            card.querySelector("#img").src = p[0].image;
            card.querySelector("#thedesc").innerHTML = "Description" + "<br>" + p[0].description;
            if (userJob != "sales") {
                card.appendChild(delBtn);
                card.appendChild(editBtn);
            }

            break;
    }

    DOM.overview.appendChild(card);
}


//DRAWING ADMIN IN THE OVERVIEW
function drawAdmin(admin) {
    DOM.overviewHead.innerText = admin[0].name;
    var card = document.getElementsByName("template")[0].cloneNode(true);
    card.style.display = "inline-block";
    //delete
    var delBtn = document.createElement("span");
    delBtn.classList.add("span-del");
    delBtn.innerHTML = "<i class='fas fa-user-minus fa-2x'></i>";
    delBtn.addEventListener('click', delAdmin);
    //edit
    var editBtn = document.createElement("span");
    editBtn.classList.add("span-edit");
    editBtn.innerHTML = "<i class='fas fa-user-edit fa-2x'></i>";
    editBtn.addEventListener('click', editCurrent);
    card.id = admin[0].id;
    card.setAttribute("table", "admins");
    card.querySelector("#img").src = admin[0].image;
    card.querySelector("#theName").innerHTML = "Role: " + admin[0].role;
    card.querySelector("#thePhone").innerHTML = admin[0].phone;
    card.querySelector("#theEmail").innerHTML = admin[0].email;

    card.appendChild(delBtn);
    card.appendChild(editBtn);

    DOM.overview.appendChild(card);

}

//SHOW STUDENTS/COURSES ENROLLED TO COURSE
function enrolledNum(number, param) {

    var p = document.createElement("h5");
    p.classList.add("enrolled");
    switch (param) {
        case "students":
            p.innerText = "Courses Enrolled: " + number[0].total;

            break;
        case "courses":
            p.innerText = "Students Enrolled: " + number[0].total;

            break;

    }
    $("#enrolled").append(p);
}


//SHOW THE ENROLLED STUDENT/COURSES NAMES
function displayName(array) {
    if (array != "") {
        for (i = 0; i < array.length; i++) {
            var div = document.createElement("div");
            var dimg = document.createElement("img");
            dimg.classList.add("tiny-img");
            var dname = document.createElement("p");
            dimg.src = array[i].image;
            dname.innerText = array[i].name;
            // dname.id = array[i].id;
            div.appendChild(dimg);
            div.appendChild(dname);
            $("#enrolled").append(div);
        }
    }
}



//LOADING THE COURSE CHECKBOXES ON EDIT STUDENT FORM
function loadCourses(array) {
    for (i = 0; i < array[0].length; i++) {
        sFORM.courseChoose.appendChild(courseName(array[0][i]));
        
    }
    if(status == "edit"){
        for (var i = 0; i < courseCheck.length; i++) {
            for (var j = 0; j < checkarr.length; j++) {
                if (courseCheck[i].value == checkarr[j]) {
                 courseCheck[i].checked = true;
                }
            }
        }
    }   
}

//CREATES THE CHECKBOXES SPANS
function courseName(singleCourse) {
    var li = document.createElement("span");
    var checkInp = document.createElement("input");
    checkInp.type = "checkbox";
    checkInp.name = "check_list[]";
    checkInp.classList.add("checkboxes");
    li.classList.add("choises");

    li.innerText = singleCourse.name + " ";
    checkInp.value = singleCourse.id;
    li.appendChild(checkInp);
    courseCheck.push(checkInp);
    
    return li;
}




//IMAGE DISPLAY IN FORM BEFORE UPLOAD
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.imgPreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#file").change(function () {
    readURL(this);
});

