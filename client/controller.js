

$(document).ready(function(){

    /*! Fades in page on load */
    $('body').css('display', 'none');
    $('body').fadeIn(700);
    
    });


var DOM = function () {
    return {
        main: document.getElementById("main"),
        courses: document.getElementById("courseList"),
        students: document.getElementById("studentList"),
        admins: document.getElementById("adminList"),
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
        image: document.getElementById("image"),
        courseChoose: document.getElementById("coursesChoose"),
        checkbox: document.getElementsByName("check_list[]"),
        submitBtn: document.getElementById("submitBtn")
    }
}();

//COURSE FORM
var cFORM = function () {
    return {
        id: document.getElementById("courseId"),
        courseName: document.getElementById("courseName"),
        desc: document.getElementById("desc"),
        courseImage: document.getElementById("courseImage")

    }
}();

var aFORM = function () {
    return {
        adminName: document.getElementById("adminName"),
        adminRole: document.getElementById("adminRole"),
        adminPhone: document.getElementById("adminPhone"),
        adminEmail: document.getElementById("adminEmail"),
        adminPass: document.getElementById("adminPass")

    }
}();


function loadForm(param) {
    
    $("#overview").load(param + "Form.html");
}


//ADD STUDENT FORM
function addStudentForm() {
    status = "add";
    console.log("add mode");
    DOM.overviewHead.innerText = "Add a new Student";
    loadForm("students");
    // chooseCourses();
}

//ADD COURSE FORM
function addCourseForm() {
    status = "add";
    DOM.overviewHead.innerText = "Add a new Course";
    console.log("add mode");
    loadForm("courses");
}


function addAdminForm(){
    status = "add";
    DOM.overviewHead.innerText = "Add a new Admin";
    console.log("add mode");
    loadForm("admins");
}

//the status of the form edit/add
var status;


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





function fillForm(result, param) {
    switch (param) {
        case "students":
            sFORM.id.value = result[0].id;
            sFORM.name.value = result[0].name;
            sFORM.phone.value = result[0].phone;
            sFORM.email.value = result[0].email;
            break;

        case "courses":
            cFORM.id.value = result[0].id;
            cFORM.courseName.value = result[0].name;
            cFORM.desc.value = result[0].description;
            break;
    }
}


function drawSelected(p, table) {

    DOM.overviewHead.innerText = p[0].name;
    var card = document.getElementsByName("template")[0].cloneNode(true);
    card.querySelector("#theName").remove();
    card.style.display = "inline-block";
    //delete
    var delBtn = document.createElement("button");
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-danger");
    delBtn.innerText = "Delete";
    delBtn.addEventListener('click', delCurrent);

    //edit
    var editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-success");
    editBtn.innerText = "Edit";
    editBtn.addEventListener('click', editCurrent);

    switch (table) {
        case "students":
            //  console.log(p[0]);
            card.id = p[0].id;
            card.setAttribute("table", "students");
            card.querySelector("#img").src = p[0].image;
            // card.querySelector("#theName").innerHTML = p[0].name;
            card.querySelector("#thePhone").innerHTML = "Phone: " + p[0].phone;
            card.querySelector("#theEmail").innerHTML = "Email: " + p[0].email;
            card.appendChild(delBtn);
            card.appendChild(editBtn);

            break;

        case "courses":
            card.id = p[0].id;
            card.setAttribute("table", "courses");
            card.querySelector("#img").src = p[0].image;
            // card.querySelector("#theName").innerHTML = p[0].name;
            card.querySelector("#thedesc").innerHTML = "Description"+"<br>"+p[0].description;
            if(userJob != "sales"){
                card.appendChild(delBtn);
                card.appendChild(editBtn);
            }
            
            break;

       
    }

    DOM.overview.appendChild(card);

   
}
   

function drawAdmin(admin){
    DOM.overviewHead.innerText = admin[0].name;
    var card = document.getElementsByName("template")[0].cloneNode(true);
    card.style.display = "inline-block";
       //delete
       var delBtn = document.createElement("button");
       delBtn.classList.add("btn");
       delBtn.classList.add("btn-danger");
       delBtn.innerText = "Delete";
       delBtn.addEventListener('click', delAdmin);
   
       //edit
       var editBtn = document.createElement("button");
       editBtn.classList.add("btn");
       editBtn.classList.add("btn-success");
       editBtn.innerText = "Edit";
    //    editBtn.addEventListener('click', editAdmin);
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



// function chooseCourses() {
//     $.ajax({
//         url: "http://localhost/school/api/index.php?controller=home&action=get_courses",
//         method: "GET",
//         success: function (res) {
//             formCourse(JSON.parse(res));

//         },
//         error: function (res) {
//             alert(JSON.stringify(res));
//         }

//     })

// }



//COURSE DISPLAY FOR STUDENTS FORM
// function formCourse(course) {
//     // sFORM.courseChoose.innerHTML = "";
//     for (i = 0; i < course.length; i++) {
//         sFORM.courseChoose.appendChild(courseName(course[i]));
//     }

// }

function loadCourses(array){
    for (i = 0; i < array[0].length; i++) {

        sFORM.courseChoose.appendChild(courseName(array[0][i]));
    }
}


function courseName(singleCourse) {
    var li = document.createElement("span");
    var checkInp = document.createElement("input");
    checkInp.type = "checkbox";
    checkInp.name = "check_list[]";
    li.classList.add("choises");
   
    li.innerText = singleCourse.name + " ";
    checkInp.value = singleCourse.id;
    li.appendChild(checkInp);
    return li;
}




//IMAGE DISPLAY IN FORM
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

