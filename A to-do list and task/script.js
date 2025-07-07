const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addBtn = document.getElementById('add-btn');

// Load tasks from localStorage on page load
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

// Add task on button click
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    renderTask(text);
    saveTask(text, false);
    taskInput.value = '';
  }
});

// Save task to localStorage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update localStorage after changes
function updateStorage() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('span').classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render a task in the list
function renderTask(text, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  if (completed) span.classList.add('completed');

  span.addEventListener('click', () => {
    span.classList.toggle('completed');
    updateStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.addEventListener('click', () => {
    li.remove();
    updateStorage();
  });

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}
