var DOM = function () {
    return {
        main: document.getElementById("main"),
        courses: document.getElementById("courseList"),
        students: document.getElementById("studentList"),
        overview: document.getElementById("overview"),
        leftHead: document.getElementById("leftHead"),
        rightHead: document.getElementById("rightHead"),
        overviewHead: document.getElementById("overview-h4")

    }
}();

function clean(){
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
        checkbox: document.getElementsByName("course"),
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


function loadForm(param) {
    $("#overview").load(param + "Form.html");
}

//the status of the form edit/add
var status;

//COURSES MAIN VIEW


function draw(array) {
if(array !== ""){
    for (i = 0; i < array[0].length; i++) {

        DOM.courses.appendChild(courseLi(array[0][i]));
    }
    for (i = 0; i < array[1].length; i++) {

        DOM.students.appendChild(studentLi(array[1][i]));
    }

}
    
}


// function drawCourse(course) {
//     DOM.courses.innerHTML = "";
//     for (let index = 0; index < course.length; index++) {
//         DOM.courses.appendChild(courseLi(course[index]));
//     }

// }

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
            card.querySelector("#theName").innerHTML = p[0].name;
            card.querySelector("#thePhone").innerHTML = p[0].phone;
            card.querySelector("#theEmail").innerHTML = p[0].email;

            break;

        case "courses":
            card.id = p[0].id;
            card.setAttribute("table", "courses");
            card.querySelector("#img").src = p[0].image;
            card.querySelector("#theName").innerHTML = p[0].name;
            card.querySelector("#thedesc").innerHTML = p[0].description;
            break;
    }
    card.appendChild(delBtn);
    card.appendChild(editBtn);
    DOM.overview.appendChild(card);

}

//SHOW STUDENTS/COURSES ENROLLED TO COURSE

function enrolledNum(number, param) {
    // console.log("the number" + number[0].total)
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
    DOM.overview.appendChild(p);
}


//SHOW THE ENROLLED STUDENT/COURSES NAMES

function displayName(array) {
    // console.log(array);
    if (array != "") {
        for (i = 0; i < array.length; i++) {
            var dname = document.createElement("p");
            dname.innerText = array[i].name;
            DOM.overview.appendChild(dname);


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

function courseName(singleCourse) {
    var li = document.createElement("li");
    var checkInp = document.createElement("input");
    checkInp.type = "checkbox";
    checkInp.name = "check_list[]";
    li.classList.add("list-group-item");
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

