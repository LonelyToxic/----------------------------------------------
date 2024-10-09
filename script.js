const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value;

    if (taskText.trim() !== '') {
        //Создаем элемент задачи
        const taskItem = document.createElement('li');
        //Создаем эелемент span для отображения текста задачи
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;
        //Создаем кнопку удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        //Создаем кнопку редактирования
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        
        //Добавляем текст задачи в задачу
        taskItem.appendChild(taskTextElement);
        //Добавляем кнопку удаления в задачу
        taskItem.appendChild(deleteButton);
        //Добавляем кнопку редактирования в задачу
        taskItem.appendChild(editButton);
        //Добавляем задачу в задачник
        taskList.appendChild(taskItem);
        
        //Очишаем поле ввода
        taskInput.value = '';
        
        //Добавляем обработчик событий на кнопку удаления
        deleteButton.addEventListener('click', function() {
            //Функция удаления задачи из задачника
            taskList.removeChild(taskItem);
        })
        editButton.addEventListener('click', function() {
            
        })
        
    } else {
        alert('Введите задачу');
    }
});

