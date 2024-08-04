// Update your JavaScript code
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal'); 
const editedTaskInput = document.getElementById('editedTaskInput'); 
const okBtn = document.getElementById('okBtn'); 
const cancelBtn = document.getElementById('cancelBtn'); 

let tasks = [];

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText
        };
        tasks.push(task);
        taskInput.value = '';
        displayTasks();
    }
});
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button data-id="${task.id}" class="edit-btn">Edit</button>
            <button data-id="${task.id}" class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    });
}
taskList.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('edit-btn')) {
        const taskId = parseInt(target.getAttribute('data-id'));
        editTask(taskId);
    } else if (target.classList.contains('delete-btn')) {
        const taskId = parseInt(target.getAttribute('data-id'));
        deleteTask(taskId);
    }
});
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        editedTaskInput.value = task.text; 
        editModal.style.display = 'block'; 
        okBtn.addEventListener('click', () => {
            task.text = editedTaskInput.value; 
            editModal.style.display = 'none'; 
            displayTasks();
        });
        cancelBtn.addEventListener('click', () => {
            editModal.style.display = 'none';
        });
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}
