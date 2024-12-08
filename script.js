// Select elements
const taskInput = document.getElementById('taskInput');
const taskCategory = document.getElementById('taskCategory');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const category = taskCategory.value;
    if (taskText) {
        addTaskToList(taskText, category);
        saveTask(taskText, category);
        taskInput.value = '';
    }
});

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

// Function to add a task to the list
function addTaskToList(taskText, category, completed = false) {
    const li = document.createElement('li');
    li.className = `task ${completed ? 'completed' : ''}`;
    li.innerHTML = `
        <span>${taskText} <em>(${category})</em></span>
        <div>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        </div>
    `;

    // Mark as completed
    li.querySelector('.complete-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
        toggleTaskCompletion(taskText, category);
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeTask(taskText, category);
    });

    taskList.appendChild(li);
}

// Function to save task to local storage
function saveTask(taskText, category, completed = false) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, category, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to toggle task completion in local storage
function toggleTaskCompletion(taskText, category) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.text === taskText && t.category === category);
    if (task) task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from local storage
function removeTask(taskText, category) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t.text !== taskText || t.category !== category);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task.text, task.category, task.completed));
}
