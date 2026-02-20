document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input and trim

        if (taskText === "") {
            alert("Please enter a task!"); // Check if empty
            return;
        }

        // Create <li> for task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to <li>
        li.appendChild(removeBtn);

        // Append <li> to task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Event listener: add task on button click
    addButton.addEventListener('click', addTask);

    // Event listener: add task on Enter key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task
    function addTask(taskTextInput = null, save = true) {
        const taskText = taskTextInput !== null ? taskTextInput : taskInput.value.trim();
        if (taskText === "") {
            if(taskTextInput === null) alert("Please enter a task!");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) saveTasks();
        if(taskTextInput === null) taskInput.value = "";
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') addTask();
    });

    loadTasks();
});
