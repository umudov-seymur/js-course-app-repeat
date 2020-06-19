class Course {
  constructor(title, instructor, image) {
    this.courseId = Math.floor(Math.random() * 10000);
    this.title = title;
    this.instructor = instructor;
    this.image = image;
  }
}

class UI {
  addCourseToList(course) {
    const list = document.getElementById("course-list");
    let html = `
        <tr>
            <td><img src="${course.image}" title="${course.title}"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
    list.innerHTML += html;
  }
  deleteCourse(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
      return true;
    }
    return false;
  }
  getAllInput(callback) {
    if (typeof callback === "function") {
      return document.querySelectorAll("input").forEach(callback);
    }
    return false;
  }
  clearInputControl() {
    this.getAllInput((input) => {
      input.value = "";
    });
  }
}

class Storage {
  static getCourses() {
    const ls = localStorage.getItem("courses");
    return ls ? JSON.parse(ls) : [];
  }
  static displayCourses() {
    const courses = Storage.getCourses();
    courses.forEach((course) => {
      const ui = new UI();
      ui.addCourseToList(course);
    });
  }
  static addCourse(course) {
    const courses = Storage.getCourses();
    courses.push(course);
    Storage.setItem(courses);
  }
  static deleteCourse(element) {
    const id = element.getAttribute("data-id");
    const courses = Storage.getCourses();

    courses.forEach((course, index) => {
      if (course.courseId == id) {
        courses.splice(index, 1);
      }
    });

    Storage.setItem(courses);
  }
  static setItem(courses) {
    return localStorage.setItem("courses", JSON.stringify(courses));
  }
}

document.addEventListener("DOMContentLoaded", Storage.displayCourses());

document.getElementById("new-course").addEventListener("submit", (e) => {
  e.preventDefault();

  let values = {};

  const ui = new UI();

  ui.getAllInput((input) => {
    const id = input.getAttribute("id");
    const value = input.value;
    values[id] = value;
  });

  const { title, instructor, image } = values;

  const course = new Course(title, instructor, image);

  if (title.trim() === "" || instructor.trim() === "" || image.trim() === "") {
    alert("Please, fill the all field!");
  } else {
    ui.addCourseToList(course);
    Storage.addCourse(course);

    ui.clearInputControl();

    alert(course.title + " added sucessfull :)");
  }
});

document.getElementById("course-list").addEventListener("click", (e) => {
  const ui = new UI();
  if (ui.deleteCourse(e.target)) {
    let course_title = e.target.parentElement.parentElement.querySelector(
      "td:nth-child(2)"
    ).innerText;

    Storage.deleteCourse(e.target);

    alert(course_title + " deleted successfull :(");
  }
});

//   console.log(new Course());
