// ======================
// GLOBAL CONFIG
// ======================
const API_URL = CONFIG.API_URL;


// ======================
// TEACHER FUNCTIONS
// ======================

function loadStudents() {

    const cls = document.getElementById("classSelect").value;

    fetch("data.json")
    .then(res => res.json())
    .then(data => {

        const students = data.classes[cls];

        const table = document.getElementById("studentTable");
        table.innerHTML = "";

        students.forEach(student => {

            table.innerHTML += `
            <tr class="border-b border-gray-800">
                <td class="p-3">${student.name}</td>
                <td class="p-3">${student.roll}</td>

                <td class="p-3 text-center">
                    <input type="radio" name="s${student.id}" value="Present">
                </td>

                <td class="p-3 text-center">
                    <input type="radio" name="s${student.id}" value="Absent">
                </td>
            </tr>
            `;
        });

    });
}


function submitAttendance() {

    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {

        const radios = row.querySelectorAll("input[type=radio]");

        radios.forEach(r => {

            if (r.checked) {

                const student_id = r.name.replace("s", "");
                const status = r.value;

                fetch(API_URL, {
                    method: "POST",
                    body: JSON.stringify({
                        type: "attendance",
                        student_id,
                        status,
                        date: new Date().toISOString().split("T")[0]
                    })
                });

            }

        });

    });

    alert("Attendance Saved");
}



// ======================
// ADMIN FUNCTIONS
// ======================

function addStudent() {

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const cls = document.getElementById("class").value.trim();

    if (!name || !roll || !cls) {
        alert("Fill all fields");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            type: "add",
            name,
            roll,
            class: cls
        })
    });

    alert("Student Added");

    clearAdminForm();
}


function updateStudent() {

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const cls = document.getElementById("class").value.trim();

    if (!name || !roll || !cls) {
        alert("Fill all fields");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            type: "update",
            name,
            roll,
            class: cls
        })
    });

    alert("Student Updated");
}


function deleteStudent() {

    const roll = document.getElementById("deleteRoll").value.trim();

    if (!roll) {
        alert("Enter roll number");
        return;
    }

    if (!confirm("Delete student?")) return;

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            type: "delete",
            roll
        })
    });

    alert("Deleted if exists");
}


// ======================
// HELPERS
// ======================

function clearAdminForm() {
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("class").value = "";
}