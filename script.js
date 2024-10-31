function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim()) {
        const taskItem = document.createElement('li');
        
        // Görev metnini saklayan bir span ekliyoruz
        const taskText = document.createElement('span');
        taskText.textContent = taskInput.value;
        taskItem.appendChild(taskText);

        taskItem.classList.add('task-item');
        
        // Göreve tıklanınca açılır menü göster
        taskItem.onclick = (e) => {
            e.stopPropagation();
            toggleDropdown(taskItem);
        };

        // Açılır menü ekle
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');

        const completeButton = document.createElement('button');
        completeButton.textContent = "Complete";
        completeButton.onclick = (e) => {
            e.stopPropagation();
            moveTask(taskItem, 'complete-list');
            closeDropdown(dropdownMenu);
        };

        const cancelButton = document.createElement('button');
        cancelButton.textContent = "Cancel";
        cancelButton.onclick = (e) => {
            e.stopPropagation();
            moveTask(taskItem, 'cancel-list');
            closeDropdown(dropdownMenu);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = (e) => {
            e.stopPropagation();
            taskItem.remove();
        };

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = (e) => {
            e.stopPropagation();
            editTask(taskText); // Sadece görev metnini düzenlemek için taskText'i gönderiyoruz
            closeDropdown(dropdownMenu);
        };

        dropdownMenu.appendChild(completeButton);
        dropdownMenu.appendChild(cancelButton);
        dropdownMenu.appendChild(deleteButton);
        dropdownMenu.appendChild(editButton);
        taskItem.appendChild(dropdownMenu);
        taskList.appendChild(taskItem);

        taskInput.value = ''; // Giriş alanını temizle
    }
}

function toggleDropdown(taskItem) {
    const dropdownMenu = taskItem.querySelector('.dropdown-menu');
    // Diğer açık menüleri kapat
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = 'none');
    // Mevcut menüyü aç veya kapat
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function closeDropdown(dropdownMenu) {
    dropdownMenu.style.display = 'none';
}

function moveTask(taskItem, targetListId) {
    const targetList = document.getElementById(targetListId);
    taskItem.querySelector('.dropdown-menu').remove(); // Açılır menüyü kaldır
    targetList.appendChild(taskItem);
}

function editTask(taskText) {
    const newText = prompt("Edit your task:", taskText.textContent);
    if (newText) {
        taskText.textContent = newText; // Görev metnini yeni değerle değiştir
    }
}
