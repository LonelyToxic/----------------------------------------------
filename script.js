const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Загрузка задач при загрузке страницы
    document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

    function updateLocalStorage() {
        const tasks = [];

        document.querySelectorAll('#task-list li').forEach(taskItem => {
            let taskTextElement = taskItem.querySelector('span');
            let taskText = '';

            if (taskTextElement) {
                taskText = taskTextElement.textContent;
            } else {
                let inputElement = taskItem.querySelector('input[type="text"]');
                if (inputElement) {
                    taskText = inputElement.value;
                }
            }

            const isCompleted = taskItem.querySelector('input[type="checkbox"]').checked;

            tasks.push({
                text: taskText,
                completed: isCompleted
            });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value;
        if (taskText.trim() !== '') {
            createTaskElement(taskText, false);
            taskInput.value = '';
            updateLocalStorage();
        } else {
            alert('Введите задачу');
        }
    });

    function createTaskElement(text, completed) {
        const taskItem = document.createElement('li');
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;

        if (completed) {
            taskTextElement.style.textDecoration = 'line-through';
        }

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(checkbox);
        taskList.appendChild(taskItem);

        // Обработчик удаления задачи
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            updateLocalStorage();
        });

        // Обработчик редактирования задачи
        editButton.addEventListener('click', function() {
            if (editButton.textContent === 'Редактировать') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = taskTextElement.textContent;
                taskItem.insertBefore(input, taskTextElement);
                taskItem.removeChild(taskTextElement);
                editButton.textContent = 'Сохранить';
            } else if (editButton.textContent === 'Сохранить') {
                const input = taskItem.querySelector('input[type="text"]');
                taskTextElement.textContent = input.value;
                taskItem.insertBefore(taskTextElement, input);
                taskItem.removeChild(input);
                editButton.textContent = 'Редактировать';
                updateLocalStorage();
            }
        });

        // Обработчик для чекбокса
        checkbox.addEventListener('change', function() {
            taskTextElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            updateLocalStorage();
        });
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');

        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);

            tasks.forEach(task => {
                createTaskElement(task.text, task.completed);
            });
        }
    }