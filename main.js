class Course {
  constructor(title, instructor, image) {
    this.courseId = Math.floor(Math.random() * 10000);
    this.title = title;
    this.instructor = instructor;
    this.image = image;
  }
}

class UI {
  addCourseList(course) {
    const list = document.getElementById("course-list");
    let html = `
              <tr>
                  <td><img src="${course.image}" title="${course.title}"></td>
                  <td>${course.title}</td>
                  <td>${course.instructor}</td>
                  <td>${course.instructor}</td>
                  <td><a href=";void()" data-id="${data.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
              </tr>
            `;
    list.innerHTML += html;
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

  if (title.trim() === "" || instructor.trim() === "" || image.trim() === "") {
    alert("Please, fill the all field!");
  } else {
    ui.clearInputControl();
  }
});

//   console.log(new Course());
