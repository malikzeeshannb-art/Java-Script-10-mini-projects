let inp = document.getElementById("taskInput");
let saveBtn = document.getElementById("taskAddingBtn");
let list = document.getElementById("list");
let display = document.getElementById("taskQuant");

//source of truth!
let tasks = [];

let savedData = localStorage.getItem("tasks");
if (savedData !== null) {
tasks = JSON.parse(savedData);
}
renderTask() 

saveBtn.addEventListener("click", () => {
let userInp = inp.value.trim();
if (userInp === "") {
display.textContent = 'please inter a task!';
return;
    }

let obj = {text: userInp, compleated: false};
tasks.push(obj);
inp.value = "";
 saveAndRender() 
});
function renderTask() {
list.innerHTML = "";
tasks.forEach((task, index) => {
let li = document.createElement("li");
let box = document.createElement("input");
box.type = "checkbox";
box.checked = task.compleated;
let span = document.createElement("span");
let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("deleteBtn");
span.textContent = task.text;
if (box.checked === true) {
span.classList.add("done");
        } else {
span.classList.remove("done");
        }
box.addEventListener("click", () => {
tasks[index].compleated = box.checked;
saveAndRender()
        });
deleteBtn.addEventListener("click", () => {
tasks.splice(index, 1);
saveAndRender();  
        });
li.appendChild(box);
li.appendChild(span);
li.appendChild(deleteBtn);
list.appendChild(li);
    });
display.textContent = "tasks left:" + tasks.length;
  }
function saveAndRender() {
localStorage.setItem("tasks", JSON.stringify(tasks));
renderTask()
 }