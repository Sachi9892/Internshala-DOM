document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentForm");
  const studentTable = document
    .getElementById("studentTable")
    .querySelector("tbody");
  const addStudentBtn = document.getElementById("addStudent");

  // Retrieve from localStorage
  const studentData = JSON.parse(localStorage.getItem("students")) || [];
  renderTable();

  // Validate Inputs
  function validateInput(name, id, email, contact) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
    const contactRegex = /^[0-9]{10}$/;
    return (
      nameRegex.test(name) &&
      id > 0 &&
      emailRegex.test(email) &&
      contactRegex.test(contact)
    );
  }

  // Add Student
  addStudentBtn.addEventListener("click", () => {
    const name = document.getElementById("studentName").value.trim();
    const id = parseInt(document.getElementById("studentID").value.trim());
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!validateInput(name, id, email, contact)) {
      alert("Invalid input! Please check your fields.");
      return;
    }

    studentData.push({ name, id, email, contact });
    localStorage.setItem("students", JSON.stringify(studentData));
    renderTable();
    studentForm.reset();
  });

  // Render Table
  function renderTable() {
    studentTable.innerHTML = "";
    studentData.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>`;
      studentTable.appendChild(row);
    });
  }

  // Delete Student
  window.deleteStudent = (index) => {
    studentData.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(studentData));
    renderTable();
  };

  // Edit Student
  window.editStudent = (index) => {
    const student = studentData[index];
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentID").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    deleteStudent(index);
  };
});
