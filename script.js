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
        //Создаем чекбокс
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        //Добавляем текст задачи в задачу
        taskItem.appendChild(taskTextElement);
        //Добавляем кнопку удаления в задачу
        taskItem.appendChild(deleteButton);
        //Добавляем кнопку редактирования в задачу
        taskItem.appendChild(editButton);
        //Добавляем чекбокс в задачу
        taskItem.appendChild(checkbox);
        //Добавляем задачу в задачник
        taskList.appendChild(taskItem);
        
        //Очишаем поле ввода
        taskInput.value = '';

        updateLocalStorage();
        
        //Добавляем обработчик событий на кнопку удаления
        deleteButton.addEventListener('click', function() {
            //Функция удаления задачи из задачника
            taskList.removeChild(taskItem);
            updateLocalStorage();
        })

        //Обработчик событий на кнопке редактирования
        editButton.addEventListener('click', function() {
            //Проверяем если текст кнопки 'Релактировать' запускаем функционал редактирования
            if (editButton.textContent === 'Редактировать') {
                //Добавляем поле для текста и делаем его равным изначальному
                const input = document.createElement('input');
                input.type = 'text';
                input.value = taskTextElement.textContent;
                //Вставляем поле для редактирования перед текстом задачи и удаляем старый текст
                taskItem.insertBefore(input, taskTextElement);
                taskItem.removeChild(taskTextElement);
                //Меняем текст кнопки на 'Сохранить'
                editButton.textContent = 'Сохранить';
                }
                //Проверяем является ли текст кнопки "Сохранить"
                else if (editButton.textContent === 'Сохранить') {
                //Находим прошлое поле которое пользователь заполнил текстом
                const input = taskItem.querySelector('input');
                //Обновляем элемент текста введенным значением
                taskTextElement.textContent = input.value;
                //Вставляем обратно элемент текста перед полем для редактирования и удаляем поле для редактирования
                taskItem.insertBefore(taskTextElement, input);
                taskItem.removeChild(input);
                //Меняем текст кнопки на "Редактировать"
                editButton.textContent = 'Редактировать';
            }
            updateLocalStorage();
        })

        //Обработчик событий для чекбокса
        checkbox.addEventListener('change', function() {
            //Если чекбокс установлен текст задачи зачеркивается, если убран — зачеркивание исчезает
            if (checkbox.checked) {
                taskTextElement.style.textDecoration = 'line-through';
            } else {
                taskTextElement.style.textDecoration = 'none';
            }
            updateLocalStorage();
        });

    } else {
        alert('Введите задачу');
    }
});